import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import DashboardHeading from "@/components/UserComponents/DashboardHeading";
import { getAllTasksUrl } from "../constants/api";
import DashboardContent from "@/components/UserComponents/DashboardContent";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!token) return; // Avoid making the request if token is missing

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
  }, [token]); // Run effect when token changes

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
