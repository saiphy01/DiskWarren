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
import com.diskwarren.android.ui.AppCacheBottomSheet
import com.diskwarren.android.ui.AppCacheEntry
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private val scanner by lazy { MediaStoreScanner(applicationContext) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            var mediaItems by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
            var totalUsedBytes by remember { mutableStateOf(0L) }
            var categorySummaries by remember { mutableStateOf<List<CategorySummary>>(emptyList()) }
            var showAppCacheSheet by remember { mutableStateOf(false) }

            var appCacheEntries by remember {
                mutableStateOf(
                    listOf(
                        AppCacheEntry("spotify", "Spotify Music", "🎧", 3435973836L, 1932735283L),
                        AppCacheEntry("youtube", "YouTube", "▶️", 3113851289L, 1610612736L),
                        AppCacheEntry("chrome", "Google Chrome", "🌐", 2362232012L, 1395864371L),
                        AppCacheEntry("instagram", "Instagram", "📸", 2040109465L, 1027604480L),
                        AppCacheEntry("tiktok", "TikTok", "🎵", 1825361100L, 880803840L),
                        AppCacheEntry("reddit", "Reddit", "🤖", 1181116006L, 471859200L)
                    )
                )
            }

            val totalAppCacheBytes = appCacheEntries.filter { !it.isCleared }.sumOf { it.cacheSizeBytes }

            fun refreshScan() {
                lifecycleScope.launch {
                    val items = scanner.queryAllMedia()
                    mediaItems = items
                    totalUsedBytes = items.sumOf { it.sizeBytes } + appCacheEntries.sumOf { it.totalSizeBytes }

                    categorySummaries = MediaCategory.entries
                        .map { cat ->
                            val catItems = items.filter { it.category == cat }
                            val totalCatBytes = if (cat == MediaCategory.SYSTEM_APPS) {
                                appCacheEntries.sumOf { it.totalSizeBytes }
                            } else {
                                catItems.sumOf { it.sizeBytes }
                            }
                            val count = if (cat == MediaCategory.SYSTEM_APPS) appCacheEntries.size else catItems.size

                            CategorySummary(
                                category = cat,
                                totalSizeBytes = totalCatBytes,
                                itemCount = count
                            )
                        }
                        .filter { it.itemCount > 0 }
                }
            }

            LaunchedEffect(Unit) {
                refreshScan()
            }

            fun clearReclaimable() {
                lifecycleScope.launch {
                    mediaItems = mediaItems.filter { it.category != MediaCategory.DOWNLOADS }
                    appCacheEntries = appCacheEntries.map { it.copy(isCleared = true) }
                    totalUsedBytes = mediaItems.sumOf { it.sizeBytes } + appCacheEntries.sumOf { it.totalSizeBytes - it.cacheSizeBytes }
                    categorySummaries = categorySummaries.filter { it.category != MediaCategory.DOWNLOADS }
                }
            }

            fun clearSingleAppCache(appId: String) {
                lifecycleScope.launch {
                    appCacheEntries = appCacheEntries.map {
                        if (it.id == appId) it.copy(isCleared = true) else it
                    }
                    totalUsedBytes = mediaItems.sumOf { it.sizeBytes } + appCacheEntries.sumOf { if (it.isCleared) it.totalSizeBytes - it.cacheSizeBytes else it.totalSizeBytes }
                }
            }

            fun clearAllAppCaches() {
                lifecycleScope.launch {
                    appCacheEntries = appCacheEntries.map { it.copy(isCleared = true) }
                    totalUsedBytes = mediaItems.sumOf { it.sizeBytes } + appCacheEntries.sumOf { it.totalSizeBytes - it.cacheSizeBytes }
                }
            }

            Surface(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8FAFC))
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    StorageOverviewHeader(
                        totalUsedBytes = totalUsedBytes,
                        totalAvailableBytes = 0L,
                        categories = categorySummaries,
                        appCacheBytes = totalAppCacheBytes,
                        onScanClicked = { refreshScan() },
                        onClearClicked = { clearReclaimable() },
                        onManageCachesClicked = { showAppCacheSheet = true }
                    )
                    CategorySummaryList(
                        categories = categorySummaries,
                        appCacheBytes = totalAppCacheBytes,
                        onClearCategoryClicked = { clearReclaimable() },
                        onManageCachesClicked = { showAppCacheSheet = true }
                    )
                }

                if (showAppCacheSheet) {
                    AppCacheBottomSheet(
                        apps = appCacheEntries,
                        onDismiss = { showAppCacheSheet = false },
                        onClearSingleApp = { clearSingleAppCache(it) },
                        onClearAllCaches = { clearAllAppCaches() }
                    )
                }
            }
        }
    }
}
