import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Temporary Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">
          Browear
        </h1>

        <p className="text-gray-600 text-lg">
          Premium Men's Fashion
        </p>

        <div className="h-[2000px]" />
      </div>
    </div>
  );
}

export default App;