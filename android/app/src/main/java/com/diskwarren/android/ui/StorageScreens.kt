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
        MediaCategory.VIDEOS -> ColorBlueApps
        MediaCategory.AUDIO -> ColorPurpleAI
        MediaCategory.DOWNLOADS -> ColorAmberReview
        MediaCategory.DOCUMENTS -> Color(0xFFD97706)
        MediaCategory.SYSTEM_APPS -> ColorSlateSystem
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
    appCacheBytes: Long = 0L,
    onScanClicked: () -> Unit,
    onClearClicked: (() -> Unit)? = null,
    onManageCachesClicked: (() -> Unit)? = null
) {
    var selectedCategory by remember { mutableStateOf<MediaCategory?>(null) }
    val totalCapacity = maxOf(1L, totalUsedBytes + totalAvailableBytes)

    // Compute reclaimable candidates (Downloads + App Caches)
    val downloadsBytes = categories
        .filter { it.category == MediaCategory.DOWNLOADS }
        .sumOf { it.totalSizeBytes }
    val totalReclaimableBytes = downloadsBytes + appCacheBytes

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

            // Reclaimable Space Banner (Downloads & App Caches) - 2-Tier Architecture
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
                            val desc = if (appCacheBytes > 0) "${MediaItem.formatBytes(appCacheBytes)} Caches • ${MediaItem.formatBytes(totalReclaimableBytes - appCacheBytes)} Downloads" else "Downloads"
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
                        if (appCacheBytes > 0 && onManageCachesClicked != null) {
                            OutlinedButton(
                                onClick = onManageCachesClicked,
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp),
                                contentPadding = PaddingValues(vertical = 8.dp),
                                colors = ButtonDefaults.outlinedButtonColors(contentColor = ColorEmeraldSafe),
                                border = androidx.compose.foundation.BorderStroke(1.dp, ColorEmeraldSafe.copy(alpha = 0.4f))
                            ) {
                                Text(
                                    text = "Clear Cache (${MediaItem.formatBytes(appCacheBytes)})",
                                    fontSize = 11.5.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = ColorEmeraldSafe
                                )
                            }
                        }

                        Button(
                            onClick = { onClearClicked?.invoke() },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = ColorEmeraldSafe),
                            shape = RoundedCornerShape(10.dp),
                            contentPadding = PaddingValues(vertical = 8.dp)
                        ) {
                            Text(
                                text = "Clean All (${MediaItem.formatBytes(totalReclaimableBytes)})",
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
            val isReclaimable = cat.category == MediaCategory.DOWNLOADS
            val isAppCategory = cat.category == MediaCategory.SYSTEM_APPS

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        if (isAppCategory && onManageCachesClicked != null) {
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
                                    if (isReclaimable) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(ColorEmeraldSafe.copy(alpha = 0.12f))
                                                .padding(horizontal = 5.dp, vertical = 1.dp)
                                        ) {
                                            Text(
                                                text = "Cleanable",
                                                fontSize = 9.5.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = ColorEmeraldSafe
                                            )
                                        }
                                    }
                                    if (isAppCategory && appCacheBytes > 0) {
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Box(
                                            modifier = Modifier
                                                .clip(RoundedCornerShape(4.dp))
                                                .background(ColorBrandCyan.copy(alpha = 0.12f))
                                                .padding(horizontal = 5.dp, vertical = 1.dp)
                                        ) {
                                            Text(
                                                text = "${MediaItem.formatBytes(appCacheBytes)} Cache",
                                                fontSize = 9.5.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = ColorBrandCyan
                                            )
                                        }
                                    }
                                }
                                Text(
                                    text = if (isAppCategory && appCacheBytes > 0) "${cat.itemCount} apps • Tap to clear cache" else "${cat.itemCount} items",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = ColorTextSecondary
                                )
                            }
                        }

                        // Right Cluster: Metrics strictly right-aligned with uniform accessory slot
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            if (isAppCategory && appCacheBytes > 0 && onManageCachesClicked != null) {
                                OutlinedButton(
                                    onClick = onManageCachesClicked,
                                    shape = RoundedCornerShape(8.dp),
                                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp),
                                    colors = ButtonDefaults.outlinedButtonColors(contentColor = ColorEmeraldSafe),
                                    border = androidx.compose.foundation.BorderStroke(1.dp, ColorEmeraldSafe.copy(alpha = 0.5f))
                                ) {
                                    Text(
                                        text = "Clear Cache",
                                        fontSize = 10.5.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = ColorEmeraldSafe
                                    )
                                }
                            }
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppCacheBottomSheet(
    apps: List<AppCacheEntry>,
    onDismiss: () -> Unit,
    onClearSingleApp: (String) -> Unit,
    onClearAllCaches: () -> Unit
) {
    val totalCache = apps.filter { !it.isCleared }.sumOf { it.cacheSizeBytes }

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
                text = "App Cache Manager",
                fontSize = 18.sp,
                fontWeight = FontWeight.ExtraBold,
                color = ColorTextPrimary
            )
            Text(
                text = "Temporary streams, webviews, and shader caches safe to scrub without losing logins.",
                fontSize = 12.sp,
                color = ColorTextSecondary,
                modifier = Modifier.padding(top = 2.dp, bottom = 14.dp)
            )

            // Master Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = ColorEmeraldSafe.copy(alpha = 0.10f)),
                shape = RoundedCornerShape(14.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "TOTAL CLEANABLE CACHE",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = ColorEmeraldSafe
                        )
                        Text(
                            text = MediaItem.formatBytes(totalCache),
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold,
                            fontFamily = FontFamily.Monospace,
                            color = ColorTextPrimary
                        )
                    }

                    Button(
                        onClick = onClearAllCaches,
                        enabled = totalCache > 0,
                        colors = ButtonDefaults.buttonColors(containerColor = ColorEmeraldSafe),
                        shape = RoundedCornerShape(10.dp),
                        contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = if (totalCache > 0) "Clear All Caches" else "All Cleaned ✓",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "INSTALLED APPLICATIONS",
                fontSize = 10.5.sp,
                fontWeight = FontWeight.Bold,
                color = ColorTextSecondary,
                modifier = Modifier.padding(bottom = 8.dp)
            )

            LazyColumn(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(apps) { app ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = ColorBgLight),
                        shape = RoundedCornerShape(12.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, ColorBorderLight)
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
                                Text(
                                    text = app.icon,
                                    fontSize = 20.sp,
                                    modifier = Modifier
                                        .size(36.dp)
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(Color.White)
                                        .wrapContentSize(Alignment.Center)
                                )
                                Spacer(modifier = Modifier.width(10.dp))
                                Column {
                                    Text(
                                        text = app.name,
                                        fontSize = 13.5.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = ColorTextPrimary
                                    )
                                    Text(
                                        text = "Total: ${MediaItem.formatBytes(app.totalSizeBytes)} • Cache: ${if (app.isCleared) "0 B" else MediaItem.formatBytes(app.cacheSizeBytes)}",
                                        fontSize = 11.5.sp,
                                        color = ColorTextSecondary
                                    )
                                }
                            }

                            Button(
                                onClick = { onClearSingleApp(app.id) },
                                enabled = !app.isCleared && app.cacheSizeBytes > 0,
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = ColorEmeraldSafe,
                                    disabledContainerColor = ColorBorderLight
                                ),
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
                                modifier = Modifier.height(30.dp)
                            ) {
                                Text(
                                    text = if (app.isCleared) "Cleaned ✓" else "Clear Cache",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (app.isCleared) ColorTextSecondary else Color.White
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
