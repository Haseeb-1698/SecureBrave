import React, { useEffect, useState } from "react";

const HexViewer = () => {
  const fileNames = [
    "brave_default_sessionstorage.csv_hex.txt",
    "brave_default_bookmark.csv_hex.txt",
    "brave_default_history.csv.hex",
    "brave_default_localstorage.csv_hex.txt",
    "brave_default_prefetch_timestamps.csv_hex.txt",
    "brave_default_prefetch_names.csv_hex.txt",
    "brave_default_password.csv_hex.txt",
    "brave_default_prefetch_details.csv_hex.txt",
    "brave_default_prefetch_details_Timeline.csv_hex.txt",
  ];

  const tabNames = {
    "brave_default_sessionstorage.csv_hex.txt": "Session Storage",
    "brave_default_bookmark.csv_hex.txt": "Bookmarks",
    "brave_default_history.csv.hex": "History",
    "brave_default_localstorage.csv_hex.txt": "Local Storage",
    "brave_default_prefetch_timestamps.csv_hex.txt": "Prefetch Timestamps",
    "brave_default_prefetch_names.csv_hex.txt": "Prefetch Names",
    "brave_default_password.csv_hex.txt": "Passwords",
    "brave_default_prefetch_details.csv_hex.txt": "Prefetch Details",
    "brave_default_prefetch_details_Timeline.csv_hex.txt": "Prefetch Timeline",
  };

  const [hexContent, setHexContent] = useState(""); // Content of the current file
  const [activeFile, setActiveFile] = useState(fileNames[0]); // Active file name
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(""); // Error message

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadHexFile = async (fileName) => {
      setLoading(true); // Start loading
      setError(""); // Clear previous error

      try {
        const response = await fetch(`/data/hex/${fileName}`);
        if (!response.ok) {
          throw new Error(`Error fetching ${fileName}: ${response.statusText}`);
        }
        const text = await response.text();
        if (!text.trim()) {
          throw new Error(`${fileName} is empty or has no valid content.`);
        }
        setHexContent(text); // Set the file content
      } catch (error) {
        console.error(error.message);
        setHexContent(""); // Clear content if there's an error
        setError(`Unable to load ${tabNames[fileName] || "file"}: ${error.message}`); // Display error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadHexFile(activeFile);
  }, [activeFile]); // Reload whenever the active file changes

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* "Go to Top" Button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-5 right-5 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        aria-label="Go to top"
      >
        ↑
      </button>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">
          PrivacyHack Hex Viewer
        </h1>

        {/* Tabs for File Selection */}
        <div className="tabs flex justify-center mb-8 flex-wrap">
          {fileNames.map((fileName) => (
            <button
              key={fileName}
              className={`px-6 py-3 mx-2 my-2 rounded-lg shadow ${
                activeFile === fileName
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition duration-300`}
              onClick={() => setActiveFile(fileName)}
            >
              {tabNames[fileName] || fileName} {/* Fallback to fileName */}
            </button>
          ))}
        </div>

        {/* Hex Content Viewer */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-6">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">{error}</div>
          ) : (
            <div
              className="bg-gray-900 text-green-500 font-mono text-sm p-4 rounded-lg max-h-[70vh] overflow-y-auto border border-gray-700"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {hexContent || "No data available for this file."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HexViewer;
