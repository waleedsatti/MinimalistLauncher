package com.minimalistlauncher;

import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

public class RNInstalledApplicationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNInstalledApplicationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNInstalledApplication";
    }

    @ReactMethod
    public void getApps(Promise promise) {
        try {
            PackageManager pm = reactContext.getPackageManager();
            Intent intent = new Intent(Intent.ACTION_MAIN, null);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);

            List<ResolveInfo> apps = pm.queryIntentActivities(intent, 0);
            WritableArray installedApps = Arguments.createArray();

            for (ResolveInfo app : apps) {
                WritableMap appMap = Arguments.createMap();
                String packageName = app.activityInfo.packageName;
                String appName = app.loadLabel(pm).toString();

                appMap.putString("packageName", packageName);
                appMap.putString("appName", appName);
                installedApps.pushMap(appMap);
            }

            promise.resolve(installedApps);
        } catch (Exception e) {
            promise.reject("GET_APPS_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void launchApplication(String packageName, Promise promise) {
        try {
            PackageManager pm = reactContext.getPackageManager();
            Intent launchIntent = pm.getLaunchIntentForPackage(packageName);

            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                reactContext.startActivity(launchIntent);
                promise.resolve(true);
            } else {
                promise.reject("LAUNCH_ERROR", "Could not find launch intent for package");
            }
        } catch (Exception e) {
            promise.reject("LAUNCH_ERROR", e.getMessage());
        }
    }
}
