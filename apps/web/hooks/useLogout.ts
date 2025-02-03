import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useStore";

const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const logoutUser = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      router.push("/");
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  return logoutUser;
};

export default useLogout;
