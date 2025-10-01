import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect} from "react";

//We need to check if we are authorized before we allow someone to access this route. Otherwise, we just need to redirect them and tell them they need to log in before they can view this
const ProtectedRoute = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(()=>{
    auth().catch(()=>setIsAuthorized(false));
  })

  //refreshing the access token automatically
  const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
          const response = await api.post("/api/token/refresh/", {
            refresh: refreshToken
          });
          if (response.status === 200){
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorized(true);
          }
        } catch (error) {
          console.log(error)
          setIsAuthorized(false);
          
        }
  };

  //checking if refresh is required or not
  const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if(!token){
        setIsAuthorized(false);
        return
      }
      const decoded = jwtDecode(token)
      const tokenExpiration = decoded.exp
      const now = Date.now() / 1000

      if(tokenExpiration < now){
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
