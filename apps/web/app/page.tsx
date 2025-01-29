"use client";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create, Collaborate, and Share
          </h2>
          <p className="text-gray-600 text-lg">
            Work together on a virtual canvas in real-time. Draw, design, and
            brainstorm with your team seamlessly.
          </p>
        </section>

        <section className="text-center">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-green-600">
            Start a Drawing Session
          </button>
        </section>
      </main>
    </div>
  );
}
