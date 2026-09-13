import React, { useState } from "react";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import { LoginScreen, SignUpScreen } from "./screens/auth";
import { DashboardScreen } from "./screens/dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "dashboard" | "signup" | "login" | "onboarding"
  >("dashboard");

  if (currentScreen === "dashboard") {
    return <DashboardScreen />;
  }

  if (currentScreen === "signup") {
    return (
      <SignUpScreen
        onLoginPress={() => setCurrentScreen("login")}
        onSignUp={(data) => {
          console.log("Account created:", data);
          setCurrentScreen("dashboard");
        }}
      />
    );
  }

  if (currentScreen === "login") {
    return (
      <LoginScreen
        onSignUp={() => setCurrentScreen("signup")}
        onLogin={(credentials) => {
          console.log("Logged in with:", credentials);
          setCurrentScreen("dashboard");
        }}
      />
    );
  }

  return <OnboardingScreen onFinish={() => setCurrentScreen("login")} />;
}
