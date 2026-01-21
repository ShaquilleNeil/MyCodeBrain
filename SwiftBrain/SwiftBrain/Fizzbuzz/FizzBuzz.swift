//
//  FizzBuzz.swift
//  SwiftBrain
//
//  Created by Shaquille O Neil on 2026-01-20.
//

import SwiftUI

struct FizzBuzz: View {
    
    @State private var input: String = ""
   @State private var output: String = ""
    
    var body: some View {
        VStack{
            TextField("Enter a number", text: $input)
                .keyboardType(.numberPad)
                .padding(.horizontal)
                .background(
                    RoundedRectangle(cornerRadius: 15)
                        .fill(Color(.secondarySystemBackground))
                        .frame(width: 350, height: 50)
                )
                .onChange(of: input){
                    value in
                    output = fizzbuzz(num: value)
                }
                
            Spacer()
                .frame(height: 50)
            Text(output)
            Spacer()
                .frame(height: 50)
            Button("CHECK"){
                output = fizzbuzz(num: input)
            }
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(style: StrokeStyle(lineWidth: 2))
                    .frame(width: 100, height: 50)
                    
            )
            .foregroundColor(.blue)
            .padding(.horizontal)
            
        }.padding()
        
       
        
    }
    
    func fizzbuzz (num: String) -> String{
        let result = Int(num) ?? 0
      
        
         return result % 3 == 0 && result % 5 == 0 ? "FizzBuzz" : result.isMultiple(of: 3) ? "Fizz" : result.isMultiple(of: 5) ? "Buzz" : "\(result)"
    }
}

#Preview {
    FizzBuzz()
}
