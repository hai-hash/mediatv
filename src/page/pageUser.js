import React, { useContext, useEffect } from 'react';
import Layout from '../library/layout/layout';
import Body from './body';
import Footer from '../library/layout/footer/footer';
import Loading from '../library/loading/loading';
import { PublicContext } from '../publicContexts/contexts';
import accountApi from '../api/account/accountApi';
const PageUser = () => {
    const { loading, isLogin, infoAccount, setInfoAccount } = useContext(PublicContext);

    useEffect(() => {
        if (isLogin) {
            const checkLogin = async () => {
                const params = {
                    username: infoAccount.username,
                }
                const res = await accountApi.checkVip(params);
                setInfoAccount({ ...infoAccount, role: res ? res : "USER" });
                const newUser = { ...infoAccount, role: res ? res : "USER" };
                localStorage.setItem("user", JSON.stringify(newUser));
            }
            checkLogin()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div style={{ position: "relative" }}>

                <Layout />
                <Body />
                <Footer />
                {loading && <Loading />}
            </div>
        </>
    )
}

export default PageUser
