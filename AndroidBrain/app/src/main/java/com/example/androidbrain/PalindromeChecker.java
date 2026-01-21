package com.example.androidbrain;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class PalindromeChecker extends AppCompatActivity {

    TextView tvresult;
    Button btncheck, btnclear;

    EditText etInput;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.palindrome_checker_activity_);

        tvresult = findViewById(R.id.tvResult);
        btncheck = findViewById(R.id.btnCheck);
        btnclear = findViewById(R.id.btnClear);
        etInput = findViewById(R.id.etInput);


        btncheck.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String guess = etInput.getText().toString();
                Boolean result = palindromeCheck(guess);

                if(guess.isEmpty()){
                    Toast.makeText(PalindromeChecker.this, "Please enter a word", Toast.LENGTH_SHORT).show();
                }

                if(result == Boolean.TRUE){
                    tvresult.setText("It is a palindrome");
                }else {
                    tvresult.setText("Is not a palindrome");
                }
            }
        });

        btnclear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                etInput.setText("");
            }
        });

    }


    private static  Boolean palindromeCheck(String text){
        String reversedText = new StringBuilder(text).reverse().toString();
        return text.equalsIgnoreCase(reversedText);
    }
}