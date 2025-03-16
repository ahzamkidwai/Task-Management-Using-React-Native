import { AuthContext } from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { createTaskUrl } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrimaryColors } from "../constants/colors";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { token, fetchAllTasks } = useContext(AuthContext);
  const [createTaskLoading, setCreateTaskLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    let isValid = true;
    console.log("Token TOken Token : ", token);
    // Title validation
    if (!title.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Description validation
    if (!description.trim()) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else {
      setDescriptionError("");
    }
    let newToken = await AsyncStorage.getItem("token");

    if (!newToken) {
      console.log("Token not found in AsyncStorage.");
      alert("Session expired. Please log in again.");
      // navigation.navigate("LoginScreen"); // Redirect user to login
      return;
    }
    if (!isValid) return; // Stop if there are errors
    if (token === null) console.log("Nahi generate hua token");

    setCreateTaskLoading(true);
    try {
      const response = await fetch(createTaskUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        alert("Failed to create task.");
      }

      const responseData = await response.json();
      console.log("Task Created Successfully:", responseData);

      setTitle("");
      setDescription("");
      setCreateTaskLoading(false);
      fetchAllTasks();
      navigation.goBack();
    } catch (error) {
      console.error("Error occurred while creating Task:", error);
      setCreateTaskLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>Create Task</Text>
      </View>

      {/* Title Input */}
      <TextInput
        style={[styles.input, titleError && styles.inputError]}
        placeholder="Enter Task Title"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (text.trim()) setTitleError("");
        }}
      />
      {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

      {/* Description Input */}
      <TextInput
        style={[
          styles.input,
          styles.descriptionInput,
          descriptionError && styles.inputError,
        ]}
        placeholder="Enter Task Description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          if (text.trim()) setDescriptionError("");
        }}
        multiline
      />
      {descriptionError ? (
        <Text style={styles.errorText}>{descriptionError}</Text>
      ) : null}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        buttonColor={PrimaryColors.textColor2}
        textColor={PrimaryColors.backgroundScreenColor}
        labelStyle={{ fontSize: 16 }}
        style={styles.submitButton}
        disabled={createTaskLoading}
      >
        {createTaskLoading ? <ActivityIndicator color="#fff" /> : "Create Task"}
      </Button>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#2E2E2E",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  input: {
    backgroundColor: "#3C3C3C",
    color: "#fff",
    fontSize: 16,
    padding: 14,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#555",
  },
  inputError: {
    borderColor: "red",
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 8,
    elevation: 3,
  },
});
