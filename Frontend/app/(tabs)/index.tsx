import HomeScreenForm from "@/components/HomeScreenForm";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Dashboard from "../dashboard";
import { PrimaryColors } from "@/styles/primary";

export default function HomeScreen() {
  const { token } = useContext(AuthContext);
  useEffect(() => {
    console.log("Token inside useEffect : ", token);
  }, [token]);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: PrimaryColors.backgroundScreenColor }}
    >
      <View style={{}}>{token ? <Dashboard /> : <HomeScreenForm />}</View>
    </ScrollView>
  );
}
