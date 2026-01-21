package com.minimalistlauncher;

import android.accessibilityservice.AccessibilityService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.accessibility.AccessibilityEvent;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.Set;

public class AppBlockingService extends AccessibilityService {

    private static final String PREFS_NAME = "MinimalistLauncherPrefs";
    private static final String KEY_BLOCKED_APPS = "blockedApps";
    private static final String KEY_BLOCKING_REASON = "blockingReason";

    private Set<String> blockedApps = new HashSet<>();
    private String blockingReason = "";
    private String lastBlockedPackage = "";

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            if (event.getPackageName() == null) return;

            String packageName = event.getPackageName().toString();

            // Don't block the launcher itself or system UI
            if (packageName.equals(getPackageName()) ||
                packageName.equals("com.android.systemui")) {
                return;
            }

            // Reload blocked apps from shared preferences
            loadBlockedApps();

            // Check if this app is blocked
            if (blockedApps.contains(packageName)) {
                // Prevent showing blocking activity repeatedly
                if (!packageName.equals(lastBlockedPackage)) {
                    lastBlockedPackage = packageName;
                    showBlockingOverlay(packageName);
                }
            } else {
                lastBlockedPackage = "";
            }
        }
    }

    @Override
    public void onInterrupt() {
        // Required override
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        loadBlockedApps();
    }

    private void loadBlockedApps() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        String blockedAppsJson = prefs.getString(KEY_BLOCKED_APPS, "[]");
        blockingReason = prefs.getString(KEY_BLOCKING_REASON, "This app is blocked");

        blockedApps.clear();
        try {
            JSONArray jsonArray = new JSONArray(blockedAppsJson);
            for (int i = 0; i < jsonArray.length(); i++) {
                blockedApps.add(jsonArray.getString(i));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void showBlockingOverlay(String packageName) {
        Intent intent = new Intent(this, BlockingActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK |
                       Intent.FLAG_ACTIVITY_CLEAR_TOP |
                       Intent.FLAG_ACTIVITY_NO_HISTORY);
        intent.putExtra("blockedPackage", packageName);
        intent.putExtra("blockingReason", blockingReason);

        try {
            startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
