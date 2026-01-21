package com.minimalistlauncher;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class BlockingActivity extends Activity {

    private static final String PREFS_NAME = "MinimalistLauncherPrefs";
    private static final String KEY_BREAK_GLASS_PHRASE = "breakGlassPhrase";
    private static final String DEFAULT_PHRASE = "I need this";

    private String blockedPackage;
    private String blockingReason;
    private EditText breakGlassInput;
    private TextView errorText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Make this activity show over lock screen
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                           WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                           WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                           WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);

        setContentView(R.layout.activity_blocking);

        blockedPackage = getIntent().getStringExtra("blockedPackage");
        blockingReason = getIntent().getStringExtra("blockingReason");

        if (blockedPackage == null) {
            finish();
            return;
        }

        // Get app name
        String appName = getAppName(blockedPackage);

        // Setup UI
        TextView titleText = findViewById(R.id.blocking_title);
        TextView messageText = findViewById(R.id.blocking_message);
        TextView reasonText = findViewById(R.id.blocking_reason);
        breakGlassInput = findViewById(R.id.break_glass_input);
        errorText = findViewById(R.id.error_text);
        Button goBackButton = findViewById(R.id.go_back_button);
        Button breakGlassButton = findViewById(R.id.break_glass_button);

        titleText.setText(appName + " is blocked");
        messageText.setText("This app is currently blocked.");
        reasonText.setText(blockingReason);

        goBackButton.setOnClickListener(v -> {
            goHome();
            finish();
        });

        breakGlassButton.setOnClickListener(v -> handleBreakGlass());
    }

    private String getAppName(String packageName) {
        PackageManager pm = getPackageManager();
        try {
            ApplicationInfo appInfo = pm.getApplicationInfo(packageName, 0);
            return pm.getApplicationLabel(appInfo).toString();
        } catch (PackageManager.NameNotFoundException e) {
            return packageName;
        }
    }

    private void handleBreakGlass() {
        String input = breakGlassInput.getText().toString().trim();

        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        String requiredPhrase = prefs.getString(KEY_BREAK_GLASS_PHRASE, DEFAULT_PHRASE);

        if (input.equals(requiredPhrase)) {
            // Remove from blocked list temporarily
            removeFromBlockedApps(blockedPackage);

            // Launch the app
            Intent launchIntent = getPackageManager().getLaunchIntentForPackage(blockedPackage);
            if (launchIntent != null) {
                startActivity(launchIntent);
            }

            finish();
        } else {
            errorText.setVisibility(View.VISIBLE);
            errorText.setText("Incorrect phrase. Type: \"" + requiredPhrase + "\"");
        }
    }

    private void removeFromBlockedApps(String packageName) {
        // Temporarily remove from blocked apps for this session
        // This could be improved to have a timer to re-add it
        // For now, the React Native side will manage re-blocking
    }

    private void goHome() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    @Override
    public void onBackPressed() {
        // Prevent back button from bypassing the block
        goHome();
        finish();
    }
}
