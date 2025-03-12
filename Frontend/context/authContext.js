import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    user: null, // Store user data here
  });
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAuthData = async () => {
      console.log("FetchAuthData is working");
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedToken) {
        navigation.navigate("Login"); // Redirect to login if no token
      }
      setToken(storedToken);
      setAuthData({
        token: storedToken,
        user: storedUser ? JSON.parse(storedUser) : null,
      });
    };

    fetchAuthData();
  }, []);

  const setAuth = async (token, user) => {
    console.log("setAuth is working");
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    setAuthData({ token, user });
  };

  const logout = async () => {
    console.log("Logout is working");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setAuthData({ token: null, user: null });
    navigation.navigate("Login");
  };

  return (
    <AuthContext.Provider
      value={{ authData, token, setAuth, logout, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
