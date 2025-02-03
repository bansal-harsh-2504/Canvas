import { ChatRoomClient } from "@/components/ChatRoomClient";

export default async function ({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  return (
    <>
      <div>
        <ChatRoomClient slug={slug} />
      </div>
    </>
  );
}
