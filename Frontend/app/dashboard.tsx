import React, { useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import DashboardHeading from "@/components/UserComponents/DashboardHeading";

const Dashboard: React.FC = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     if (!token) {
  //       const storedToken = await AsyncStorage.getItem("token");
  //       if (!storedToken) {
  //         navigation.navigate("(tabs)");
  //       }
  //       setToken(storedToken);
  //     }
  //   };

  //   const focusListener = navigation.addListener("focus", fetchToken);
  //   fetchToken();

  //   return () => {
  //     navigation.removeListener("focus", fetchToken);
  //   };
  // }, [navigation, token, setToken]);

  return token && <DashboardHeading />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Dashboard;
