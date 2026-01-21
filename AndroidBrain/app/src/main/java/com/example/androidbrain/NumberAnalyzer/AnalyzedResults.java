package com.example.androidbrain.NumberAnalyzer;

public class AnalyzedResults {
    String parity;
    String sign;
    String divisibility;

    public AnalyzedResults(){

}


public AnalyzedResults(String parity, String sign, String divisibility){
    this.parity = parity;
    this.sign = sign;
    this.divisibility = divisibility;

}

public String getParity(){
    return parity;
}

public String getSign(){
    return sign;
}

public String getDivisibility(){
    return divisibility;
}

public void setParity(String parity){
    this.parity = parity;
}

public void setSign(String sign){
    this.sign = sign;
}

public void setDivisibility(String divisibility){
    this.divisibility = divisibility;
}
}
