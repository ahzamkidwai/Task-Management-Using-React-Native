import { deleteTask } from "@/constants/api";

export const deleteTaskHandler = async (
  itemID,
  setDeleteLoading,
  token,
  setTasks
) => {
  try {
    setDeleteLoading(true);
    const response = await fetch(
      `https://task-management-using-react-native.vercel.app/api/task/deleteTask/${itemID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    console.log(`Task ${itemID} deleted successfully!`);

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== itemID));
    setDeleteLoading(false);
  } catch (error) {
    console.log("Error occurred while deleting:", error.message);
    setDeleteLoading(false);
  }
};
