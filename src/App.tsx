import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { SearchScreen } from "./screens/SearchScreen";
import { ProductDetailScreen } from "./screens/ProductDetailScreen";
import { SavedScreen } from "./screens/SavedScreen";
import { BottomNav } from "./components/BottomNav";

function AppShellContent() {
  const location = useLocation();
  // Hide the tab bar on the detail screen, matching how a real mobile app
  // pushes a full-screen view on top of the tab navigator.
  const showNav = location.pathname === "/" || location.pathname === "/saved";

  return (
    <div className="app-viewport">
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/product/:id" element={<ProductDetailScreen />} />
        <Route path="/saved" element={<SavedScreen />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <AppShellContent />
      </div>
    </HashRouter>
  );
}

export default App;
