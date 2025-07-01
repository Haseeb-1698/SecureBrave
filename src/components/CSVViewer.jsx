import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Link } from "react-router-dom";

const CSVViewer = () => {
  const fileNames = [
    "brave_default_bookmark.csv",
    "brave_default_history.csv",
    "brave_default_localstorage.csv",
    "brave_default_password.csv",
    "brave_default_prefetch_details_Timeline.csv",
    "brave_default_prefetch_details.csv",
    "brave_default_prefetch_names.csv",
    "brave_default_prefetch_timestamps.csv",
    "brave_default_sessionstorage.csv",
  ];

  const tabNames = {
    "brave_default_bookmark.csv": "Bookmarks",
    "brave_default_history.csv": "History",
    "brave_default_localstorage.csv": "Local Storage",
    "brave_default_password.csv": "Passwords",
    "brave_default_prefetch_details_Timeline.csv": "Prefetch Timeline",
    "brave_default_prefetch_details.csv": "Prefetch Details",
    "brave_default_prefetch_names.csv": "Prefetch Names",
    "brave_default_prefetch_timestamps.csv": "Prefetch Timestamps",
    "brave_default_sessionstorage.csv": "Session Storage",
  };

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeFile, setActiveFile] = useState(fileNames[0]);
  const [search, setSearch] = useState("");

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadCSVFile = async (fileName) => {
      try {
        const response = await fetch(`/data/${fileName}`);
        if (!response.ok) {
          console.error(`Error fetching ${fileName}:`, response.statusText);
          return;
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setColumns(Object.keys(result.data[0] || {}));
            setData(result.data);
          },
        });
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
      }
    };

    loadCSVFile(activeFile);
    setSearch(""); // Reset search on file change
  }, [activeFile]);

  // Filtered data based on search
  const filteredData = search.trim()
    ? data.filter((row) =>
        columns.some((col) =>
          String(row[col] || "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* "Go to Top" Button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-5 right-5 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        aria-label="Go to top"
      >
        
      </button>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">
          PrivacyHack CSV Viewer
        </h1>

        {/* Tabs for File Selection */}
        <div className="tabs flex justify-center mb-8">
          {fileNames.map((fileName) => (
            <button
              key={fileName}
              className={`px-6 py-3 mx-2 rounded-lg shadow ${
                activeFile === fileName
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition duration-300`}
              onClick={() => setActiveFile(fileName)}
            >
              {tabNames[fileName]}
            </button>
          ))}
        </div>

        {/* Search Filter */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-900 text-green-400 placeholder-gray-500 w-full max-w-xs"
          />
        </div>

        {/* Table Section */}
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="table-auto border-collapse w-full text-sm shadow-sm rounded-lg bg-black text-green-500 border border-gray-700">
                <thead className="bg-gray-900 sticky top-0 z-10 text-green-400">
                  <tr>
                    {columns.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-700 px-4 py-2 text-left font-medium"
                        style={{ position: 'sticky', top: 0, background: '#111827', zIndex: 1 }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={
                        (rowIndex % 2 === 0 ? "bg-black" : "bg-gray-900") +
                        " hover:bg-green-900/30 transition"
                      }
                    >
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-700 px-4 py-2"
                        >
                          {row[col] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            No data available for this file.
          </p>
        )}
      </div>
    </div>
  );
};

export default CSVViewer;
