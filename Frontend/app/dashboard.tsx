import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import DashboardHeading from "@/components/UserComponents/DashboardHeading";
import DashboardContent from "@/components/UserComponents/DashboardContent";

const Dashboard = () => {
  const { token, tasks } = useContext(AuthContext);

  return (
    token && (
      <>
        <DashboardHeading />
        <DashboardContent tasks={tasks} />
      </>
    )
  );
};

export default Dashboard;
