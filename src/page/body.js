import styles from './styles.module.scss';
import Banner from './home/components/banner'
import NavSub from "../library/navSub/navsub";
import { Switch, Route } from "react-router-dom";
import { routes } from './../library/Router/route';
import { AiFillMessage } from 'react-icons/ai';
import Message from '../library/modal/message';
import { useState } from 'react';
const Body = () => {
    const [activeMessage, setActiveMessage] = useState(false);
    const [activeNotify, setActiveNotify] = useState(true);
    const displayPage = () => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route path={route.path} exact={route.exact} key={index}>
                        {route.content}
                    </Route>
                )
            })
        }
        return result;
    }
    const onMessage = () => {
        setActiveMessage(!activeMessage);
        setActiveNotify(!activeNotify);
    }
    return (
        <>
            <div style={{ background: "#000" }}>
                <div className={styles.container}>
                    <Banner />
                    <div className={styles.container_main}>

                        <div className={styles.container_left}>
                            <Switch>
                                {displayPage()}
                            </Switch>
                        </div>

                        <div className={styles.container_right}>
                            <NavSub />
                        </div>
                    </div>

                </div>
                <div className={styles.message}>
                    <AiFillMessage className={styles.icon_message} onClick={onMessage} />
                    <Message activeMessage={activeMessage} activeNotify={activeNotify} />
                </div>

            </div>

        </>
    );
}
export default Body;