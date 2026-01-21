package com.example.androidbrain.MathGame;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.androidbrain.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MathGameHome extends AppCompatActivity {
    TextView tvusername,tvscore;
    Button btngame,btnscore;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.math_game_home_activity);

        tvusername=findViewById(R.id.tvusername);
        btngame=findViewById(R.id.btngame);
        btnscore=findViewById(R.id.btnscore);
        tvscore=findViewById(R.id.tvscore);


        loaduserinfo();

        btnscore.setOnClickListener(view -> {
            Intent intent = new Intent(this, MathGameProfile.class);
            startActivity(intent);
        });

        btngame.setOnClickListener(view -> {

            Intent intent = new Intent(this, MathGameMainGame.class);
            startActivity(intent);
        });



    }




    private void loaduserinfo() {
        FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        if (firebaseUser == null) {
            tvusername.setText("No user found");
            return;
        }

        String uid = firebaseUser.getUid();

        DatabaseReference ref = FirebaseDatabase.getInstance()
                .getReference("users")
                .child(uid);

        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                if (snapshot.exists()) {

                    String username = snapshot.child("username").getValue(String.class);
                    Integer scoreVal = snapshot.child("score").getValue(Integer.class);

                    if (scoreVal == null) scoreVal = 0;

                    tvusername.setText(username);
                    tvscore.setText("HighScore: " + scoreVal);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                tvusername.setText("Error loading");
            }
        });
    }

}