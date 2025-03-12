import { StyleSheet, Text, View } from "react-native";
import { PrimaryColors } from "../../styles/primary";

const DashboardHeading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
    </View>
  );
};

export default DashboardHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PrimaryColors.backgroundColor,
  },
  title: {
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    fontSize: 32,
    fontWeight: "bold",
    color: PrimaryColors.textColor,
  },
});
