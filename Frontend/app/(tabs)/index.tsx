import HomeScreenForm from "@/components/HomeScreenForm";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { View } from "react-native";
import Dashboard from "../dashboard";
import { PrimaryColors } from "@/styles/primary";

export default function HomeScreen() {
  const { token } = useContext(AuthContext);

  return (
    <View
      style={{ flex: 1, backgroundColor: PrimaryColors.backgroundScreenColor }}
    >
      <View style={{ marginVertical: "10%" }}>
        {token ? <Dashboard /> : <HomeScreenForm />}
      </View>
    </View>
  );
}
