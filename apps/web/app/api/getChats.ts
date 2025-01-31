import axios from "axios";

export async function getChats(slug: string, token: string) {
  if (!token) return null;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${slug}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data?.messages?.reverse();
}
