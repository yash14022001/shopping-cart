import React from "react";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NeedAuth from "./shared/NeedAuth";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Layout from "./shared/Layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <NeedAuth>
                <Layout />
              </NeedAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
