import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAllTasksUrl } from "@/constants/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    user: null, // Store user data here
  });
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]); // State to store tasks
  const navigation = useNavigation();
  const [reloadTask, setReloadTask] = useState(false);

  useEffect(() => {
    const fetchAuthData = async () => {
      console.log("FetchAuthData is working");
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedToken) {
        navigation.navigate("(tabs)"); // Redirect to login if no token
      }
      setToken(storedToken);
      setAuthData({
        token: storedToken,
        user: storedUser ? JSON.parse(storedUser) : null,
      });
    };

    fetchAuthData();
  }, []);

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!token) return;

      try {
        const response = await fetch(getAllTasksUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (responseData.tasks) {
          setTasks(responseData.tasks); // Store tasks in state
          // console.log("ALL TASKS : ", tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAllTasks();
  }, [token, reloadTask]);

  const setAuth = async (token, user) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    setAuthData({ token, user });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setAuthData({ token: null, user: null });
    navigation.navigate("(tabs)");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        token,
        setAuth,
        logout,
        setToken,
        tasks,
        setTasks,
        reloadTask,
        setReloadTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
