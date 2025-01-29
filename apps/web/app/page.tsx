"use client";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Collaborative Drawing Board</h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="bg-blue-700 px-4 py-2 rounded shadow hover:bg-blue-800"
            >
              Signup
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 Collaborative Drawing Board. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
