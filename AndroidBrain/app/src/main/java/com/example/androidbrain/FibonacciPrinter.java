package com.example.androidbrain;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class FibonacciPrinter extends AppCompatActivity {

    EditText etfibonacci;
    TextView tvfibonacci;
    Button btnrecursice, btniterative;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.fibonacci_printer_activity_);

        etfibonacci = findViewById(R.id.etfibonacci);
        tvfibonacci = findViewById(R.id.tvfibonacci);
        btnrecursice = findViewById(R.id.btnRecursive);
        btniterative = findViewById(R.id.btnIterative);


        btniterative.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               int num = Integer.parseInt(etfibonacci.getText().toString());
               printFibonacci(num);

            }
        });

        btnrecursice.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int num = Integer.parseInt(etfibonacci.getText().toString());
                String result = String.valueOf(printFibonacciRecursiveHelper(num));
                tvfibonacci.setText(result);
            }
        });


    }

    private void printFibonacci(int n) {
        int a = 0;
        int b = 1;
        int c = 0;

        if(n == 0){
            return;
        }

        StringBuilder result = new StringBuilder();

        for(int i = 0; i < n; i++){
            result.append(a).append(" ");
            c = a + b;
            a = b;
            b = c;
        }
       tvfibonacci.setText(result.toString());
    }

    private long printFibonacciRecursive(int n) {
        if(n == 0 || n == 1){
            return n;
        }
       return printFibonacciRecursive(n-1) + printFibonacciRecursive(n-2);
    }

    private String printFibonacciRecursiveHelper(int n){

        StringBuilder result = new StringBuilder();

        for(int i = 0; i < n; i++){
            result.append(printFibonacciRecursive(i)).append(" ");
        }
        return result.toString();
    }



}