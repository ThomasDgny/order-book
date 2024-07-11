import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/common/Header";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
