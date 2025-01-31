import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../store/useStore";
import { useRouter } from "next/navigation";

const useVerifyToken = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
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
              authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.status !== 200) {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isAuthenticated]);

  return {
    loading,
  };
};

export default useVerifyToken;
