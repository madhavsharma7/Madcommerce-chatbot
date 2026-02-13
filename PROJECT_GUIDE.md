# Mad Commerce - Project Documentation

This guide provides a comprehensive overview of the **Mad Commerce** project, explaining its architecture, tech stack, and how the core components work together.

## 🚀 Tech Stack

- **Core**: [React](https://reactjs.org/) (Functional Components & Hooks)
- **Build Tool**: [Vite](https://vitejs.dev/) (Fast & Modern Development)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Routing**: [React Router Dom v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Product API**: [Fakestore API](https://fakestoreapi.com/)

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main wrapper with Navbar, Footer, and ChatBot
│   ├── Navbar.jsx      # Sticky navigation with Category dropdown
│   ├── ProductGrid.jsx # Fetches and filters products
│   ├── ChatBot.jsx     # AI assistant (Mocked)
│   └── ...
├── pages/               # Main page views
│   ├── Index.jsx       # Home page
│   ├── About.jsx       # Company info
│   ├── Contact.jsx     # Contact form and support
│   └── Login.jsx       # Login demonstration
├── lib/                 # Utility functions (e.g., cn for class merging)
├── App.jsx              # Routing and Provider setup
└── main.jsx             # React entry point
```

---

## 🛠️ Core Features & Components

### 1. Navigation & Routing (`App.jsx`, `Layout.jsx`)
The project uses **React Router** for seamless page transitions. Unlike traditional websites, it doesn't reload the entire page; only the content within the `<Outlet />` changes.
- **Layout System**: The `Layout` component wraps all routes, ensuring that the **Navbar**, **Footer**, and **ChatBot** are always visible to the user as they navigate.

### 2. Product Grid & Filtering (`ProductGrid.jsx`)
- **Data Fetching**: Uses `useQuery` from TanStack Query to fetch product data from `fakestoreapi.com`. This provides efficient caching and loading states.
- **Category Filtering**: Instead of complex state management, it uses **URL Search Parameters** (`?category=...`). 
  - When you click a category in the Navbar, it updates the URL.
  - `ProductGrid` listens to the URL and automatically filters the list to match.

### 3. Smart ChatBot (`ChatBot.jsx`)
The ChatBot is an interactive support assistant.
- **Mock Logic**: To keep the project independent of expensive backends, it uses a local **mocked response generator**.
- **Regex Detection**: It scans user input for keywords (like "shipping", "price", "hello") and provides relevant, pre-defined responses.
- **Animations**: Uses `framer-motion` for smooth opening/closing and message bubble transitions.

### 4. Custom Styling (`tailwind.config.js`)
Styling is strictly **Tailwind CSS**. 
- **Theme Variables**: Custom colors like `navbar`, `background`, and `primary` are defined in `tailwind.config.js` and linked to CSS variables in `index.css`. This makes it easy to change the entire site's color scheme from one place.
- **Responsive Design**: Everything is built with a mobile-first approach using Tailwind's prefixes (`md:`, `lg:`).

---

## 📄 Page Breakdown

- **Home (`/`)**: Shows the Hero Banner and the filtered/all products list.
- **Contact (`/contact`)**: A premium support page with contact cards and an interactive form.
- **About (`/about`)**: A storytelling page highlighting the brand's values and mission.
- **Login (`/login`)**: A demonstration of a modern authentication UI.

---

## ⚡ Development Workflow

1. **Start Dev Server**: `npm run dev`
2. **Build for Production**: `npm run build`
3. **Preview Build**: `npm run preview`

The project is designed to be **lightweight, fast, and easy to maintain**, focusing on a premium user experience with minimal external dependencies.
