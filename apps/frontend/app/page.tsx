import React from "react";
import { Pencil, Share2, Download, Users, Shapes, Palette } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <Shapes className="w-8 h-8" />
              <span className="text-2xl font-bold">Canvas</span>
            </div>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition">
                Sign In
              </button>
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-opacity-90 transition">
                Get Started
              </button>
            </div>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Collaborate and Create Beautiful Diagrams Together
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Canvas is your virtual whiteboard for creating stunning diagrams,
              wireframes, and visual content. Work together in real-time, no
              sign-up required.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium text-lg hover:bg-opacity-90 transition">
              Start Drawing →
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to bring ideas to life
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features that make Canvas the perfect tool for teams,
            designers, and anyone with creative ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Pencil}
            title="Intuitive Drawing"
            description="Simple yet powerful drawing tools that feel natural and responsive."
          />
          <FeatureCard
            icon={Share2}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, see changes instantly."
          />
          <FeatureCard
            icon={Download}
            title="Export Anywhere"
            description="Export your drawings in multiple formats including PNG, SVG, and PDF."
          />
          <FeatureCard
            icon={Users}
            title="Team Workspace"
            description="Organize your projects and collaborate with your team in dedicated spaces."
          />
          <FeatureCard
            icon={Shapes}
            title="Smart Shapes"
            description="Perfect shapes every time with our smart drawing assistance."
          />
          <FeatureCard
            icon={Palette}
            title="Custom Styling"
            description="Personalize your diagrams with custom colors, fonts, and styles."
          />
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
              alt="Canvas Demo"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shapes className="w-6 h-6" />
              <span className="text-xl font-bold">Canvas</span>
            </div>
            <div className="space-x-6">
              <a href="#" className="hover:text-white transition">
                About
              </a>
              <a href="#" className="hover:text-white transition">
                Blog
              </a>
              <a href="#" className="hover:text-white transition">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
