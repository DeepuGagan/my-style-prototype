# MyStyle-InStyle Prototype

<p align="center">
  <img src="https://img.shields.io/badge/Status-Prototype-yellow" alt="Status: Prototype">
  <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Android%20%7C%20iOS-blue" alt="Platform: Web | Android | iOS">
  <img src="https://img.shields.io/badge/Framework-Ionic-3880FF" alt="Framework: Ionic">
  <img src="https://img.shields.io/badge/Powered%20By-OpenAI-412991" alt="Powered By: OpenAI">
</p>

## 🌟 Overview

This repository contains a prototype of the MyStyle-InStyle application, developed during an innovation/hackathon project. The application demonstrates an AI-powered fashion assistant that provides personalized style recommendations and insights.

**Note:** This is a prototype with some features and functionalities still under development. The current version showcases the core concept and user experience while certain minor features are yet to be fully implemented.

## ✨ Key Features

- **AI-Powered Style Recommendations**: Leverages OpenAI's models to provide personalized style advice
- **Visual Recognition**: Analyzes uploaded images to identify fashion items
- **Interactive Chat Interface**: Engage in natural conversations about style and fashion
- **Multi-platform Support**: Runs on web browsers, Android, and iOS devices

## 🔍 Technical Details

- **AI Integration**: Most features are powered by OpenAI's models through API integration
- **Data Limitations**: Currently using mocked data with location-specific content for Paris only
- **API Usage**: Requires an OpenAI API key (limited functionality without a valid key)

## 🚀 Getting Started

### Web Application

```bash
# If you previously installed ionic
npm uninstall -g ionic

# Install latest Ionic CLI
npm install -g @ionic/cli@latest 

# Install dependencies
npm install

# Start development server
ionic serve
```

### Android Application

1. Set up Android Studio following the [Ionic documentation](https://ionicframework.com/docs/developing/android#running-with-capacitor)
2. Run the following commands:
   ```bash
   ionic capacitor add android
   ionic capacitor build android
   ```

### iOS Application

1. Make sure you have Xcode installed
2. Run the following commands:
   ```bash
   ionic capacitor add ios
   ionic capacitor build ios
   ```

## 🌐 Environment Setup

Create a `.env` file in the root directory with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

## 📝 Notes

- This project was developed as part of an innovation/hackathon initiative
- The application is in prototype stage and continues to evolve
- Some features may have limited functionality due to API constraints

## 📱 Screenshots

*Screenshots will be added soon*

## 🔄 Future Enhancements

- Expand location data beyond Paris
- Implement real-time fashion recommendations
- Enhance visual recognition capabilities
- Add personalized user profiles and preferences

## 📄 License

Internal use only. All rights reserved.
