package com.diskwarren.android.data.model

import android.net.Uri

enum class SafetyLevel {
    LOW_RISK,
    REVIEW_REQUIRED,
    RESTRICTED
}

enum class MediaCategory(val title: String) {
    PHOTOS("Photos & Images"),
    VIDEOS("Videos & Screen Recordings"),
    AUDIO("Audio & Voice Memos"),
    DOWNLOADS("Public Downloads"),
    DOCUMENTS("Documents & Archives"),
    SYSTEM_APPS("App Footprint"),
    FREE_SPACE("Available Free Space")
}

data class MediaItem(
    val id: Long,
    val uri: Uri,
    val displayName: String,
    val sizeBytes: Long,
    val mimeType: String,
    val dateModified: Long,
    val relativePath: String,
    val category: MediaCategory,
    val safety: SafetyLevel = SafetyLevel.REVIEW_REQUIRED
) {
    val formattedSize: String
        get() = formatBytes(sizeBytes)

    companion object {
        fun formatBytes(bytes: Long): String {
            if (bytes <= 0) return "0 B"
            val units = arrayOf("B", "KB", "MB", "GB", "TB")
            val digitGroups = (Math.log10(bytes.toDouble()) / Math.log10(1024.0)).toInt()
            return String.format(
                "%.1f %s",
                bytes / Math.pow(1024.0, digitGroups.toDouble()),
                units[digitGroups.coerceAtMost(units.size - 1)]
            )
        }
    }
}

data class DuplicateMediaGroup(
    val key: String,
    val sizeBytes: Long,
    val items: List<MediaItem>
) {
    val formattedSize: String get() = MediaItem.formatBytes(sizeBytes)
}

data class CategorySummary(
    val category: MediaCategory,
    val totalSizeBytes: Long,
    val itemCount: Int
) {
    val formattedSize: String get() = MediaItem.formatBytes(totalSizeBytes)
}
