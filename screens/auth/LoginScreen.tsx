import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { OnboardingBackground } from "../../components/OnboardingBackground";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export interface LoginScreenProps {
  onLogin?: (credentials: { userId: string; password: string }) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onBiometricPress?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  onBiometricPress,
}) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin?.({ userId, password });
  };

  return (
    <OnboardingBackground circlePosition="top-right" containerStyle={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Login to Your Account</Text>
            </View>

            {/* Inputs Section */}
            <View style={styles.formContainer}>
              <Input
                placeholder="User Id"
                value={userId}
                onChangeText={setUserId}
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isPassword
                containerStyle={styles.inputSpacing}
              />

              {/* Login Button */}
              <Button
                title="Login"
                variant="primary"
                size="lg"
                onPress={handleLogin}
                style={styles.loginButton}
                textStyle={styles.loginButtonText}
              />

              {/* Forget Password Link */}
              <TouchableOpacity
                onPress={onForgotPassword}
                activeOpacity={0.7}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>
                  Forget User / Password ?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Biometric Section */}
            <View style={styles.biometricContainer}>
              <TouchableOpacity
                onPress={onBiometricPress}
                activeOpacity={0.6}
                style={styles.biometricButton}
              >
                <Ionicons
                  name="finger-print-outline"
                  size={52}
                  color="#5F7083"
                />
              </TouchableOpacity>
            </View>

            {/* Bottom Sign Up Link */}
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
                <Text style={styles.footerText}>
                  Don’t have an account?{" "}
                  <Text style={styles.signUpHighlight}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </OnboardingBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2935",
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  headerContainer: {
    marginBottom: 36,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputSpacing: {
    marginBottom: 18,
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 14,
    paddingVertical: 18,
    backgroundColor: "#4366F6",
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  forgotPasswordButton: {
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  forgotPasswordText: {
    fontSize: 15,
    color: "#8E9CAE",
    fontWeight: "400",
  },
  biometricContainer: {
    marginTop: 44,
    marginBottom: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  biometricButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
  footerText: {
    fontSize: 15,
    color: "#8E9CAE",
    fontWeight: "400",
  },
  signUpHighlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
