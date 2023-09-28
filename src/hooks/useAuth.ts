import { AuthContext } from "@/context/Provider";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
