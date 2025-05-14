# PetSpeak – FluentPet-Style FRONT END ONLY Mock-Demo App

A cross-platform mobile proof-of-concept built in **2 days** to showcase expertise in React Native, Expo, and TypeScript. PetSpeak mirrors the core user journeys of the FluentPet app—device pairing, pet profiles, sound feedback, and activity history—so you can quickly evaluate my ability to architect, implement, and ship production-ready mobile features.

---

## 📺 Demo Video

[CLICK HERE to Watch the walkthrough on Google Drive][(https://drive.google.com/drive/folders/1_8ipDoCw9udn45N-2z2WFHG8SwQLPZGQ?usp=drive_link)]

---

## 🔥 Key Features

- **Authentication**  
  – Email/password login with client-side validation  
  – “Preparing Pets…” loading screen (Lottie paw spinner)

- **Pet Profile**  
  – View & edit pet name, age, avatar (using `expo-image-picker`)  

- **Button Pairing**  
  – Two-step mock BLE/Wi-Fi provisioning flow  
    1. Confirm SSID & “Next”  
    2. Tap “Pair Button” → success toast  

- **Custom Buttons**  
  – Create, update, delete buttons with label, color picker, preview-sound toggle  

- **Realtime Feedback**  
  – Logs each button press to Redux + persist  
  – Text-to-Speech feedback via `expo-speech`  
  – “Recent Activity” card on Home  

- **History**  
  – Full activity log with “Clear History”  

- **State Management**  
  – Redux Toolkit + `redux-persist` for type-safe, persistent global state  

- **Animations & UI**  
  – Lottie paw animations for loading & pairing  
  – Modern, rounded design with dynamic contrast  

- **Testing & CI/CD**  
  – Unit & integration tests with Jest & React Testing Library  
  – GitHub Actions pipeline (build → lint → test → Expo preview)

---

## 🚀 Tech Stack

- **Framework:** React Native · Expo SDK  
- **Language:** TypeScript  
- **State:** Redux Toolkit · redux-persist  
- **Animations:** lottie-react-native  
- **Audio & TTS:** expo-av · expo-speech  
- **Networking Mock:** `expo-network` → SSID detection  
- **Testing:** Jest · React Testing Library  
- **CI:** GitHub Actions  
- **Code Quality:** ESLint · Prettier  

---

## 🛠️ Getting Started

### Prerequisites

- Node.js ≥ 16  
- Yarn or npm  
- Expo CLI:  
  ```bash
  npm install -g expo-cli
