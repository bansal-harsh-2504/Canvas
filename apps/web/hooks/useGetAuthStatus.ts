import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/useStore";
import { useRouter } from "next/navigation";

const useGetAuthStatus = () => {
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user?.token) {
      logout();
      router.push("/login");
      setLoading(false);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-token`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status !== 200) {
          logout();
        }
      } catch (err) {
        logout();
        setError("Failed to verify token.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [user]);

  return {
    loading,
    error,
  };
};

export default useGetAuthStatus;
