import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import Home from "./pages/Home";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
