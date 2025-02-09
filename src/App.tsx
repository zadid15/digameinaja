import { BrowserRouter, Route, Routes } from "react-router-dom"
import Browse from "./pages/Browse"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
