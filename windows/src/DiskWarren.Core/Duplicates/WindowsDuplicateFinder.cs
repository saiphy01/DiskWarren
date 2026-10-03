using System.Security.Cryptography;
using DiskWarren.Core.Models;

namespace DiskWarren.Core.Duplicates;

public sealed record DuplicateGroup(
    string FileSizeFormatted,
    long FileSizeBytes,
    string HashSha256,
    IReadOnlyList<string> FilePaths
);

public sealed class WindowsDuplicateFinder
{
    private const int HeaderChunkBytes = 4096;

    public async Task<IReadOnlyList<DuplicateGroup>> FindDuplicatesAsync(
        string rootDirectory,
        long minimumSizeBytes = 1024,
        CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(rootDirectory);

        return await Task.Run(() =>
        {
            var duplicates = new List<DuplicateGroup>();

            // Phase 1: Group files by exact byte size
            var sizeGroups = new Dictionary<long, List<string>>();
            var dirInfo = new DirectoryInfo(rootDirectory);

            try
            {
                foreach (var file in dirInfo.EnumerateFiles("*", SearchOption.AllDirectories))
                {
                    cancellationToken.ThrowIfCancellationRequested();

                    try
                    {
                        if (file.Length >= minimumSizeBytes)
                        {
                            if (!sizeGroups.TryGetValue(file.Length, out var list))
                            {
                                list = [];
                                sizeGroups[file.Length] = list;
                            }
                            list.Add(file.FullName);
                        }
                    }
                    catch (FileNotFoundException) { }
                    catch (UnauthorizedAccessException) { }
                }
            }
            catch (UnauthorizedAccessException) { }

            // Filter to sizes with at least 2 files
            var potentialDuplicates = sizeGroups
                .Where(kvp => kvp.Value.Count > 1)
                .ToList();

            // Phase 2: Compute header chunk SHA-256
            using var sha256 = SHA256.Create();
            var headerBuffer = new byte[HeaderChunkBytes];

            foreach (var (size, candidatePaths) in potentialDuplicates)
            {
                cancellationToken.ThrowIfCancellationRequested();

                var headerGroups = new Dictionary<string, List<string>>(StringComparer.Ordinal);

                foreach (var path in candidatePaths)
                {
                    cancellationToken.ThrowIfCancellationRequested();

                    try
                    {
                        using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
                        int bytesRead = stream.Read(headerBuffer, 0, HeaderChunkBytes);
                        string headerHash = Convert.ToHexString(sha256.ComputeHash(headerBuffer, 0, bytesRead));

                        if (!headerGroups.TryGetValue(headerHash, out var list))
                        {
                            list = [];
                            headerGroups[headerHash] = list;
                        }
                        list.Add(path);
                    }
                    catch (Exception) { }
                }

                // Phase 3: For matching headers, compute full file hash
                foreach (var (_, matchingHeaderPaths) in headerGroups.Where(g => g.Value.Count > 1))
                {
                    cancellationToken.ThrowIfCancellationRequested();

                    var fullHashGroups = new Dictionary<string, List<string>>(StringComparer.Ordinal);

                    foreach (var path in matchingHeaderPaths)
                    {
                        cancellationToken.ThrowIfCancellationRequested();

                        try
                        {
                            using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
                            string fullHash = Convert.ToHexString(sha256.ComputeHash(stream));

                            if (!fullHashGroups.TryGetValue(fullHash, out var list))
                            {
                                list = [];
                                fullHashGroups[fullHash] = list;
                            }
                            list.Add(path);
                        }
                        catch (Exception) { }
                    }

                    foreach (var (fullHash, verifiedPaths) in fullHashGroups.Where(g => g.Value.Count > 1))
                    {
                        duplicates.Add(new DuplicateGroup(
                            FileSizeFormatted: VolumeInfo.FormatBytes(size),
                            FileSizeBytes: size,
                            HashSha256: fullHash,
                            FilePaths: verifiedPaths
                        ));
                    }
                }
            }

            return duplicates;
        }, cancellationToken);
    }
}
