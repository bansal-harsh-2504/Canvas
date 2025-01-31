"use client"
import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";
import useAuthStore from "../store/useStore";
import { useRouter } from "next/navigation";

async function getChats(slug: string) {
  const { user } = useAuthStore();
  const router = useRouter();
  if (!user) {
    router.push('/login');
    return;
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}?token=${user?.token}/chats/${slug}`
  );
  return res.data?.messages.reverse();
}

export default async function ChatRoom({
  slug,
}: {
  slug: string;
}): Promise<JSX.Element> {
  const messages = await getChats(slug);
  return <ChatRoomClient slug={slug} messages={messages} />;
}
