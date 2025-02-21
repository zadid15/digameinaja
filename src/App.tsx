import { BrowserRouter, Route, Routes } from "react-router-dom"
import Browse from "./pages/Browse"
import DetailsGame from "./pages/DetailsGame"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/games/:id" element={<DetailsGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
