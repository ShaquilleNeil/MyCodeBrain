package com.example.androidbrain.NumberAnalyzer;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.androidbrain.R;

public class NumberAnalyzer extends AppCompatActivity {

    EditText etinput;
    TextView tvresult;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_number_analyzer);


        etinput = findViewById(R.id.etinput);
        tvresult = findViewById(R.id.tvresult);

        etinput.addTextChangedListener(new TextWatcher() {
            @Override
            public void afterTextChanged(Editable s) {

            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

                String answer = etinput.getText().toString();
                tvresult.setText(analyzeNumber(answer));

            }


        });




    }

    private String analyzeNumber(String num){
        //check if empty
        if(num.isEmpty()){
            return "Please enter  a number";
        }

        int newNum;

       try{
           newNum = Integer.parseInt(num);
       }catch (NumberFormatException e){
           return "Please enter a valid number";
       }



//        Map<String, String> results;
//        results = new HashMap<>();

        AnalyzedResults results = new AnalyzedResults();





       //check if even or odd
       if(newNum % 2 == 0){
           results.parity = "Even";
       }else{
           results.parity = "Odd";
       }

       //check if positive, negative, or zero

       if(newNum < 0){
           results.sign = "Negative";
       }else if (newNum == 0){
           results.sign = "Zero";
       }else{
           results.sign = "Positive";

       }

       //check divisibility
        if(newNum % 3 == 0 && newNum % 5 == 0){
            results.divisibility = "Divisible by both 3 and 5";
        } else if(newNum % 3 == 0){
            results.divisibility = "Divisible by 3";
        }else if(newNum % 5 == 0){
            results.divisibility = "Divisible by 5";
        }else {
            results.divisibility = "Not divisible by 3 or 5";
        }





           return "Parity: " + results.getParity() + "\n" +
                   "Sign: " + results.getSign() + "\n" +
                   "Divisibility: " + results.getDivisibility();

    }
}


//what I refreshed today
//- how to use a class to store and display information
//- how to check if something is integer or not using try catch