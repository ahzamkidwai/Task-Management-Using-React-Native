import { useContext, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { AuthContext } from "@/context/authContext";
import DashboardHeading from "@/components/UserComponents/DashboardHeading";
import DashboardContent from "@/components/UserComponents/DashboardContent";
import { PrimaryColors } from "../constants/colors";

const Dashboard = () => {
  const { token, tasks, fetchAllTasks } = useContext(AuthContext); // Ensure `fetchTasks` exists in AuthContext
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllTasks();
    setRefreshing(false);
  };

  return (
    token && (
      <ScrollView
        style={{ backgroundColor: PrimaryColors.backgroundColor }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <DashboardHeading />
        <DashboardContent tasks={tasks} />
      </ScrollView>
    )
  );
};

export default Dashboard;
