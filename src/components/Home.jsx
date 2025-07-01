import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const features = [
  {
    title: "History",
    description:
      "Explore your browsing history from Brave Browser. Analyze session activities and revisit previously visited websites.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
      </svg>
    ),
    link: "/history",
  },
  {
    title: "Bookmarks",
    description:
      "Manage all saved bookmarks in Brave Browser. Quickly access your favorite websites and organize them efficiently.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    link: "/bookmarks",
  },
  {
    title: "Passwords",
    description:
      "Securely access all saved passwords stored in your browser. Review, manage, and export login credentials.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M4 12h16"></path>
        <path d="M12 16v4"></path>
        <path d="M12 4v4"></path>
      </svg>
    ),
    link: "/passwords",
  },
  {
    title: "Prefetch Details",
    description:
      "Comprehensive details of the browser's prefetching behavior to optimize browsing performance.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 12H8"></path>
        <path d="M12 8v8"></path>
      </svg>
    ),
    link: "/prefetch-details",
  },
  {
    title: "Prefetch Timeline",
    description:
      "Track and analyze the timeline of all prefetching activities performed during browsing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 6h16"></path>
        <path d="M4 12h16"></path>
        <path d="M4 18h16"></path>
      </svg>
    ),
    link: "/prefetch-timeline",
  },
  {
    title: "Prefetch Names",
    description:
      "List of all prefetching targets by name, showing the URLs fetched in advance for better performance.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4 4h16v16H4z"></path>
        <path d="M4 4v16"></path>
        <path d="M12 4v16"></path>
        <path d="M20 4v16"></path>
      </svg>
    ),
    link: "/prefetch-names",
  },
  {
    title: "Prefetch Timestamps",
    description:
      "Detailed timestamps for all prefetching events during browsing, helping optimize network performance.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    ),
    link: "/prefetch-timestamps",
  },
  {
    title: "Local Storage",
    description:
      "Access and manage data stored in the browser's local storage for efficient performance optimization.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="2" y="2" width="20" height="20" rx="2"></rect>
        <path d="M6 6h12v12H6z"></path>
      </svg>
    ),
    link: "/local-storage",
  },
  {
    title: "Session Storage",
    description:
      "Review session storage data saved during your current browsing session.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="4" y="2" width="16" height="20" rx="2"></rect>
        <path d="M8 6h8"></path>
      </svg>
    ),
    link: "/session-storage",
  },
];
const Home = () => {
  // Theme state: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    // Try to load from localStorage, default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle button (top right)
  const ThemeToggle = (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg border border-gray-300 bg-white/80 hover:bg-gray-100 text-gray-800 font-semibold transition dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );

  if (theme === 'light') {
    // Light theme (from commented code)
    return (
      <div className="min-h-screen bg-gray-50 py-10 relative text-gray-900">
        {ThemeToggle}
        {/* Background blur circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 transform scale-110 rotate-45"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 transform scale-110 -rotate-45"></div>
        {/* Top Section */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-base font-semibold leading-7 text-red-600">Meet</h2>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-900" style={{ lineHeight: "1.3" }}>
              PrivacyHack Dashboard
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore detailed insights into your Brave browser data.
            </p>
            {/* CSV/Hex Viewer Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Link
                to="/history"
                className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition text-lg"
              >
                CSV Viewer
              </Link>
              <Link
                to="/hex-viewer"
                className="px-6 py-3 rounded-lg bg-gray-200 text-red-700 font-semibold shadow hover:bg-gray-300 transition text-lg border border-red-200"
              >
                Hex Viewer
              </Link>
            </div>
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition transform duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                <dt className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </p>
                </dt>
                <dd className="text-base text-gray-500">{feature.description}</dd>
                <div className="mt-4 flex items-center text-red-600 font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right ml-1 h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dark theme (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {ThemeToggle}
      {/* Header Section */}
      <div className="container mx-auto px-6 pt-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
          PrivacyHack Dashboard
        </h1>
        <p className="text-lg text-gray-300">
          Explore detailed insights into your Brave browser data with a modern
          and interactive dashboard.
        </p>
        {/* CSV/Hex Viewer Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/history"
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition text-lg"
          >
            CSV Viewer
          </Link>
          <Link
            to="/hex-viewer"
            className="px-6 py-3 rounded-lg bg-gray-800 text-red-300 font-semibold shadow hover:bg-gray-700 transition text-lg border border-red-500/40"
          >
            Hex Viewer
          </Link>
        </div>
      </div>
      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Link
            to={feature.link}
            key={index}
            className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gray-700/50 group-hover:bg-red-500 transition-colors">
                {feature.icon}
              </div>
              <h3 className="ml-4 text-xl font-semibold text-white">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-300">{feature.description}</p>
          </Link>
        ))}
      </div>
      {/* Footer Section */}
      <div className="container mx-auto px-6 py-8 text-center bg-gray-800/30 backdrop-blur-sm rounded-lg">
        <h4 className="text-lg font-semibold text-red-400">
          Reliable Insights
        </h4>
        <p className="text-sm text-gray-300">
          Ensure your data is accurate, secure, and trustworthy.
        </p>
      </div>
    </div>
  );
};

export default Home;