import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { PrimaryColors } from "../../styles/primary";
import userIcon from "../../assets/images/user-icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";

const DashboardHeading = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { setToken, authData } = useContext(AuthContext);
  const navigation = useNavigation();

  const closeDropdown = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove token from AsyncStorage
      setToken(null); // Clear token in AuthContext
      navigation.navigate("(tabs)"); // Redirect to login screen
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Dashboard</Text>

          <View>
            <Pressable onPress={() => setDropdownVisible(!isDropdownVisible)}>
              <View style={styles.iconWrapper}>
                <Image source={userIcon} style={styles.userIcon} />
              </View>
            </Pressable>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <View style={styles.dropdown}>
                <Pressable
                  onPress={() => alert("Profile Clicked")}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    pressed && styles.dropdownItemPressed,
                  ]}
                >
                  <Text style={styles.dropdownText}>Profile</Text>
                </Pressable>
                <Pressable
                  onPress={() => alert("Settings Clicked")}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    pressed && styles.dropdownItemPressed,
                  ]}
                >
                  <Text style={styles.dropdownText}>Settings</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    alert("Logout Clicked");
                    handleLogOut();
                  }}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    pressed && styles.dropdownItemPressed,
                  ]}
                >
                  <Text style={styles.dropdownText}>Logout</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome {authData?.user?.name || "User"},
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DashboardHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PrimaryColors.backgroundColor,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: PrimaryColors.textColor,
  },
  iconWrapper: {
    borderWidth: 1,
    borderRadius: "50%",
    padding: 5,
    borderColor: PrimaryColors.primary,
    backgroundColor: "#fff",
  },
  userIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 50,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownItemPressed: {
    backgroundColor: "#f0f0f0", // Light gray background when pressed
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  welcomeContainer: { backgroundColor: "yellow" },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: PrimaryColors.textColor,
    paddingHorizontal: 10,
  },
});
