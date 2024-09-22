import { FC } from "react";
import { BrowserRouter, Route, Routes as RouteSwitch } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <RouteSwitch>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </RouteSwitch>
    </BrowserRouter>
  );
};

export default Routes;
