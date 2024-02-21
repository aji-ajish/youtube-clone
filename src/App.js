import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Navbar from "./components/Navbar";
import AddVideo from "./pages/AddVideo";
import ListVideos from "./pages/ListVideos";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/admin/addvideo" element={<AddVideo />} />
        <Route path="/admin/listvideo" element={<ListVideos />} />
      </Routes>
    </BrowserRouter>
  );
}
