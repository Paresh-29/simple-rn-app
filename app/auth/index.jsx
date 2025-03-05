import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const AuthScreen = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      // setError("Passwords do not match");
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response?.error) {
      Alert.alert("Error", response.error);
      return;
    }

    router.replace("/notes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? "Sign Up" : "Log in"}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confitm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isRegistering ? "Sign Up" : "Log in"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#ff8c00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    color: "#333",
    marginTop: 20,
    color: "#ff8c00",
  },
  error: {
    color: "red",
    maringBottom: 10,
    fontSize: 16,
  },
});

export default AuthScreen;
