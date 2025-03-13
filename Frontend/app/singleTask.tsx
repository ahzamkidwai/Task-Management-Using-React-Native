import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "@/context/authContext";
import { deleteTaskHandler } from "@/utils/handlers";

const SingleTask = ({}) => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const { token, setTasks } = useContext(AuthContext);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No task data available.</Text>
      </View>
    );
  }

  const handleUpdate = () => {
    navigation.navigate("UpdateTask", { item });
  };

  const handleDelete = (itemId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteTaskHandler(itemId, setDeleteLoading, token, setTasks);
          navigation.navigate("(tabs)");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Task Details</Text>

      {/* Task Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.taskTitle}>{item.title}</Title>
          <Paragraph style={styles.taskDescription}>
            {item.description}
          </Paragraph>

          {/* Task Metadata */}
          <View style={styles.metaItem}>
            <MaterialIcons name="date-range" size={18} color="#444" />
            <Text style={styles.metaText}>{item.createdAt || "Unknown"}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleUpdate}
          style={styles.updateButton}
        >
          Update
        </Button>
        <Button
          mode="contained"
          onPress={() => handleDelete(item._id)}
          style={styles.deleteButton}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

export default SingleTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginTop: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    padding: 15,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  taskDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  metaText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#D32F2F",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
