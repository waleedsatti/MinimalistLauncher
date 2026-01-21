package com.minimalistlauncher;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import org.json.JSONArray;

public class AppBlockingModule extends ReactContextBaseJavaModule {

    private static final String PREFS_NAME = "MinimalistLauncherPrefs";
    private static final String KEY_BLOCKED_APPS = "blockedApps";
    private static final String KEY_BLOCKING_REASON = "blockingReason";
    private static final String KEY_BREAK_GLASS_PHRASE = "breakGlassPhrase";

    private final ReactApplicationContext reactContext;

    public AppBlockingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppBlockingModule";
    }

    @ReactMethod
    public void isAccessibilityServiceEnabled(Promise promise) {
        try {
            String packageName = reactContext.getPackageName();
            String enabledServices = Settings.Secure.getString(
                reactContext.getContentResolver(),
                Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
            );

            boolean isEnabled = enabledServices != null &&
                              enabledServices.contains(packageName);

            promise.resolve(isEnabled);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void requestAccessibilityPermission(Promise promise) {
        try {
            Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setBlockedApps(ReadableArray packageNames, String reason, Promise promise) {
        try {
            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < packageNames.size(); i++) {
                jsonArray.put(packageNames.getString(i));
            }

            SharedPreferences prefs = reactContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_BLOCKED_APPS, jsonArray.toString());
            editor.putString(KEY_BLOCKING_REASON, reason);
            editor.apply();

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void addBlockedApp(String packageName, String reason, Promise promise) {
        try {
            SharedPreferences prefs = reactContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String blockedAppsJson = prefs.getString(KEY_BLOCKED_APPS, "[]");

            JSONArray jsonArray = new JSONArray(blockedAppsJson);
            jsonArray.put(packageName);

            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_BLOCKED_APPS, jsonArray.toString());
            if (reason != null && !reason.isEmpty()) {
                editor.putString(KEY_BLOCKING_REASON, reason);
            }
            editor.apply();

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void removeBlockedApp(String packageName, Promise promise) {
        try {
            SharedPreferences prefs = reactContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String blockedAppsJson = prefs.getString(KEY_BLOCKED_APPS, "[]");

            JSONArray jsonArray = new JSONArray(blockedAppsJson);
            JSONArray newArray = new JSONArray();

            for (int i = 0; i < jsonArray.length(); i++) {
                String pkg = jsonArray.getString(i);
                if (!pkg.equals(packageName)) {
                    newArray.put(pkg);
                }
            }

            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_BLOCKED_APPS, newArray.toString());
            editor.apply();

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void clearBlockedApps(Promise promise) {
        try {
            SharedPreferences prefs = reactContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_BLOCKED_APPS, "[]");
            editor.apply();

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setBreakGlassPhrase(String phrase, Promise promise) {
        try {
            SharedPreferences prefs = reactContext
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString(KEY_BREAK_GLASS_PHRASE, phrase);
            editor.apply();

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
