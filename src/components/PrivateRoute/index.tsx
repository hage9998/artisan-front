import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [currentAuthToken, setCurrentAuthToken] = useState<string>();

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    console.log({ authToken });

    setCurrentAuthToken(authToken as string);

    if (!authToken) navigate("/login");
  }, [navigate]);

  return <>{currentAuthToken ? <>{children}</> : <></>}</>;
};

export default PrivateRoute;
