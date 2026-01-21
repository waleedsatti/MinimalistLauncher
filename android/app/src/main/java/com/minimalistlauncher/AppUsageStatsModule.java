package com.minimalistlauncher;

import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.os.Process;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

public class AppUsageStatsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public AppUsageStatsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppUsageStatsModule";
    }

    @ReactMethod
    public void hasUsageStatsPermission(Promise promise) {
        try {
            AppOpsManager appOps = (AppOpsManager) reactContext
                .getSystemService(Context.APP_OPS_SERVICE);
            int mode = appOps.checkOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                Process.myUid(),
                reactContext.getPackageName()
            );
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void requestUsageStatsPermission(Promise promise) {
        try {
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getUsageStats(String startDateStr, String endDateStr, Promise promise) {
        try {
            long startTime = Long.parseLong(startDateStr);
            long endTime = Long.parseLong(endDateStr);

            UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext
                .getSystemService(Context.USAGE_STATS_SERVICE);

            Map<String, UsageStats> usageStatsMap = usageStatsManager
                .queryAndAggregateUsageStats(startTime, endTime);

            WritableMap result = Arguments.createMap();

            for (Map.Entry<String, UsageStats> entry : usageStatsMap.entrySet()) {
                UsageStats stats = entry.getValue();
                WritableMap appData = Arguments.createMap();
                appData.putDouble("totalTimeInForeground",
                    (double) stats.getTotalTimeInForeground());
                appData.putDouble("lastTimeUsed",
                    (double) stats.getLastTimeUsed());
                appData.putDouble("firstTimeStamp",
                    (double) stats.getFirstTimeStamp());
                appData.putDouble("lastTimeStamp",
                    (double) stats.getLastTimeStamp());

                result.putMap(stats.getPackageName(), appData);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getDailyUsage(String dateStr, Promise promise) {
        try {
            // Parse YYYY-MM-DD format
            String[] parts = dateStr.split("-");
            int year = Integer.parseInt(parts[0]);
            int month = Integer.parseInt(parts[1]) - 1; // Calendar months are 0-indexed
            int day = Integer.parseInt(parts[2]);

            Calendar calendar = Calendar.getInstance();
            calendar.set(year, month, day, 0, 0, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            long startTime = calendar.getTimeInMillis();

            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            calendar.set(Calendar.MILLISECOND, 999);
            long endTime = calendar.getTimeInMillis();

            UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext
                .getSystemService(Context.USAGE_STATS_SERVICE);

            Map<String, UsageStats> usageStatsMap = usageStatsManager
                .queryAndAggregateUsageStats(startTime, endTime);

            WritableMap result = Arguments.createMap();

            for (Map.Entry<String, UsageStats> entry : usageStatsMap.entrySet()) {
                UsageStats stats = entry.getValue();
                WritableMap appData = Arguments.createMap();
                appData.putDouble("totalTimeInForeground",
                    (double) stats.getTotalTimeInForeground());
                appData.putDouble("lastTimeUsed",
                    (double) stats.getLastTimeUsed());

                result.putMap(stats.getPackageName(), appData);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getTodayUsage(Promise promise) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            long startTime = calendar.getTimeInMillis();
            long endTime = System.currentTimeMillis();

            UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext
                .getSystemService(Context.USAGE_STATS_SERVICE);

            Map<String, UsageStats> usageStatsMap = usageStatsManager
                .queryAndAggregateUsageStats(startTime, endTime);

            WritableMap result = Arguments.createMap();

            for (Map.Entry<String, UsageStats> entry : usageStatsMap.entrySet()) {
                UsageStats stats = entry.getValue();
                WritableMap appData = Arguments.createMap();
                appData.putDouble("totalTimeInForeground",
                    (double) stats.getTotalTimeInForeground());
                appData.putDouble("lastTimeUsed",
                    (double) stats.getLastTimeUsed());

                result.putMap(stats.getPackageName(), appData);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
