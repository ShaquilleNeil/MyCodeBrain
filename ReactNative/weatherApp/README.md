# 🌤️ Weather App (React Native)

A real-time weather application built with React Native that displays current conditions, forecasts, and dynamic UI updates based on live weather data.

---

## 🚀 Features

- 📍 Location-based weather using device GPS  
- 🔍 City search with validation and error handling  
- 🌦️ Dynamic UI based on weather conditions  
- 🎬 Lottie animations for different weather states  
- ⏳ Loading states for smooth user experience  
- 📊 Additional stats:
  - Temperature (°C)
  - Humidity (%)
  - Wind Speed (km/h)
  - Visibility (km)
- 📅 5-day forecast  

---

## 🛠️ Tech Stack

- React Native (Expo)
- TypeScript
- OpenWeather API
- Lottie React Native
- Expo Location

---

## 🧠 What I Learned

- Working with real-time APIs  
- Handling asynchronous data  
- Managing state and UI updates  
- Implementing error handling and validation  
- Improving user experience with loading states and animations  

---

## 📸 Demo

(Add your video or GIF here)

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install
npx expo start
```

---

## 🔑 Environment Variables

Get an API key from https://openweathermap.org/api and add it to your project:

```ts
const API_KEY = "your_api_key_here";
```

---

## 📂 Project Structure

```
weather-app/
│
├── app/
│   ├── index.tsx
│
├── components/
│   ├── ForecastCard.tsx
│   ├── StatCard.tsx
│
├── assets/
│   ├── animations/
│
└── ...
```

---

## 🧪 Future Improvements

- Toggle between °C / °F  
- Pull-to-refresh  
- Save favorite cities  
- Dark/light theme  
- Performance optimizations  

---

## 📌 Author

Built by Your Name  
React Native Developer 🚀



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
