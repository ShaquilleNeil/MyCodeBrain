//
//  ContentView.swift
//  SwiftBrain
//
//  Created by Shaquille O Neil on 2026-01-16.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack{
            Form{
                NavigationLink("Counter", destination: Counter())
                NavigationLink("Toggle", destination: Toggles())
            }.navigationTitle("Code Practice Exercises")
        }
    }
}

#Preview {
    ContentView()
}
