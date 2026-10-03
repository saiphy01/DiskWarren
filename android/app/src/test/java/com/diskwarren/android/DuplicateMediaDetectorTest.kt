package com.diskwarren.android

import android.net.Uri
import com.diskwarren.android.data.duplicate.DuplicateMediaDetector
import com.diskwarren.android.data.model.MediaCategory
import com.diskwarren.android.data.model.MediaItem
import org.junit.Assert.assertEquals
import org.junit.Test
import org.mockito.Mockito.mock

class DuplicateMediaDetectorTest {

    @Test
    fun testFindDuplicates_detectsIdenticalSizeAndMime() {
        val dummyUri = mock(Uri::class.java)

        val item1 = MediaItem(
            id = 1L,
            uri = dummyUri,
            displayName = "IMG_001.jpg",
            sizeBytes = 2_048_000L,
            mimeType = "image/jpeg",
            dateModified = 1000L,
            relativePath = "Pictures/",
            category = MediaCategory.PHOTOS
        )

        val item2 = MediaItem(
            id = 2L,
            uri = dummyUri,
            displayName = "IMG_001_copy.jpg",
            sizeBytes = 2_048_000L,
            mimeType = "image/jpeg",
            dateModified = 1100L,
            relativePath = "Downloads/",
            category = MediaCategory.PHOTOS
        )

        val item3 = MediaItem(
            id = 3L,
            uri = dummyUri,
            displayName = "IMG_002.jpg",
            sizeBytes = 3_500_000L,
            mimeType = "image/jpeg",
            dateModified = 1200L,
            relativePath = "Pictures/",
            category = MediaCategory.PHOTOS
        )

        val detector = DuplicateMediaDetector()
        val duplicates = detector.findDuplicates(listOf(item1, item2, item3))

        assertEquals(1, duplicates.size)
        assertEquals(2, duplicates[0].items.size)
        assertEquals(2_048_000L, duplicates[0].sizeBytes)
    }

    @Test
    fun testFormatBytes_formatsCorrectUnits() {
        assertEquals("0 B", MediaItem.formatBytes(0L))
        assertEquals("1.0 KB", MediaItem.formatBytes(1024L))
        assertEquals("1.0 MB", MediaItem.formatBytes(1024L * 1024L))
        assertEquals("1.0 GB", MediaItem.formatBytes(1024L * 1024L * 1024L))
    }
}
