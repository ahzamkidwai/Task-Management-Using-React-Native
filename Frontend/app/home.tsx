import HomeScreenForm from "@/components/HomeScreenForm";
import { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Dashboard from "./dashboard";
import { PrimaryColors } from "../constants/colors";
import { AuthContext } from "@/context/authContext";

const Home = () => {
  const { token } = useContext(AuthContext);
  useEffect(() => {
    console.log("Token inside useEffect : ", token);
  }, [token]);

  return (
    <ScrollView style={{ backgroundColor: PrimaryColors.backgroundColor }}>
      <View>{token ? <Dashboard /> : <HomeScreenForm />}</View>
    </ScrollView>
  );
};

export default Home;
