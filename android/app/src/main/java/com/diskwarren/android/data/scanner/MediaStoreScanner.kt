package com.diskwarren.android.data.scanner

import android.content.ContentUris
import android.content.Context
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import com.diskwarren.android.data.model.MediaCategory
import com.diskwarren.android.data.model.MediaItem
import com.diskwarren.android.data.model.SafetyLevel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class MediaStoreScanner(private val context: Context) {

    suspend fun queryAllMedia(): List<MediaItem> = withContext(Dispatchers.IO) {
        val items = mutableListOf<MediaItem>()
        items.addAll(queryCollection(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, MediaCategory.PHOTOS))
        items.addAll(queryCollection(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, MediaCategory.VIDEOS))
        items.addAll(queryCollection(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, MediaCategory.AUDIO))

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            items.addAll(queryCollection(MediaStore.Downloads.EXTERNAL_CONTENT_URI, MediaCategory.DOWNLOADS))
        }

        items.sortedByDescending { it.sizeBytes }
    }

    private fun queryCollection(collectionUri: Uri, category: MediaCategory): List<MediaItem> {
        val results = mutableListOf<MediaItem>()
        val projection = arrayOf(
            MediaStore.MediaColumns._ID,
            MediaStore.MediaColumns.DISPLAY_NAME,
            MediaStore.MediaColumns.SIZE,
            MediaStore.MediaColumns.MIME_TYPE,
            MediaStore.MediaColumns.DATE_MODIFIED,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) MediaStore.MediaColumns.RELATIVE_PATH else MediaStore.MediaColumns.DATA
        )

        val sortOrder = "${MediaStore.MediaColumns.DATE_MODIFIED} DESC"

        try {
            context.contentResolver.query(collectionUri, projection, null, null, sortOrder)?.use { cursor ->
                val idCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns._ID)
                val nameCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DISPLAY_NAME)
                val sizeCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.SIZE)
                val mimeCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.MIME_TYPE)
                val dateCol = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATE_MODIFIED)
                val pathCol = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    cursor.getColumnIndex(MediaStore.MediaColumns.RELATIVE_PATH)
                } else {
                    cursor.getColumnIndex(MediaStore.MediaColumns.DATA)
                }

                while (cursor.moveToNext()) {
                    val id = cursor.getLong(idCol)
                    val name = cursor.getString(nameCol) ?: "Unknown"
                    val size = cursor.getLong(sizeCol)
                    val mime = cursor.getString(mimeCol) ?: "application/octet-stream"
                    val dateModified = cursor.getLong(dateCol)
                    val path = if (pathCol != -1) cursor.getString(pathCol) ?: "" else ""

                    if (size > 0) {
                        val uri = ContentUris.withAppendedId(collectionUri, id)
                        val isScreenshot = category == MediaCategory.PHOTOS && (name.contains("screenshot", ignoreCase = true) || path.contains("screenshot", ignoreCase = true))
                        val isApk = category == MediaCategory.DOWNLOADS && (name.endsWith(".apk", ignoreCase = true) || mime.contains("vnd.android.package-archive"))
                        val isDoc = category == MediaCategory.DOWNLOADS && (mime.startsWith("application/pdf") || mime.contains("document") || mime.contains("msword") || mime.contains("sheet") || name.endsWith(".pdf", ignoreCase = true) || name.endsWith(".docx", ignoreCase = true))

                        val resolvedCategory = when {
                            isScreenshot -> MediaCategory.SCREENSHOTS
                            isApk -> MediaCategory.APK_INSTALLERS
                            isDoc -> MediaCategory.DOCUMENTS
                            else -> category
                        }

                        val safety = if (resolvedCategory == MediaCategory.DOWNLOADS || resolvedCategory == MediaCategory.APK_INSTALLERS || isScreenshot) {
                            SafetyLevel.LOW_RISK
                        } else {
                            SafetyLevel.REVIEW_REQUIRED
                        }

                        results.add(
                            MediaItem(
                                id = id,
                                uri = uri,
                                displayName = name,
                                sizeBytes = size,
                                mimeType = mime,
                                dateModified = dateModified,
                                relativePath = path,
                                category = resolvedCategory,
                                safety = safety
                            )
                        )
                    }
                }
            }
        } catch (e: Exception) {
            // Permission denied or provider unavailable
        }

        return results
    }
}
