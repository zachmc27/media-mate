import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking authentication...");
    const token = localStorage.getItem("id_token");

    if (!token) {
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, []);
};

export default useAuthRedirect;