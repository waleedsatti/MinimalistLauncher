package com.minimalistlauncher;

import android.content.ContentResolver;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GrayscaleModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    // Accessibility display daltonizer constants
    private static final String ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED =
        "accessibility_display_daltonizer_enabled";
    private static final String ACCESSIBILITY_DISPLAY_DALTONIZER =
        "accessibility_display_daltonizer";
    private static final int DALTONIZER_MONOCHROMACY = 0; // Grayscale

    public GrayscaleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "GrayscaleModule";
    }

    @ReactMethod
    public void enableGrayscale(Promise promise) {
        try {
            ContentResolver contentResolver = reactContext.getContentResolver();

            // Enable color correction (daltonizer)
            Settings.Secure.putInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                1
            );

            // Set to monochromacy (grayscale) mode
            Settings.Secure.putInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER,
                DALTONIZER_MONOCHROMACY
            );

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to enable grayscale: " + e.getMessage());
        }
    }

    @ReactMethod
    public void disableGrayscale(Promise promise) {
        try {
            ContentResolver contentResolver = reactContext.getContentResolver();

            // Disable color correction
            Settings.Secure.putInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                0
            );

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to disable grayscale: " + e.getMessage());
        }
    }

    @ReactMethod
    public void isGrayscaleEnabled(Promise promise) {
        try {
            ContentResolver contentResolver = reactContext.getContentResolver();

            int dalonizerEnabled = Settings.Secure.getInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                0
            );

            int daltonizerMode = Settings.Secure.getInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER,
                -1
            );

            boolean isGrayscale = (dalonizerEnabled == 1) &&
                                 (daltonizerMode == DALTONIZER_MONOCHROMACY);

            promise.resolve(isGrayscale);
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to check grayscale status: " + e.getMessage());
        }
    }

    @ReactMethod
    public void toggleGrayscale(Promise promise) {
        try {
            ContentResolver contentResolver = reactContext.getContentResolver();

            int dalonizerEnabled = Settings.Secure.getInt(
                contentResolver,
                ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                0
            );

            if (dalonizerEnabled == 1) {
                // Currently enabled, disable it
                Settings.Secure.putInt(
                    contentResolver,
                    ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                    0
                );
                promise.resolve(false);
            } else {
                // Currently disabled, enable it
                Settings.Secure.putInt(
                    contentResolver,
                    ACCESSIBILITY_DISPLAY_DALTONIZER_ENABLED,
                    1
                );
                Settings.Secure.putInt(
                    contentResolver,
                    ACCESSIBILITY_DISPLAY_DALTONIZER,
                    DALTONIZER_MONOCHROMACY
                );
                promise.resolve(true);
            }
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to toggle grayscale: " + e.getMessage());
        }
    }
}
