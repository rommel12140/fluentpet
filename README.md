PetSpeak – FluentPet-Style Demo App
A cross-platform mobile demo built in 2 days to showcase expertise in React Native, Expo, and TypeScript. PetSpeak replicates the core user journeys of the FluentPet app—device pairing, pet profiles, sound feedback, and activity history—so you can quickly evaluate my ability to architect, implement, and ship production-ready mobile features.

🔥 Key Features
Authentication
Email/password login with client-side validation and a “Preparing Pets…” loading screen.

Pet Profile
View and edit your pet’s name, age, and avatar (with expo-image-picker).

Button Pairing
Two-step mock BLE/Wi-Fi provisioning flow:

Confirm SSID & “Connect Base”

“Pair Button” tap → toast confirmation

Button Grid
Create, update, and delete custom buttons with label, color picker, and sound-preview toggle.

Realtime Feedback
Logs each button press, plays TTS via expo-speech, and displays a Recent Activity card.

History
Full activity log with clear / reset functionality.

State Management
Redux Toolkit + redux-persist for type-safe, persistent global state.

Animations & UI Polish
Lottie loading paw animations; modern, rounded design with dynamic theming.

Testing & CI/CD
Jest + React Testing Library unit/integration tests; GitHub Actions pipeline for build → lint → test → Expo preview.

🚀 Tech Stack
Framework: React Native · Expo SDK

Language: TypeScript

State: Redux Toolkit · redux-persist

Animations: lottie-react-native

Audio & TTS: expo-av · expo-speech

Networking Mock: Stubs for BLE (react-native-ble-plx) & MQTT/WebSocket

Testing: Jest · React Testing Library

CI: GitHub Actions

Code Quality: ESLint · Prettier
