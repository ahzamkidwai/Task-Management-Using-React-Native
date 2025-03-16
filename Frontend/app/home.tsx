import HomeScreenForm from "@/components/HomeScreenForm";
import { useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Dashboard from "./dashboard";
import { PrimaryColors } from "../constants/colors";
import { AuthContext } from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { token } = useContext(AuthContext);
  const naviagtion = useNavigation();
  useEffect(() => {
    if (token === undefined || token === null || !token)
      naviagtion.navigate("home");
  }, [token]);

  return (
    <ScrollView style={{ backgroundColor: PrimaryColors.backgroundColor }}>
      <View>{token ? <Dashboard /> : <HomeScreenForm />}</View>
    </ScrollView>
  );
};

export default Home;
