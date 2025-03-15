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

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isRegister: true,
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

    const url = state.isRegister ? registerUserUrl : loginUserUrl;

    const formData = {
      name: state.isRegister ? state.name : undefined,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data is : ", responseData);

      if (response.ok) {
        await AsyncStorage.setItem("token", responseData.token);
        await AsyncStorage.setItem("user", JSON.stringify(responseData.user));
        alert(
          state.isRegister
            ? "Registered Successfully!"
            : "Logged in Successfully!"
        );

        console.log("Response Data Is : ", responseData);
        navigation.navigate("dashboard");
        setToken(responseData.token);
        setAuth(responseData.token, responseData.user);
      } else {
        alert(responseData.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error occurred while loggin in : ", error.message);
      alert("Network error! Please try again.");
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {state.isRegister ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch({ type: "TOGGLE_AUTH" })}>
          <Text style={styles.toggleText}>
            {state.isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreenForm;

const styles = StyleSheet.create({
  container: { alignItems: "center", height: "100%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  buttonText: { color: "white", fontSize: 16 },
  toggleText: { color: "#007BFF", marginTop: 10 },
  errorText: { color: "red", fontSize: 12, alignSelf: "flex-start" },
  inputFocused: { borderColor: "#007BFF", borderWidth: 2 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
});
