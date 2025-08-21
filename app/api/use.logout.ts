import { toast } from "sonner";
import { useAuth } from "../context/auth-context";

export const useLogout = () => {
  const { setUser, setAuthenticated } = useAuth();

  return () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAuthenticated(false);
    toast.success("Logout successful");
  };
};
