import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CSVViewer from "./components/CSVViewer";
import HexViewer from "./components/Hex"; // Import Hex Viewer

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* CSV Viewer Routes */}
        <Route path="/history" element={<CSVViewer />} />
        <Route path="/bookmarks" element={<CSVViewer />} />
        <Route path="/localstorage" element={<CSVViewer />} />
        <Route path="/passwords" element={<CSVViewer />} />
        <Route path="/prefetch-timeline" element={<CSVViewer />} />
        <Route path="/prefetch-details" element={<CSVViewer />} />
        <Route path="/prefetch-names" element={<CSVViewer />} />
        <Route path="/prefetch-timestamps" element={<CSVViewer />} />
        <Route path="/sessionstorage" element={<CSVViewer />} />

        {/* Hex Viewer Route */}
        <Route path="/hex-viewer" element={<HexViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
