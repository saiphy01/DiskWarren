using DiskWarren.Core.Models;

namespace DiskWarren.Core.Visualization;

public static class SquarifiedTreemap
{
    public static IReadOnlyList<TreemapRect> GenerateLayout(
        IReadOnlyList<StorageItem> items,
        double width,
        double height,
        int maxItems = 30)
    {
        if (items.Count == 0 || width <= 0 || height <= 0)
        {
            return [];
        }

        var sorted = items
            .Where(i => i.SizeBytes > 0)
            .OrderByDescending(i => i.SizeBytes)
            .Take(maxItems)
            .ToList();

        if (sorted.Count == 0) return [];

        long totalSize = sorted.Sum(i => i.SizeBytes);
        double totalArea = width * height;

        var rectangles = new List<TreemapRect>();
        LayoutRow(sorted, 0, 0, width, height, totalSize, totalArea, rectangles);

        return rectangles;
    }

    private static void LayoutRow(
        List<StorageItem> items,
        double x,
        double y,
        double width,
        double height,
        long totalSize,
        double totalArea,
        List<TreemapRect> output)
    {
        if (items.Count == 0) return;

        if (items.Count == 1)
        {
            var item = items[0];
            output.Add(new TreemapRect(
                item.Path,
                item.Name,
                item.SizeBytes,
                item.FormattedSize,
                item.Category,
                item.Safety,
                x, y, width, height
            ));
            return;
        }

        bool horizontal = width >= height;
        double currentTotal = items.Sum(i => i.SizeBytes);
        double currentArea = totalSize == 0 ? 0 : (currentTotal / (double)totalSize) * totalArea;

        int splitIndex = items.Count / 2;
        var groupA = items.Take(splitIndex).ToList();
        var groupB = items.Skip(splitIndex).ToList();

        double sizeA = groupA.Sum(i => i.SizeBytes);
        double ratioA = currentTotal == 0 ? 0.5 : sizeA / currentTotal;

        if (horizontal)
        {
            double widthA = width * ratioA;
            double widthB = width - widthA;
            LayoutRow(groupA, x, y, widthA, height, totalSize, totalArea, output);
            LayoutRow(groupB, x + widthA, y, widthB, height, totalSize, totalArea, output);
        }
        else
        {
            double heightA = height * ratioA;
            double heightB = height - heightA;
            LayoutRow(groupA, x, y, width, heightA, totalSize, totalArea, output);
            LayoutRow(groupB, x, y + heightA, width, heightB, totalSize, totalArea, output);
        }
    }
}
