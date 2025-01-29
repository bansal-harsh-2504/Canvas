import axios, { AxiosError } from "axios";

export const authFetch = async (url: string) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      console.error("Unexpected error", error);
    }

    throw error;
  }
};
