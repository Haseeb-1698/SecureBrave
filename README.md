# PrivacyHack Dashboard

A modern, interactive dashboard for exploring and analyzing your Brave browser data. Effortlessly view, filter, and understand your browser's history, bookmarks, passwords, prefetch details, and more—all in a beautiful, responsive web app.

---

## 🚀 Project Overview

**PrivacyHack Dashboard** is a React + Vite application designed for digital forensics, privacy enthusiasts, and anyone curious about their Brave browser data. It provides a seamless interface to:
- View and filter CSV data (history, bookmarks, passwords, etc.)
- Explore raw hex data for advanced analysis
- Switch between light and dark themes
- Enjoy a fast, responsive, and visually appealing UI

---

## ✨ Features

- **Dashboard Home**: Quick access to all data types with beautiful cards
- **Theme Toggle**: Instantly switch between light and dark modes
- **CSV Viewer**:
  - Tabbed navigation for different data types
  - Fast, filterable, scrollable tables with sticky headers
  - Black/green terminal-style table for easy reading
- **Hex Viewer**:
  - View raw hex data for all supported files
  - Tabbed navigation and easy scrolling
- **Modern UI**: Built with Tailwind CSS, React, and Vite for speed and style

---

## 📸 Screenshots

> _Add your screenshots here!_

- ![Home Page](./2024-11-17_00-47.png)
- ![Light Theme Example](./2024-11-17_00-47_1.png)

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **CSV Parsing**: PapaParse
- **Routing**: React Router

---

## 📂 Folder Structure

```
pro/
├── public/
│   ├── data/                # CSV and hex data files
│   └── ...
├── src/
│   ├── components/          # React components (Home, CSVViewer, Hex)
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main app entry
│   └── ...
├── index.html
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
```sh
npm install
```

### 3. Run the development server
```sh
npm run dev
```

### 4. Open in your browser
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📝 Usage
- Use the **theme toggle** (top right) to switch between light and dark modes.
- Click **CSV Viewer** or **Hex Viewer** on the home page for detailed data exploration.
- Use the search bar in CSV Viewer to quickly filter table rows.
- Scroll horizontally and vertically for large tables; headers stay visible.

---

## 📑 Data Files
- Place your Brave browser CSV and hex files in the `public/data/` and `public/data/hex/` folders, respectively.
- Supported files: history, bookmarks, passwords, local/session storage, prefetch details, etc.

---

## 🤝 Credits
- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- CSV parsing by [PapaParse](https://www.papaparse.com/)
- UI inspired by modern dashboard and terminal designs

---

## 📬 Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE)
