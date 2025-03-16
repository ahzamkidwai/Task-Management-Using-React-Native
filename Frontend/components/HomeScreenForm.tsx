import { loginUserUrl, registerUserUrl } from "@/constants/api";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import { PrimaryColors } from "../constants/colors";
import { Eye, EyeOff } from "lucide-react";
const { height } = Dimensions.get("window");

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isRegister: false,
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_AUTH":
      return { ...initialState, isRegister: !state.isRegister };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

const HomeScreenForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // Track focused field
  const navigation = useNavigation();
  const { setAuth, setToken } = useContext(AuthContext);

  const validate = () => {
    let newErrors = {};
    if (state.isRegister && !state.name) newErrors.name = "Name is required";
    if (!state.email) newErrors.email = "Email is required";
    if (!state.password) newErrors.password = "Password is required";
    else if (state.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (state.isRegister && state.password !== state.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const url = state.isRegister ? registerUserUrl : loginUserUrl;
    let formData = {};
    if (state.isRegister) {
      formData = {
        name: state.isRegister ? state.name : undefined,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
      };
    } else {
      formData = {
        email: state.email,
        password: state.password,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data is:", responseData);

      if (response.ok) {
        if (!state.isRegister) {
          await AsyncStorage.setItem("token", responseData.token);
          await AsyncStorage.setItem("user", JSON.stringify(responseData.user));
        }
        // alert(
        //   state.isRegister
        //     ? "Registered Successfully!"
        //     : "Logged in Successfully!"
        // );
        if (!state.isRegister) {
          setToken(responseData.token);
          setAuth(responseData.token, responseData.user);
          navigation.navigate("dashboard");
        } else {
          dispatch({ type: "TOGGLE_AUTH" });
        }
      } else {
        alert(responseData.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error occurred:", error.message);
      alert("Network error! Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Management System</Text>

      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {state.isRegister ? "Register" : "Login"}
        </Text>

        {state.isRegister && (
          <>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "name" && styles.inputFocused,
              ]}
              placeholder="Enter your name"
              placeholderTextColor="white"
              value={state.name}
              onChangeText={(text) =>
                dispatch({ type: "SET_FIELD", field: "name", value: text })
              }
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
            {state.errors.name && (
              <Text style={styles.errorText}>{state.errors.name}</Text>
            )}
          </>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === "email" && styles.inputFocused,
          ]}
          placeholder="Enter your email"
          placeholderTextColor="white"
          keyboardType="email-address"
          value={state.email}
          onChangeText={(text) =>
            dispatch({ type: "SET_FIELD", field: "email", value: text })
          }
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
        {state.errors.email && (
          <Text style={styles.errorText}>{state.errors.email}</Text>
        )}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === "password" && styles.inputFocused,
          ]}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry
          value={state.password}
          onChangeText={(text) =>
            dispatch({ type: "SET_FIELD", field: "password", value: text })
          }
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
        {state.errors.password && (
          <Text style={styles.errorText}>{state.errors.password}</Text>
        )}

        {state.isRegister && (
          <>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "confirmPassword" && styles.inputFocused,
              ]}
              placeholder="Re-enter your password"
              secureTextEntry
              placeholderTextColor="white"
              value={state.confirmPassword}
              onChangeText={(text) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "confirmPassword",
                  value: text,
                })
              }
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
            />
            {state.errors.confirmPassword && (
              <Text style={styles.errorText}>
                {state.errors.confirmPassword}
              </Text>
            )}
          </>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={PrimaryColors.backgroundScreenColor}
            />
          ) : (
            <Text style={styles.buttonText}>
              {state.isRegister ? "Register" : "Login"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch({ type: "TOGGLE_AUTH" })}>
          <Text style={styles.toggleText}>
            {state.isRegister ? (
              <>
                Already have an account?{" "}
                <Text style={{ color: PrimaryColors.backgroundColor1 }}>
                  Login
                </Text>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Text style={{ color: PrimaryColors.backgroundColor1 }}>
                  Register
                </Text>
              </>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreenForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height - 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: PrimaryColors.backgroundColor1,
  },
  buttonText: { color: PrimaryColors.backgroundScreenColor, fontSize: 16 },
  toggleText: { color: "white", marginTop: 10 },
  errorText: { color: "red", fontSize: 12, alignSelf: "flex-start" },
  inputFocused: { borderColor: PrimaryColors.backgroundColor1, borderWidth: 2 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: PrimaryColors.backgroundColor1,
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: PrimaryColors.backgroundScreenColor,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: PrimaryColors.backgroundColor1,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 5,
    color: PrimaryColors.textColor2,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: PrimaryColors.inputPlaceholderColor,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "white",
  },
  button: {
    backgroundColor: PrimaryColors.backgroundColor1,
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDisabled: { opacity: 0.7 },
});
