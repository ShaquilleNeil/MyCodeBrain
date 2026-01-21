package com.example.androidbrain.MathGame;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidbrain.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MathGameProfile extends AppCompatActivity {
    TextView tbupname,tbupemail,tbuppassword,tvscore;
    Button btnlogout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.math_game_profile_activity);
        tbupname=findViewById(R.id.tbupname);
        tbupemail=findViewById(R.id.tbupemail);

        tbuppassword=findViewById(R.id.tbuppassword);
        tvscore=findViewById(R.id.tvscore);
        btnlogout=findViewById(R.id.btnlogout);


        loaduserinfo();

        btnlogout.setOnClickListener(view -> {
            FirebaseAuth.getInstance().signOut();
            startActivity(new Intent(this, MathGameRegister.class));
            finish();
        });






    }



    private void loaduserinfo() {
        FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();

        if (firebaseUser == null) {
            tbupname.setText("No user found");
            return;
        }

        String uid = firebaseUser.getUid();

        DatabaseReference ref = FirebaseDatabase.getInstance()
                .getReference("users")
                .child(uid);

        ref.get().addOnCompleteListener(task -> {
            if (task.isSuccessful() && task.getResult().exists()) {

                String username = task.getResult().child("username").getValue(String.class);
                String email = task.getResult().child("email").getValue(String.class);
                Integer score = task.getResult().child("score").getValue(Integer.class);

                if (score == null) score = 0;  // <-- IMPORTANT

                tbupname.setText(username);
                tbupemail.setText(email);
                tbuppassword.setText("********");
                tvscore.setText("HighScore: " + score);
            }
        });
    }


}