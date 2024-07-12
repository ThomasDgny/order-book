import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/common/Header";
import Details from "./pages/Details";

function App() {
  return (
     <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:productId" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
