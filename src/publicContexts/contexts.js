import { createContext, useState } from 'react';
export const PublicContext = createContext();

const PublicContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
    const [idToken, setIdToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const [infoAccount, setInfoAccount] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const publicContextData = {
        isLogin,
        idToken,
        setIdToken,
        setIsLogin,
        infoAccount,
        setInfoAccount,
    }

    return (
        <PublicContext.Provider value={publicContextData}>{children}</PublicContext.Provider>
    );
}

export default PublicContextProvider;

