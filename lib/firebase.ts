import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Check if all required environment variables are present
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingEnvVars.length > 0) {
  console.warn(`Missing Firebase environment variables: ${missingEnvVars.join(", ")}. Using demo configuration.`)
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
}

// Check if we should use emulators
const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true"

// Initialize Firebase only if it hasn't been initialized already
let app: FirebaseApp
let emulatorsConnected = false

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    console.log("Firebase initialized successfully")
  } catch (error) {
    console.error("Error initializing Firebase:", error)

    // Create a mock Firebase app for development/demo purposes
    app = initializeApp(
      {
        apiKey: "demo-api-key",
        authDomain: "demo-project.firebaseapp.com",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef",
      },
      "demo-app",
    )
  }
} else {
  app = getApps()[0]
}

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Function to check if emulators are running
const checkEmulatorsRunning = async (): Promise<boolean> => {
  if (!isBrowser || !useEmulators) return false

  try {
    // Try to connect to the auth emulator
    const response = await fetch("http://localhost:9099", {
      method: "HEAD",
      // Set a short timeout to avoid long waits
      signal: AbortSignal.timeout(2000),
    })
    return response.ok
  } catch (error) {
    console.warn("Firebase emulators check failed:", error)
    return false
  }
}

// Connect to emulators if enabled and in browser environment
if (isBrowser && useEmulators && process.env.NODE_ENV === "development") {
  // First check if emulators are running
  checkEmulatorsRunning().then((running) => {
    if (running) {
      try {
        console.log("🔧 Connecting to Firebase Emulators")

        // Auth Emulator - default port is 9099
        connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })

        // Firestore Emulator - default port is 8080
        connectFirestoreEmulator(db, "localhost", 8080)

        // Storage Emulator - default port is 9199
        connectStorageEmulator(storage, "localhost", 9199)

        emulatorsConnected = true
        console.log("✅ Successfully connected to all Firebase Emulators")
      } catch (error) {
        console.error("❌ Failed to connect to Firebase Emulators:", error)
        emulatorsConnected = false
      }
    } else {
      console.warn("❌ Firebase Emulators are configured but not running")
      emulatorsConnected = false
    }
  })
}

// Simple check to see if emulators are configured
const areEmulatorsConfigured = (): boolean => {
  return useEmulators && process.env.NODE_ENV === "development"
}

export { auth, db, storage, useEmulators, emulatorsConnected, areEmulatorsConfigured }

