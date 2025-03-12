import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import DashboardHeading from "@/components/UserComponents/DashboardHeading";

const Dashboard: React.FC = () => {
  const { token } = useContext(AuthContext);

  return token && <DashboardHeading />;
};

export default Dashboard;
