import { AuthContext } from "@/context/authContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { updateTaskUrl } from "@/constants/api";

const UpdateTask = ({}) => {
  const route = useRoute();
  const { item } = route.params;
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { token, setReloadTask, reloadTask } = useContext(AuthContext);
  const [updateTaskLoading, setUpdateTaskLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
    }
  }, [item]);

  const handleSubmit = async () => {
    let isValid = true;

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

    if (!isValid) return; // Stop if there are errors

    setUpdateTaskLoading(true);
    try {
      const response = await fetch(
        `${updateTaskUrl}/${item._id}`, // Updated API endpoint
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (!response.ok) {
        alert("Failed to update task.");
      }

      const responseData = await response.json();
      console.log("Task Updated Successfully:", responseData);
      setUpdateTaskLoading(false);
      setReloadTask(!reloadTask);
      navigation.navigate("(tabs)"); // Navigate back after update
    } catch (error) {
      console.error("Error occurred while updating Task:", error);
      setUpdateTaskLoading(false);
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
        <Text style={styles.heading}>Update Task</Text>
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
        buttonColor="#007AFF"
        textColor="#fff"
        labelStyle={{ fontSize: 16, fontWeight: "bold" }}
        style={styles.submitButton}
        disabled={updateTaskLoading}
      >
        {updateTaskLoading ? <ActivityIndicator color="#fff" /> : "Update Task"}
      </Button>
    </View>
  );
};

export default UpdateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#2E2E2E", // Dark Gray Background
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
    backgroundColor: "#3C3C3C", // Slightly lighter gray for contrast
    color: "#fff",
    fontSize: 16,
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555", // Subtle border for better visibility
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 8,
    elevation: 3,
  },
});
