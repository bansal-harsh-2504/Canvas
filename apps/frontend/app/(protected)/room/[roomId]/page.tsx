import { RoomCanvas } from "@/components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: {
    roomId: string;
  };
  }) {
  console.log("CanvasPage");
  const roomId = (await params).roomId;

  return <RoomCanvas slug={roomId} />;
}
