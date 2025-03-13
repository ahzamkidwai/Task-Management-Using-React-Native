import { StyleSheet, Text, View } from "react-native";

const EmptyTaskComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No tasks available</Text>
    </View>
  );
};

export default EmptyTaskComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
});
