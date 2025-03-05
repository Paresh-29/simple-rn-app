import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import PostImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/notes");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007bff " />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={PostImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Our Notes App</Text>
      <Text style={styles.subtitle}>Add your notes anytime</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/notes");
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default HomeScreen;
