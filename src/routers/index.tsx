import { FC } from "react";
import { BrowserRouter, Route, Routes as RouteSwitch } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../pages/LoginPage";

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <RouteSwitch>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage userId={"97154454-9534-4ac3-9771-dd7defa0d9e1"} />
            </PrivateRoute>
          }
        />
      </RouteSwitch>
    </BrowserRouter>
  );
};

export default Routes;
