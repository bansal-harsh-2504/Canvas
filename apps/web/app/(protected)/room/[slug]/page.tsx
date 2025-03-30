import { ChatRoomClient } from "@/components/ChatRoomClient";
export default async function ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <div>
        <ChatRoomClient slug={slug} />
      </div>
    </>
  );
}
