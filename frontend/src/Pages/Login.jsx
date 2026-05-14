import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//const navigate = useNavigate();
const Login = () => {
    const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );

      // save jwt token
      localStorage.setItem("token", res.data.token);

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

      console.log(res.data);

    } catch (error) {

      console.log("Login request error:", error.response?.status, error.response?.data || error.message);

    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;