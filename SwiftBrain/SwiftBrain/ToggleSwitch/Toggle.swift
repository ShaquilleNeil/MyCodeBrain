//
//  Toggle.swift
//  SwiftBrain
//
//  Created by Shaquille O Neil on 2026-01-16.
//

import SwiftUI

struct Toggles: View {
    @State private var isEnabled: Bool = false
    @State private var action: String = ""
    var body: some View {
        VStack {
            
            Image(systemName: "pencil.tip.crop.circle.fill")
                .resizable()
                .scaledToFit()
                .frame(width: 200, height: 100)
                .symbolEffect(
                    .bounce,
                    options: .repeat(
                        3
                    ),
                    value: isEnabled
                )
               
            
            Spacer()
                .frame(height: 20)
            
            Text(isEnabled ? "Enabled" : "Disabled")
                .scaleEffect(isEnabled ? 1.2 : 1.0)
                .animation(.spring(), value: isEnabled)
                .foregroundStyle(isEnabled ? .blue : .red)
            
            Toggle(isEnabled ? "On" : "Off", isOn: $isEnabled)
            
            Text(isEnabled ? action
                 : "")
            
            Button("Button"){
               action = "Button tapped"
            }.disabled(!isEnabled)
            
        }.padding()
    }
}
#Preview {
    Toggles()
}
