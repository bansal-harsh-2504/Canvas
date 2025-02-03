"use client";
import React from "react";
import { Ghost, HomeIcon, MoveLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

function App(): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow h-full bg-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative mb-8">
            <Ghost
              className="w-24 h-24 mx-auto text-purple-400 animate-float"
              strokeWidth={1.5}
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-purple-400/20 rounded-full blur-sm animate-pulse" />
          </div>

          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Oops! It seems you've ventured into the void. The page you're
            looking for has vanished into the digital abyss.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium"
            >
              <HomeIcon className="w-5 h-5" />
              Return Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 font-medium border border-gray-700"
            >
              <MoveLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
