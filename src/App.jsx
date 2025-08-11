import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Apply from "./pages/Apply"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App
