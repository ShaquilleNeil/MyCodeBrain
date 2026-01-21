package com.example.androidbrain;

import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.Scanner;

public class Classprinting{
    public static void main(String[] args) {

        PrintWriter pw = null;

       String s;
       Scanner sc = new Scanner(System.in);


       try{
           pw = new PrintWriter(new FileOutputStream("output.txt", true));

       } catch(Exception e){
           System.out.println("Error");


       }
       System.out.println("Please give me a string");
       s = sc.nextLine();

        assert pw != null;
        pw.println(s);

        System.out.println("Please give me another String");
        s = sc.nextLine();

        pw.println(s);

       pw.close();








    }
}
