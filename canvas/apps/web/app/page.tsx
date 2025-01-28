export default function Home(): JSX.Element {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
          <p className="text-sm mt-1">
            Your go-to place for all things awesome!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            About Us
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700">
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
            ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700">
            Have questions? Feel free to reach out to us anytime via email at
            <span className="font-bold text-blue-600">
              {" "}
              support@example.com
            </span>
            .
          </p>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-4 mt-auto w-full">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 Home Page. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
