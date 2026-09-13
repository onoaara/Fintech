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
import { Checkbox } from "../../components/ui/checkbox";

export interface SignUpFormData {
  name: string;
  email: string;
  mobileNumber: string;
  cnic: string;
  password: string;
  agreedToTerms: boolean;
}

export interface SignUpScreenProps {
  onSignUp?: (data: SignUpFormData) => void;
  onBiometricPress?: () => void;
  onTermsPress?: () => void;
  onLoginPress?: () => void;
  buttonTitle?: string;
  footerPrompt?: string;
  footerActionText?: string;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onBiometricPress,
  onTermsPress,
  onLoginPress,
  buttonTitle = "Login",
  footerPrompt = "Don’t have an account?",
  footerActionText = "Sign Up",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const handleSignUp = () => {
    onSignUp?.({
      name,
      email,
      mobileNumber,
      cnic,
      password,
      agreedToTerms,
    });
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
            {/* Title Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Your Account</Text>
            </View>

            {/* Inputs Section */}
            <View style={styles.formContainer}>
              <Input
                placeholder="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                containerStyle={styles.inputSpacing}
              />

              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <Input
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                containerStyle={styles.inputSpacing}
              />

              <Input
                placeholder="CNIC"
                value={cnic}
                onChangeText={setCnic}
                containerStyle={styles.inputSpacing}
              />

              {/* Password & Biometric Row */}
              <View style={styles.passwordRow}>
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                  containerStyle={styles.passwordInputContainer}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onBiometricPress}
                  style={styles.biometricButton}
                >
                  <Ionicons
                    name="finger-print-outline"
                    size={34}
                    color="#5F7083"
                  />
                </TouchableOpacity>
              </View>

              {/* Terms and Conditions Checkbox */}
              <View style={styles.termsContainer}>
                <Checkbox
                  checked={agreedToTerms}
                  onChange={setAgreedToTerms}
                  label={
                    <Text style={styles.termsText}>
                      I agree with{" "}
                      <Text
                        style={styles.termsLink}
                        onPress={onTermsPress}
                      >
                        Terms & Conditions
                      </Text>
                    </Text>
                  }
                />
              </View>

              {/* Action Button */}
              <Button
                title={buttonTitle}
                variant="primary"
                size="lg"
                onPress={handleSignUp}
                style={styles.submitButton}
                textStyle={styles.submitButtonText}
              />
            </View>

            {/* Footer Row */}
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7}>
                <Text style={styles.footerText}>
                  {footerPrompt}{" "}
                  <Text style={styles.footerHighlight}>{footerActionText}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </OnboardingBackground>
  );
};

export default SignUpScreen;

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
    marginBottom: 32,
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
    marginBottom: 16,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  passwordInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  biometricButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
    paddingLeft: 2,
  },
  termsText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  termsLink: {
    color: "#4366F6",
    fontWeight: "500",
  },
  submitButton: {
    borderRadius: 14,
    paddingVertical: 18,
    backgroundColor: "#4366F6",
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  footerContainer: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
  footerText: {
    fontSize: 15,
    color: "#8E9CAE",
    fontWeight: "400",
  },
  footerHighlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
