//
//  Counter.swift
//  SwiftBrain
//
//  Created by Shaquille O Neil on 2026-01-16.
//

import SwiftUI

struct Counter: View {
    @State private var counter = 0

    var body: some View {
        VStack{
            
            if(counter == 10 || counter == 20) {
                Image(systemName: "balloon.2.fill")
                    .symbolEffect(.bounce, options: .repeat(3))
            }
            
            
            Spacer()
                .frame(height: 50)
            Button("+5"){
                plus5()
            }.disabled(counter >= 50)
            
            HStack(spacing: 24) {
                Button("-") {
                   decrement()
                    
                }

                Text("\(counter)")
                    .font(.title)
                    .frame(minWidth: 40)
                    .foregroundStyle(isEven(num: counter) ? .purple : .black)
                    .scaleEffect(!isEven(num: counter) ? 1.5 : 1)

                Button("+") {
                  
                        increment()
                    
                }.disabled(counter >= 50)
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(Color.white)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 15)
                    .stroke(style: StrokeStyle(lineWidth: 1, dash: [2]))
            )
            .padding(.horizontal)
            
            Button {
                reset()
            } label: {
                Text("Reset")
            }
            
        }
        
    }
    
    func increment() {
        counter = min(50, counter + 1)
        
    }
    
    func plus5() {
        counter = min(50, counter + 5)
    }
    
    func decrement() {
        counter = max(0 , counter - 1)
    }
    
    func reset() {
        counter = 0
    }
    
    func isEven(num: Int) -> Bool{
        if(num % 2 == 0){
           return true
        }
        else {
            return false
        }
    }
    
    
}



#Preview {
    Counter()
}
