package com.example.androidbrain;

import android.content.Intent;
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

import java.util.Random;

public class WordScrambleGame extends AppCompatActivity {

    EditText edguess;
    Button btnguess;
    TextView edhint, edattempt, guessword, guessedLettersView, tvscore;

    String selectedword;
    char[] displayedWord;
    String guessedLetters = "";
    int attempts = 5;
    int score = 0;

    String [] words = {"apple", "banana", "orange", "computer", "school"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.word_scramble_game_activity_);

        edguess = findViewById(R.id.edguess);
        btnguess = findViewById(R.id.btnguess);
        edhint = findViewById(R.id.edhint);
        edattempt = findViewById(R.id.edattempt);
        guessword = findViewById(R.id.guessword);
        guessedLettersView = findViewById(R.id.guessedletters);
        tvscore = findViewById(R.id.tvscore);

        //pick a random word
        Random random = new Random();
        selectedword = words[random.nextInt(words.length)].toUpperCase();

        //create the displayedWord array with underscores
        displayedWord = new char[selectedword.length()];
        for(int i = 0; i < displayedWord.length; i++){
            displayedWord[i] = '_';
        }

        //show the dashes
        guessword.setText(displayedWordToString());
        edattempt.setText("Attempts left: " + attempts);
        guessedLettersView.setText("Guessed letters: ");

        btnguess.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String guess = edguess.getText().toString().trim().toUpperCase();

                if(guess.length() != 1){
                    edhint.setText("Please enter a single letter");
                    return;
                }

                char guessedChar = guess.charAt(0);

                if(guessedLetters.indexOf(guessedChar) >= 0){
                    edhint.setText("You already guessed that letter");
                    return;
                }

                guessedLetters += guessedChar;
                guessedLettersView.setText("Guessed letters: " + formatGuessedLetters(guessedLetters));

                boolean correctGuess = false;

                for (int i = 0; i < selectedword.length(); i++) {
                    if (selectedword.charAt(i) == guessedChar) {
                        displayedWord[i] = guessedChar;
                        correctGuess = true;
                    }
                }

                if (correctGuess) {
                    edhint.setText("Correct!");
                    score++;
                } else {
                    edhint.setText("Incorrect!");
                    attempts--;
                }

                //update the displayed word and attempts
                tvscore.setText("Score :" + score);
                guessword.setText(displayedWordToString());
                edattempt.setText("Attempts left: " + attempts);

                //check win
                if(String.valueOf(displayedWord).equals(selectedword)){
                    edhint.setText("Congratulations! You guessed the word!");
                    btnguess.setEnabled(false);

                    //send the score to the mainactivity
                    Intent intent = new Intent();
                }

                //check lose
                if(attempts == 0){
                    edhint.setText("Game over! The word was: " + selectedword);
                    btnguess.setEnabled(false);
                }

                edguess.setText("");
            }
        });
    }



    //helper function to convert the char array into string for display
    private String displayedWordToString() {
        StringBuilder sb = new StringBuilder();
        for (char c : displayedWord) {
            sb.append(c).append(' '); // add space between letters
        }
        return sb.toString();
    }

    //helper function to add commas between guessed letters
    private String formatGuessedLetters(String letters) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < letters.length(); i++) {
            sb.append(letters.charAt(i));
            if (i != letters.length() - 1) sb.append(", ");
        }
        return sb.toString();
    }
}