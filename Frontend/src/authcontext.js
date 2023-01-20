import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Frontend/src/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [User, setUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            
            setUser(() => user)
            console.log(user?.uid)
            
    }); 
    
    return () => {
        unsub();
    }},[]);
    return(
    <AuthContext.Provider value={User}>
        {children}
    </AuthContext.Provider>
)};

