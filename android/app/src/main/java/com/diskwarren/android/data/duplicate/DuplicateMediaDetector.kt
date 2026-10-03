package com.diskwarren.android.data.duplicate

import com.diskwarren.android.data.model.DuplicateMediaGroup
import com.diskwarren.android.data.model.MediaItem

class DuplicateMediaDetector {

    fun findDuplicates(items: List<MediaItem>): List<DuplicateMediaGroup> {
        // Group by exact sizeBytes and mimeType
        return items
            .groupBy { "${it.sizeBytes}_${it.mimeType}" }
            .filter { it.value.size > 1 }
            .map { (key, duplicates) ->
                DuplicateMediaGroup(
                    key = key,
                    sizeBytes = duplicates.first().sizeBytes,
                    items = duplicates
                )
            }
            .sortedByDescending { it.sizeBytes * (it.items.size - 1) }
    }
}
