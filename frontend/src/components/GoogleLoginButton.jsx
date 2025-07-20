import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import API from "../config/Api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const res = await API.post("/user/google-login", { credential });

      const { user, token } = res.data;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login error")}
      />
    </div>
  );
};

export default GoogleLoginButton;
