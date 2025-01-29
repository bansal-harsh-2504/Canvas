import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(slug: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${slug}`
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
