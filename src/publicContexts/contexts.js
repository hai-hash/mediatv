import { createContext, useState } from 'react';
export const PublicContext = createContext();

const PublicContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
    const [idToken, setIdToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const [infoAccount, setInfoAccount] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [filmSelect, setFilmSelect] = useState();
    const [categorySelect, setCategorySelect] = useState();
    const [episodeSelect, setEpisodeSelect] = useState();
    const publicContextData = {
        isLogin,
        idToken,
        setIdToken,
        setIsLogin,
        infoAccount,
        setInfoAccount,
        filmSelect,
        setFilmSelect,
        categorySelect,
        setCategorySelect,
        episodeSelect,
        setEpisodeSelect,

    }

    return (
        <PublicContext.Provider value={publicContextData}>{children}</PublicContext.Provider>
    );
}

export default PublicContextProvider;

