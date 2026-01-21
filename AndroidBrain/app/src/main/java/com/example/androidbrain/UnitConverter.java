package com.example.androidbrain;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class UnitConverter extends AppCompatActivity {

    Spinner selectspin,opt1spin,opt2spin;
    TextView tvresult;
    EditText edValue;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.unit_converter_activity);

        edValue = findViewById(R.id.edValue);
        selectspin = findViewById(R.id.selectspin);
        opt1spin = findViewById(R.id.opt1spin);
        opt2spin = findViewById(R.id.opt2spin);
        tvresult = findViewById(R.id.tvresult);

        String [] selectUnits = {"Temperature","Length", "weight"};
        String [] optUnitslength = {"Meters","Centimeters", "Kilometers"};
        String [] optUnitsTemp = {"Celcius", "Fahrenheit","Kelvin"};
        String [] optUnitsWeight = {"Kilograms", "pounds","grams"};
        ArrayAdapter<String> spinadapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item,selectUnits);
        ArrayAdapter<String> spinadapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item,optUnitslength);
        ArrayAdapter<String> spinadapter3 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item,optUnitsTemp);
        ArrayAdapter<String> spinadapter4 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item,optUnitsWeight);
        selectspin.setAdapter(spinadapter1);


        //listeners to trigger calculation automatically
        edValue.addTextChangedListener(new TextWatcher() {
            @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override public void onTextChanged(CharSequence s, int start, int before, int count) { calculateResult(); }
            @Override public void afterTextChanged(Editable s) {}
        });

        opt1spin.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override public void onItemSelected(AdapterView<?> parent, View view, int position, long id) { calculateResult(); }
            @Override public void onNothingSelected(AdapterView<?> parent) {}
        });

        opt2spin.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override public void onItemSelected(AdapterView<?> parent, View view, int position, long id) { calculateResult(); }
            @Override public void onNothingSelected(AdapterView<?> parent) {}
        });



        selectspin.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String selected = selectUnits[position];
                if(selected.equals(selectUnits[0])){

                    opt1spin.setAdapter(spinadapter3);
                    opt2spin.setAdapter(spinadapter3);

                }else if(selected.equals(selectUnits[1])){
                    opt1spin.setAdapter(spinadapter2);
                    opt2spin.setAdapter(spinadapter2);
                }else if(selected.equals(selectUnits[2])){
                    opt1spin.setAdapter(spinadapter4);
                    opt2spin.setAdapter(spinadapter4);
                }




            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        edValue.addTextChangedListener(new TextWatcher() {
            @Override
            public void afterTextChanged(Editable s) {

            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                //update the results whenever text changes
                calculateResult();

            }
        });



    }

    //convert temperature
    private double convertTemperature(double value, String from, String to) {
        if(from.equals(to)) return value;

        switch(from) {
            case "Celcius":
                if(to.equals("Fahrenheit")) return (value * 9/5) + 32;
                if(to.equals("Kelvin")) return value + 273.15;
                break;
            case "Fahrenheit":
                if(to.equals("Celcius")) return (value - 32) * 5/9;
                if(to.equals("Kelvin")) return (value - 32) * 5/9 + 273.15;
                break;
            case "Kelvin":
                if(to.equals("Celcius")) return value - 273.15;
                if(to.equals("Fahrenheit")) return (value - 273.15) * 9/5 + 32;
                break;
        }
        return 0;
    }

    //calculate length
    private double convertLength(double value, String from, String to){
        if(from.equals(to)) return value;

        switch(from) {
            case "Meters":
                if(to.equals(("Centimeters"))) return value * 100;
                if (to.equals("Kilometers")) return value / 1000;
                break;
            case "Centimeters":
                if(to.equals("Meters")) return value / 100;
                if(to.equals("Kilometers"))  return value / 100000;
                break;
            case "Kilometers":
                if(to.equals("Meters")) return value * 1000;
                if(to.equals("Centimeters")) return value * 100000;
                break;

        }

        return 0;
    }


    //calculate weight
    private double convertWeight(double value, String from, String to){
        if(from.equals(to)) return value;

        switch (from){
            case "Kilograms":
                if(to.equals("Grams")) return value * 1000;
                if(to.equals("pounds")) return value * 2.20462;
                break;
            case "Grams":
                if(to.equals("Kilograms")) return  value / 1000;
                if(to.equals("Pounds")) return value / 453.592;
                break;
            case "pounds":
                if(to.equals("Kilograms")) return  value / 2.20462;
                if(to.equals("Grams")) return value * 453.592;
                break;
        }


        return 0;
    }

    //calculating result
    private void calculateResult() {
        String valueStr = edValue.getText().toString();
        if(valueStr.isEmpty()) {
            tvresult.setText("");
            return;
        }

        double value = Double.parseDouble(valueStr);
        String type = selectspin.getSelectedItem().toString();
        String unitFrom = opt1spin.getSelectedItem().toString();
        String unitTo = opt2spin.getSelectedItem().toString();

        double result = 0;

        switch(type) {
            case "Temperature":
                result = convertTemperature(value, unitFrom, unitTo);
                break;
            case "Length":
                result = convertLength(value, unitFrom, unitTo);
                break;
            case "weight":
                result = convertWeight(value, unitFrom, unitTo);
                break;
        }

        tvresult.setText("Results : " + String.valueOf(result));
    }
}