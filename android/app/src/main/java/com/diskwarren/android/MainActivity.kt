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

            var systemCacheBytes by remember { mutableStateOf(3006477107L) } // 2.8 GB System Cache
            val totalAppCacheBytes = appCacheEntries.filter { !it.isCleared }.sumOf { it.cacheSizeBytes }

            fun refreshScan() {
                lifecycleScope.launch {
                    val items = scanner.queryAllMedia()
                    mediaItems = items

                    val appInstalledBytes = appCacheEntries.sumOf { it.totalSizeBytes - it.cacheSizeBytes }
                    val currentAppCacheBytes = appCacheEntries.filter { !it.isCleared }.sumOf { it.cacheSizeBytes }
                    val systemOsBytes = 16320875725L + systemCacheBytes // 15.2 GB Base OS + System Cache

                    totalUsedBytes = items.sumOf { it.sizeBytes } + appInstalledBytes + currentAppCacheBytes + systemOsBytes

                    categorySummaries = MediaCategory.entries
                        .filter { it != MediaCategory.FREE_SPACE }
                        .map { cat ->
                            val catItems = items.filter { it.category == cat }
                            val totalCatBytes = when (cat) {
                                MediaCategory.INSTALLED_APPS -> appInstalledBytes
                                MediaCategory.APP_CACHE -> currentAppCacheBytes
                                MediaCategory.SYSTEM_OS -> systemOsBytes
                                else -> catItems.sumOf { it.sizeBytes }
                            }
                            val count = when (cat) {
                                MediaCategory.INSTALLED_APPS -> 48
                                MediaCategory.APP_CACHE -> appCacheEntries.filter { !it.isCleared }.size
                                MediaCategory.SYSTEM_OS -> 1
                                else -> catItems.size
                            }

                            CategorySummary(
                                category = cat,
                                totalSizeBytes = totalCatBytes,
                                itemCount = count
                            )
                        }
                        .filter { it.totalSizeBytes > 0 || it.category == MediaCategory.APP_CACHE }
                }
            }

            LaunchedEffect(Unit) {
                refreshScan()
            }

            fun clearSystemCache() {
                lifecycleScope.launch {
                    systemCacheBytes = 0L
                    refreshScan()
                }
            }

            fun clearReclaimable() {
                lifecycleScope.launch {
                    mediaItems = mediaItems.filter { it.category != MediaCategory.DOWNLOADS && it.category != MediaCategory.APK_INSTALLERS }
                    systemCacheBytes = 0L
                    refreshScan()
                }
            }

            fun clearSingleAppCache(appId: String) {
                lifecycleScope.launch {
                    appCacheEntries = appCacheEntries.map {
                        if (it.id == appId) it.copy(isCleared = true) else it
                    }
                    refreshScan()
                }
            }

            fun clearAllAppCaches() {
                lifecycleScope.launch {
                    appCacheEntries = appCacheEntries.map { it.copy(isCleared = true) }
                    refreshScan()
                }
            }

            fun deleteSelectedAppCaches(selectedIds: Set<String>) {
                lifecycleScope.launch {
                    appCacheEntries = appCacheEntries.map {
                        if (selectedIds.contains(it.id)) it.copy(isCleared = true) else it
                    }
                    refreshScan()
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
                        systemCacheBytes = systemCacheBytes,
                        appCacheBytes = totalAppCacheBytes,
                        onScanClicked = { refreshScan() },
                        onClearSystemCache = { clearSystemCache() },
                        onClearClicked = { clearReclaimable() },
                        onManageCachesClicked = { showAppCacheSheet = true }
                    )

                    if (totalAppCacheBytes > 0) {
                        Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                            AppCacheBucketCard(
                                totalCacheBytes = totalAppCacheBytes,
                                appCount = appCacheEntries.filter { !it.isCleared }.size,
                                onClick = { showAppCacheSheet = true }
                            )
                        }
                    }

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
                        onClearAllCaches = { clearAllAppCaches() },
                        onDeleteSelectedCaches = { deleteSelectedAppCaches(it) }
                    )
                }
            }
        }
    }
}
