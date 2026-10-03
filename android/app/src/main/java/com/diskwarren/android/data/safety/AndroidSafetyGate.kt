package com.diskwarren.android.data.safety

import android.app.PendingIntent
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import android.provider.Settings
import com.diskwarren.android.data.model.MediaItem
import com.diskwarren.android.data.model.SafetyLevel

object AndroidSafetyGate {

    fun validateItemSafety(item: MediaItem): SafetyLevel {
        // Screenshots and public downloads are classified as low risk for cleanup
        if (item.displayName.contains("screenshot", ignoreCase = true) ||
            item.relativePath.contains("Download", ignoreCase = true)) {
            return SafetyLevel.LOW_RISK
        }

        // Camera rolls and personal recordings require explicit review
        return SafetyLevel.REVIEW_REQUIRED
    }

    fun createTrashPendingIntent(
        contentResolver: ContentResolver,
        uris: List<Uri>
    ): PendingIntent? {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            MediaStore.createTrashRequest(contentResolver, uris, true)
        } else {
            null
        }
    }

    fun getSystemStorageSettingsIntent(): Intent {
        return Intent(Settings.ACTION_MANAGE_STORAGE)
    }
}
