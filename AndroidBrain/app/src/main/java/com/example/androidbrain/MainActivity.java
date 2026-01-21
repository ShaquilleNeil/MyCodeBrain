package com.example.androidbrain;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidbrain.NumberAnalyzer.NumberAnalyzer;

public class MainActivity extends AppCompatActivity {

    Button btnpalindrome, btnfibonacci, btnwordscramble, btnnumberanalyzer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Enables edge-to-edge (safe area ignored unless you apply insets)
        EdgeToEdge.enable(this);

        setContentView(R.layout.activity_main);
        View root = findViewById(android.R.id.content);

        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(
                    systemBars.left,
                    systemBars.top,
                    systemBars.right,
                    systemBars.bottom
            );
            return insets;
        });

        btnpalindrome = findViewById(R.id.btnmpalindrome);
        btnfibonacci = findViewById(R.id.btnfibonacci);
        btnwordscramble = findViewById(R.id.btnwordscramble);
        btnnumberanalyzer = findViewById(R.id.btnnumberanalyzer);

        btnnumberanalyzer.setOnClickListener(view ->
                startActivity(new Intent(this, NumberAnalyzer.class)));


        btnpalindrome.setOnClickListener(view ->
                startActivity(new Intent(this, PalindromeChecker.class)));

        btnfibonacci.setOnClickListener(view ->
                startActivity(new Intent(this, FibonacciPrinter.class)));

        btnwordscramble.setOnClickListener(view ->
                startActivity(new Intent(this, WordScrambleGame.class)));
    }
}
