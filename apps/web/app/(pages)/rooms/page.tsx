"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomPage(): JSX.Element {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      // API call

      router.push(`/room/${roomName}`);
    } else {
      alert("Please enter a unique room name.");
    }
  };

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      // API call

      router.push(`/room/${roomName}`);
    } else {
      alert("Please enter a valid room name.");
    }
  };

  return (
    <div className="min-h-[90.7vh] bg-gray-900 text-white  items-center justify-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-4xl font-semibold text-left text-white">
          Room Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Create or join rooms to get started
        </p>

        <div className="mt-8 flex gap-8">
          <div className="flex-1 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Join a Room
            </h2>
            <input
              type="text"
              placeholder="Enter room name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              onClick={handleJoinRoom}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Join Room
            </button>
          </div>

          <div className="flex-1 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Create a Room
            </h2>
            <input
              type="text"
              placeholder="Enter room name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button
              onClick={handleCreateRoom}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
