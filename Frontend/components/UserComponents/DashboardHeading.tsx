import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { PrimaryColors } from "../../constants/colors";
import userIcon from "../../assets/images/user-icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";

const DashboardHeading = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { setToken, authData, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const closeDropdown = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      navigation.navigate("home");
      logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={{ backgroundColor: PrimaryColors.backgroundColor }}>
        <View style={styles.container}>
          <Text style={styles.title}>Dashboard</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() => {
                navigation.navigate("userProfile");
              }}
            >
              <Image source={userIcon} style={styles.userIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogOut}>
              <Entypo name="log-out" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome{" "}
            <Text style={styles.userText}>
              {authData?.user?.name || "User"}
              {", "}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DashboardHeading;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: PrimaryColors.textColor2,
  },
  userText: { color: PrimaryColors.textColor2 },
  iconWrapper: {
    borderRadius: "50%",
    padding: 5,
    borderColor: PrimaryColors.primary,
    backgroundColor: "#fff",
  },
  userIcon: { width: 32, height: 32, resizeMode: "contain" },
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
  dropdownItemPressed: { backgroundColor: "#f0f0f0" },
  dropdownText: { fontSize: 16, color: "#333" },
  welcomeContainer: { paddingTop: "5%" },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: PrimaryColors.textColor,
    paddingHorizontal: 10,
  },
});
