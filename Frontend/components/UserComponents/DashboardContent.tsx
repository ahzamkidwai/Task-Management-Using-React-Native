import { StyleSheet, View } from "react-native";
import TaskComponent from "./TaskComponent";
import EmptyTaskComponent from "./EmptyTaskComponent";

const DashboardContent = ({ tasks }) => {
  return (
    <View>
      {tasks.length > 0 ? (
        <TaskComponent tasks={tasks} />
      ) : (
        <EmptyTaskComponent />
      )}
    </View>
  );
};

export default DashboardContent;
