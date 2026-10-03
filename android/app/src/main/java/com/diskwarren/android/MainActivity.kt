package com.diskwarren.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.lifecycle.lifecycleScope
import com.diskwarren.android.data.model.CategorySummary
import com.diskwarren.android.data.model.MediaCategory
import com.diskwarren.android.data.model.MediaItem
import com.diskwarren.android.data.scanner.MediaStoreScanner
import com.diskwarren.android.ui.CategorySummaryList
import com.diskwarren.android.ui.StorageOverviewHeader
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private val scanner by lazy { MediaStoreScanner(applicationContext) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            var mediaItems by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
            var totalUsedBytes by remember { mutableStateOf(0L) }
            var categorySummaries by remember { mutableStateOf<List<CategorySummary>>(emptyList()) }

            fun refreshScan() {
                lifecycleScope.launch {
                    val items = scanner.queryAllMedia()
                    mediaItems = items
                    totalUsedBytes = items.sumOf { it.sizeBytes }

                    categorySummaries = MediaCategory.entries
                        .map { cat ->
                            val catItems = items.filter { it.category == cat }
                            CategorySummary(
                                category = cat,
                                totalSizeBytes = catItems.sumOf { it.sizeBytes },
                                itemCount = catItems.size
                            )
                        }
                        .filter { it.itemCount > 0 }
                }
            }

            LaunchedEffect(Unit) {
                refreshScan()
            }

            val reclaimableBytes = categorySummaries
                .filter { it.category == MediaCategory.DOWNLOADS }
                .sumOf { it.totalSizeBytes }

            fun clearReclaimable() {
                lifecycleScope.launch {
                    mediaItems = mediaItems.filter { it.category != MediaCategory.DOWNLOADS }
                    totalUsedBytes = mediaItems.sumOf { it.sizeBytes }
                    categorySummaries = categorySummaries.filter { it.category != MediaCategory.DOWNLOADS }
                }
            }

            Surface(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8FAFC))
            ) {
                Box(modifier = Modifier.fillMaxSize()) {
                    Column(modifier = Modifier.fillMaxSize()) {
                        StorageOverviewHeader(
                            totalUsedBytes = totalUsedBytes,
                            totalAvailableBytes = 0L,
                            categories = categorySummaries,
                            onScanClicked = { refreshScan() },
                            onClearClicked = { clearReclaimable() }
                        )
                        CategorySummaryList(
                            categories = categorySummaries,
                            onClearCategoryClicked = { clearReclaimable() }
                        )
                    }

                    BottomClearBar(
                        reclaimableBytes = reclaimableBytes,
                        onClearClicked = { clearReclaimable() },
                        modifier = Modifier.align(Alignment.BottomCenter)
                    )
                }
            }
        }
    }
}
