package com.example.androidbrain.FireBasePractice;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidbrain.R;

public class FireBaseMainPage extends AppCompatActivity {
    Button button1,button2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_fire_base_main_page);


        button1=findViewById(R.id.button1);
        button2=findViewById(R.id.button2);

        button1.setOnClickListener(view -> {
            startActivity(new Intent(FireBaseMainPage.this,AddProductsPage.class));

        });

        button2.setOnClickListener(view -> {
            startActivity(new Intent(FireBaseMainPage.this,ViewAllProducts.class));


        });

    }
}