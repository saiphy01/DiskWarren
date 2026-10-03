package com.diskwarren.android.ui

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.diskwarren.android.data.model.CategorySummary
import com.diskwarren.android.data.model.MediaCategory
import com.diskwarren.android.data.model.MediaItem

// Executive Color Tokens (tokens.json compliant)
private val ColorBgLight = Color(0xFFF8FAFC)
private val ColorCardLight = Color(0xFFFFFFFF)
private val ColorBorderLight = Color(0xFFE2E8F0)
private val ColorTextPrimary = Color(0xFF0F172A)
private val ColorTextSecondary = Color(0xFF64748B)
private val ColorBrandCyan = Color(0xFF0891B2)
private val ColorEmeraldSafe = Color(0xFF10B981)
private val ColorAmberReview = Color(0xFFF59E0B)
private val ColorCoralDanger = Color(0xFFEF4444)
private val ColorPurpleAI = Color(0xFF8B5CF6)
private val ColorBlueApps = Color(0xFF2563EB)
private val ColorSlateSystem = Color(0xFF64748B)

fun getCategoryColor(category: MediaCategory): Color {
    return when (category) {
        MediaCategory.PHOTOS -> ColorBrandCyan
        MediaCategory.SCREENSHOTS -> Color(0xFF06B6D4)
        MediaCategory.VIDEOS -> ColorBlueApps
        MediaCategory.INSTALLED_APPS -> Color(0xFF4F46E5)
        MediaCategory.APP_CACHE -> ColorPurpleAI
        MediaCategory.DOWNLOADS -> ColorAmberReview
        MediaCategory.APK_INSTALLERS -> Color(0xFFF97316)
        MediaCategory.AUDIO -> Color(0xFFEC4899)
        MediaCategory.DOCUMENTS -> Color(0xFFD97706)
        MediaCategory.SYSTEM_OS -> ColorSlateSystem
        MediaCategory.FREE_SPACE -> ColorEmeraldSafe
    }
}

data class AppCacheEntry(
    val id: String,
    val name: String,
    val icon: String,
    val totalSizeBytes: Long,
    val cacheSizeBytes: Long,
    val isCleared: Boolean = false
)

@Composable
fun StorageOverviewHeader(
    totalUsedBytes: Long,
    totalAvailableBytes: Long = 0L,
    categories: List<CategorySummary> = emptyList(),
    systemCacheBytes: Long = 0L,
    appCacheBytes: Long = 0L,
    onScanClicked: () -> Unit,
    onClearSystemCache: (() -> Unit)? = null,
    onClearClicked: (() -> Unit)? = null,
    onManageCachesClicked: (() -> Unit)? = null
) {
    var selectedCategory by remember { mutableStateOf<MediaCategory?>(null) }
    val totalCapacity = maxOf(1L, totalUsedBytes + totalAvailableBytes)

    // Compute unclubbed reclaimable candidates (Downloads + APK Installers + System Cache)
    val downloadsBytes = categories
        .filter { it.category == MediaCategory.DOWNLOADS || it.category == MediaCategory.APK_INSTALLERS }
        .sumOf { it.totalSizeBytes }
    val totalReclaimableBytes = downloadsBytes + systemCacheBytes

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(containerColor = ColorCardLight),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(20.dp)
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "DiskWarren",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = ColorTextPrimary
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(ColorBrandCyan.copy(alpha = 0.10f))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Text(
                                text = "Scoped Storage",
                                fontSize = 9.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = ColorBrandCyan
                            )
                        }
                    }
                    Text(
                        text = "Internal Storage • 256 GB",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium,
                        color = ColorTextSecondary
                    )
                }

                OutlinedButton(
                    onClick = onScanClicked,
                    shape = RoundedCornerShape(10.dp),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = ColorTextPrimary),
                    border = androidx.compose.foundation.BorderStroke(1.dp, ColorBorderLight)
                ) {
                    Text(
                        text = "Scan",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = ColorTextPrimary
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Reclaimable Space Banner (Downloads & System Caches) - 2-Tier Architecture
            if (totalReclaimableBytes > 0) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(ColorEmeraldSafe.copy(alpha = 0.10f))
                        .padding(14.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(RoundedCornerShape(10.dp))
                                .background(ColorEmeraldSafe.copy(alpha = 0.20f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "✨",
                                fontSize = 16.sp
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "RECLAIMABLE STORAGE",
                                fontSize = 9.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = ColorEmeraldSafe,
                                letterSpacing = 0.5.sp
                            )
                            val desc = if (systemCacheBytes > 0) "${MediaItem.formatBytes(systemCacheBytes)} System Cache • ${MediaItem.formatBytes(downloadsBytes)} Downloads" else "Downloads & APKs"
                            Text(
                                text = "${MediaItem.formatBytes(totalReclaimableBytes)} • $desc",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = ColorTextPrimary
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        OutlinedButton(
                            onClick = { onClearSystemCache?.invoke() },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp),
                            contentPadding = PaddingValues(vertical = 8.dp),
                            colors = ButtonDefaults.outlinedButtonColors(contentColor = ColorEmeraldSafe),
                            border = androidx.compose.foundation.BorderStroke(1.dp, ColorEmeraldSafe.copy(alpha = 0.4f)),
                            enabled = systemCacheBytes > 0
                        ) {
                            Text(
                                text = if (systemCacheBytes > 0) "Clear Cache" else "Cache Cleared ✓",
                                fontSize = 11.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = if (systemCacheBytes > 0) ColorEmeraldSafe else ColorTextSecondary
                            )
                        }

                        Button(
                            onClick = { onClearClicked?.invoke() },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = ColorEmeraldSafe),
                            shape = RoundedCornerShape(10.dp),
                            contentPadding = PaddingValues(vertical = 8.dp)
                        ) {
                            Text(
                                text = "Clean All",
                                fontSize = 11.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))
            }

            // The Master Storage Allocation Donut Chart
            StorageDonutChart(
                totalCapacityBytes = totalCapacity,
                totalUsedBytes = totalUsedBytes,
                categories = categories,
                selectedCategory = selectedCategory,
                onCategorySelected = { selectedCategory = if (selectedCategory == it) null else it }
            )
        }
    }
}

@Composable
fun StorageDonutChart(
    totalCapacityBytes: Long,
    totalUsedBytes: Long,
    categories: List<CategorySummary>,
    selectedCategory: MediaCategory?,
    onCategorySelected: (MediaCategory) -> Unit
) {
    val nonZeroCategories = categories.filter { it.totalSizeBytes > 0 }
    val totalBytes = maxOf(1L, if (nonZeroCategories.isNotEmpty()) nonZeroCategories.sumOf { it.totalSizeBytes } else totalUsedBytes)

    Box(
        modifier = Modifier
            .size(240.dp)
            .padding(8.dp),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val strokeWidth = 32.dp.toPx()
            val diameter = size.minDimension - strokeWidth
            val arcSize = Size(diameter, diameter)
            val topLeft = Offset(strokeWidth / 2f, strokeWidth / 2f)

            // Background Track
            drawArc(
                color = ColorBorderLight,
                startAngle = 0f,
                sweepAngle = 360f,
                useCenter = false,
                topLeft = topLeft,
                size = arcSize,
                style = Stroke(width = strokeWidth)
            )

            // Draw Slices
            var currentAngle = -90f
            val gapAngle = 3f

            nonZeroCategories.forEach { cat ->
                val fraction = cat.totalSizeBytes.toFloat() / totalBytes.toFloat()
                val rawSweep = fraction * 360f
                val sweep = (rawSweep - gapAngle).coerceAtLeast(1f)
                val isSelected = selectedCategory == cat.category
                val color = getCategoryColor(cat.category)

                drawArc(
                    color = if (isSelected) color else color.copy(alpha = 0.90f),
                    startAngle = currentAngle + (gapAngle / 2f),
                    sweepAngle = sweep,
                    useCenter = false,
                    topLeft = topLeft,
                    size = arcSize,
                    style = Stroke(
                        width = if (isSelected) strokeWidth * 1.15f else strokeWidth,
                        cap = StrokeCap.Round
                    )
                )

                currentAngle += rawSweep
            }
        }

        // Center Telemetry Hub
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(16.dp)
        ) {
            val displayCategory = nonZeroCategories.firstOrNull { it.category == selectedCategory }
            if (displayCategory != null) {
                Text(
                    text = displayCategory.category.title.uppercase(),
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorTextSecondary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = displayCategory.formattedSize,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace,
                    color = ColorTextPrimary
                )
                val pct = (displayCategory.totalSizeBytes.toDouble() / totalBytes.toDouble() * 100).toInt()
                Text(
                    text = "$pct% ALLOCATED",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = getCategoryColor(displayCategory.category)
                )
            } else {
                Text(
                    text = "USED",
                    fontSize = 9.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorTextSecondary,
                    letterSpacing = 0.8.sp
                )
                Text(
                    text = MediaItem.formatBytes(totalUsedBytes),
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace,
                    color = ColorTextPrimary
                )
                val usedPct = (totalUsedBytes.toDouble() / totalCapacityBytes.toDouble() * 100).coerceIn(0.0, 100.0)
                Text(
                    text = String.format("%.1f%% of %s", usedPct, MediaItem.formatBytes(totalCapacityBytes)),
                    fontSize = 10.5.sp,
                    fontWeight = FontWeight.Medium,
                    color = ColorTextSecondary
                )
            }
        }
    }
}

@Composable
fun CategorySummaryList(
    categories: List<CategorySummary>,
    appCacheBytes: Long = 0L,
    onCategoryClicked: ((MediaCategory) -> Unit)? = null,
    onClearCategoryClicked: ((MediaCategory) -> Unit)? = null,
    onManageCachesClicked: (() -> Unit)? = null
) {
    val totalBytes = maxOf(1L, categories.sumOf { it.totalSizeBytes })

    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp, horizontal = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "MEDIA & STORAGE ALLOCATION",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorTextSecondary,
                    letterSpacing = 0.6.sp
                )
                Text(
                    text = "${categories.sumOf { it.itemCount }} items",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Medium,
                    color = ColorTextSecondary.copy(alpha = 0.7f)
                )
            }
        }

        items(categories) { cat ->
            val color = getCategoryColor(cat.category)
            val pct = (cat.totalSizeBytes.toDouble() / totalBytes.toDouble() * 100)
            val isReclaimable = cat.category == MediaCategory.DOWNLOADS ||
                                cat.category == MediaCategory.APK_INSTALLERS ||
                                cat.category == MediaCategory.APP_CACHE ||
                                cat.category == MediaCategory.SCREENSHOTS
            val isAppCache = cat.category == MediaCategory.APP_CACHE
            val isInstalledApps = cat.category == MediaCategory.INSTALLED_APPS
            val isSystem = cat.category == MediaCategory.SYSTEM_OS

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        if (isAppCache && onManageCachesClicked != null) {
                            onManageCachesClicked()
                        } else {
                            onCategoryClicked?.invoke(cat.category)
                        }
                    },
                colors = CardDefaults.cardColors(containerColor = ColorCardLight),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                shape = RoundedCornerShape(14.dp)
            ) {
                Column(
                    modifier = Modifier.padding(14.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Left Cluster: Icon + Title + Cleanable Tag + Items
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.weight(1f)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(28.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(color.copy(alpha = 0.12f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(10.dp)
                                        .clip(CircleShape)
                                        .background(color)
                                )
                            }
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = cat.category.title,
                                        fontSize = 13.5.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = ColorTextPrimary
                                    )
                                    if (isAppCache) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(ColorPurpleAI.copy(alpha = 0.12f))
                                                .padding(horizontal = 5.dp, vertical = 1.dp)
                                        ) {
                                            Text(
                                                text = "Storage Bucket",
                                                fontSize = 9.5.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = ColorPurpleAI
                                            )
                                        }
                                    } else if (isReclaimable) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(ColorEmeraldSafe.copy(alpha = 0.12f))
                                                .padding(horizontal = 5.dp, vertical = 1.dp)
                                        ) {
                                            Text(
                                                text = "Reclaimable",
                                                fontSize = 9.5.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = ColorEmeraldSafe
                                            )
                                        }
                                    } else if (isSystem) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(ColorSlateSystem.copy(alpha = 0.12f))
                                                .padding(horizontal = 5.dp, vertical = 1.dp)
                                        ) {
                                            Text(
                                                text = "Protected",
                                                fontSize = 9.5.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = ColorSlateSystem
                                            )
                                        }
                                    }
                                }
                                val subtitleText = when {
                                    isAppCache -> "${cat.itemCount} apps with cache • Tap to inspect bucket"
                                    isInstalledApps -> "${cat.itemCount} applications • Code & app data"
                                    isSystem -> "Android 14 OS • Firmware partition"
                                    else -> "${cat.itemCount} items"
                                }
                                Text(
                                    text = subtitleText,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = ColorTextSecondary
                                )
                            }
                        }

                        // Right Cluster: Metrics strictly right-aligned with uniform accessory slot
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Column(horizontalAlignment = Alignment.End) {
                                Text(
                                    text = cat.formattedSize,
                                    fontSize = 13.5.sp,
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Monospace,
                                    color = ColorTextPrimary
                                )
                                Text(
                                    text = String.format("%.1f%%", pct),
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = ColorTextSecondary
                                )
                            }
                            Text(
                                text = "›",
                                fontSize = 16.sp,
                                color = ColorTextSecondary.copy(alpha = 0.5f)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Proportional Linear Progress Bar
                    val animatedProgress by animateFloatAsState(
                        targetValue = (cat.totalSizeBytes.toFloat() / totalBytes.toFloat()).coerceIn(0f, 1f),
                        animationSpec = tween(600),
                        label = "progress"
                    )

                    LinearProgressIndicator(
                        progress = { animatedProgress },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(5.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = color,
                        trackColor = ColorBorderLight
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(80.dp))
        }
    }
}

@Composable
fun AppCacheBucketCard(
    totalCacheBytes: Long,
    appCount: Int,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = ColorCardLight),
        border = androidx.compose.foundation.BorderStroke(1.dp, ColorPurpleAI.copy(alpha = 0.25f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.weight(1f)
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(ColorPurpleAI.copy(alpha = 0.12f)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = "📦", fontSize = 18.sp)
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "App Cache Bucket",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = ColorTextPrimary
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(4.dp))
                                .background(ColorPurpleAI.copy(alpha = 0.10f))
                                .padding(horizontal = 5.dp, vertical = 1.dp)
                        ) {
                            Text(
                                text = "$appCount Apps",
                                fontSize = 9.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = ColorPurpleAI
                            )
                        }
                    }
                    Text(
                        text = "Media buffers & temp streams • Tap to inspect",
                        fontSize = 11.sp,
                        color = ColorTextSecondary
                    )
                }
            }

            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = MediaItem.formatBytes(totalCacheBytes),
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    color = ColorPurpleAI
                )
                Text(
                    text = "Inspect ›",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = ColorBrandCyan
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppCacheBottomSheet(
    apps: List<AppCacheEntry>,
    onDismiss: () -> Unit,
    onClearSingleApp: (String) -> Unit,
    onClearAllCaches: () -> Unit,
    onDeleteSelectedCaches: ((Set<String>) -> Unit)? = null
) {
    val unclearedApps = apps.filter { !it.isCleared && it.cacheSizeBytes > 0 }
    var selectedAppIds by remember { mutableStateOf(unclearedApps.map { it.id }.toSet()) }

    val selectedBytes = apps.filter { !it.isCleared && selectedAppIds.contains(it.id) }.sumOf { it.cacheSizeBytes }

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        containerColor = ColorCardLight,
        dragHandle = { BottomSheetDefaults.DragHandle() }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .padding(bottom = 32.dp)
        ) {
            Text(
                text = "App Cache Bucket",
                fontSize = 18.sp,
                fontWeight = FontWeight.ExtraBold,
                color = ColorTextPrimary
            )
            Text(
                text = "Go inside the bucket and select which applications to clean.",
                fontSize = 12.sp,
                color = ColorTextSecondary,
                modifier = Modifier.padding(top = 2.dp, bottom = 12.dp)
            )

            // Selection Controls Bar
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(ColorBgLight)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "${selectedAppIds.size} of ${unclearedApps.size} Selected",
                    fontSize = 11.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorBrandCyan
                )

                Text(
                    text = if (selectedAppIds.size == unclearedApps.size && unclearedApps.isNotEmpty()) "Deselect All" else "Select All",
                    fontSize = 11.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorBrandCyan,
                    modifier = Modifier.clickable {
                        selectedAppIds = if (selectedAppIds.size == unclearedApps.size && unclearedApps.isNotEmpty()) {
                            emptySet()
                        } else {
                            unclearedApps.map { it.id }.toSet()
                        }
                    }
                )
            }

            Spacer(modifier = Modifier.height(10.dp))

            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f, fill = false),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(apps) { app ->
                    val isChecked = selectedAppIds.contains(app.id) && !app.isCleared

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable(enabled = !app.isCleared) {
                                selectedAppIds = if (selectedAppIds.contains(app.id)) {
                                    selectedAppIds - app.id
                                } else {
                                    selectedAppIds + app.id
                                }
                            },
                        colors = CardDefaults.cardColors(
                            containerColor = if (isChecked) ColorEmeraldSafe.copy(alpha = 0.06f) else ColorBgLight
                        ),
                        shape = RoundedCornerShape(12.dp),
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (isChecked) ColorEmeraldSafe.copy(alpha = 0.4f) else ColorBorderLight
                        )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.weight(1f)
                            ) {
                                Checkbox(
                                    checked = isChecked,
                                    onCheckedChange = { checked ->
                                        selectedAppIds = if (checked) {
                                            selectedAppIds + app.id
                                        } else {
                                            selectedAppIds - app.id
                                        }
                                    },
                                    enabled = !app.isCleared,
                                    colors = CheckboxDefaults.colors(
                                        checkedColor = ColorEmeraldSafe,
                                        checkmarkColor = Color.White
                                    )
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Column {
                                    Text(
                                        text = app.name,
                                        fontSize = 13.5.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = ColorTextPrimary
                                    )
                                    Text(
                                        text = "Cache: ${if (app.isCleared) "0 B" else MediaItem.formatBytes(app.cacheSizeBytes)}",
                                        fontSize = 11.5.sp,
                                        color = if (app.isCleared) ColorTextSecondary else ColorEmeraldSafe,
                                        fontWeight = FontWeight.SemiBold
                                    )
                                }
                            }

                            if (app.isCleared) {
                                Text(
                                    text = "Cleaned ✓",
                                    fontSize = 11.5.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = ColorTextSecondary
                                )
                            } else {
                                Text(
                                    text = MediaItem.formatBytes(app.cacheSizeBytes),
                                    fontSize = 13.sp,
                                    fontFamily = FontFamily.Monospace,
                                    fontWeight = FontWeight.Bold,
                                    color = ColorTextPrimary
                                )
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            // Sticky Bottom Action Bar
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "SELECTED TO DELETE",
                        fontSize = 9.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = ColorTextSecondary,
                        letterSpacing = 0.5.sp
                    )
                    Text(
                        text = MediaItem.formatBytes(selectedBytes),
                        fontSize = 17.sp,
                        fontWeight = FontWeight.ExtraBold,
                        fontFamily = FontFamily.Monospace,
                        color = ColorEmeraldSafe
                    )
                }

                Button(
                    onClick = {
                        if (onDeleteSelectedCaches != null) {
                            onDeleteSelectedCaches(selectedAppIds)
                        } else {
                            selectedAppIds.forEach { onClearSingleApp(it) }
                        }
                    },
                    enabled = selectedBytes > 0,
                    colors = ButtonDefaults.buttonColors(containerColor = ColorEmeraldSafe),
                    shape = RoundedCornerShape(12.dp),
                    contentPadding = PaddingValues(horizontal = 18.dp, vertical = 10.dp)
                ) {
                    Text(
                        text = if (selectedBytes > 0) "Delete Selected (${MediaItem.formatBytes(selectedBytes)})" else "Select to Delete",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                }
            }
        }
    }
}
