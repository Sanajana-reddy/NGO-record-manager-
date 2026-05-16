import { Avatar, Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    return null;
  }
};

const WorkerNavbar = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        background: "white",
      }}
    >
      <Text fw={700} size="xl">
        NGO Record Manager
      </Text>

      <Group>
        <Avatar src={user?.profilePicture} alt={user?.name || "Worker user"} radius="xl" />

        <div>
          <Text fw={600}>{user?.name || "Worker"}</Text>
          <Text size="sm">{user?.email || ""}</Text>
        </div>

        <Button color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </div>
  );
};

export default WorkerNavbar;
