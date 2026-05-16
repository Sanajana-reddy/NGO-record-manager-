import { GoogleLogin } from "@react-oauth/google";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Title, Text, Button, Group, Stack, Loader, Center } from "@mantine/core";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect automatically if session exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    try {
      const user = userStr ? JSON.parse(userStr) : null;
      if (token && user) {
        navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard", { replace: true });
      }
    } catch {
      // ignore parse errors
    }
  }, [navigate]);

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);

    try {
      const res = await API.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      // save jwt token
      localStorage.setItem("token", res.data.token);

      // save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log("Login request error:", error.response?.status, error.response?.data || error.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "linear-gradient(135deg, #f5f7ff 0%, #e0f2fe 100%)",
    }}>
      <Container size={720}>
        <Card shadow="lg" radius="md" p="xl">
          <Group position="apart" align="center" mb="md" spacing="xl">
            <Stack spacing={0}>
              <Title order={2}>NGO Record Manager</Title>
              <Text color="dimmed">Smart NGO Field Data Collection Platform</Text>
            </Stack>
          </Group>

          <Stack spacing="lg">
            <Text size="sm" color="dimmed">Sign in with your Google account to continue</Text>

            <Center>
              {loading ? (
                <Button radius="md" size="md" disabled leftIcon={<Loader size="sm" />}>
                  Signing in...
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              )}
            </Center>

           

          </Stack>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
