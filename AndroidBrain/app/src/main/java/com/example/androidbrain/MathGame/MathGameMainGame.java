package com.example.androidbrain.MathGame;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.androidbrain.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class MathGameMainGame extends AppCompatActivity {
    TextView tvquestion,tvresult;
    EditText etanswer;
    Button btncheck, btnback;
    Random rand = new Random();
    int score, counter, currentanswer;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.math_game_main_game_activity);
        tvquestion=findViewById(R.id.tvquestion);
        tvresult=findViewById(R.id.tvresult);
        etanswer=findViewById(R.id.etanswer);
        btncheck=findViewById(R.id.btncheck);
        btnback=findViewById(R.id.btnback);

        score = 0;
        counter = 1;


        generateQuestion();
        tvresult.setText("Score: " + score);


        btncheck.setOnClickListener(view -> {
            String answerText = etanswer.getText().toString();
            if (answerText.isEmpty()) {
                tvresult.setText("Please enter an answer");
                return;
            }

            int answer = Integer.parseInt(answerText);
            if (answer == currentanswer) {
                score++;
                tvresult.setText("Score: " + score);

                counter++;
                if (counter <= 5) {
                    generateQuestion();
                }
                else {
                    tvresult.setText("Game Over");
                    btncheck.setEnabled(false);

                    //send score to database
                    addscore(score);



                }

            }
            else{
                counter++;
                if (counter <= 5) {
                    generateQuestion();
                }
                else {
                    tvresult.setText("Game Over");
                    btncheck.setEnabled(false);

                    //send score to database
                    addscore(score);



                }
            }


        });


        btnback.setOnClickListener(view -> {
            finish();
        });





    }

    private void generateQuestion() {
        int num1 = rand.nextInt(10) ;
        int num2 = rand.nextInt(10) ;
        List<String> operations = Arrays.asList("+", "-", "*", "/");
        int randomIndex = rand.nextInt(operations.size());


        String operation = operations.get(randomIndex);
        int answer = 0;

        switch (operation) {
            case "+":
                answer = num1 + num2;
                break;
            case "-":
                answer = num1 - num2;
                break;
            case "*":
                answer = num1 * num2;
                break;
            case "/":
                num2 = num2 == 0 ? 1 : num2;
                answer = num1 / num2;
                break;
        }

        String question = num1 + " " + operation + " " + num2 + " = ?";
        tvquestion.setText(question);
        etanswer.setText("");

        //store answer
        currentanswer = answer;
    }

    private void addscore(int score) {
        FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        if (firebaseUser == null) return;

        String uid = firebaseUser.getUid();

        DatabaseReference scoreRef = FirebaseDatabase.getInstance()
                .getReference("users")
                .child(uid)
                .child("score");   // THIS is the correct score location

        scoreRef.get().addOnSuccessListener(snapshot -> {
            if (!snapshot.exists()) {
                // First time saving score
                scoreRef.setValue(score);
            } else {
                Integer previous = snapshot.getValue(Integer.class);
                if (previous == null || score > previous) {
                    scoreRef.setValue(score);
                }
            }
        });
    }



















}