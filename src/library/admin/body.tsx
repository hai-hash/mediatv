import React from 'react'
import styles from './styles.module.scss';
import { MdAccountCircle } from "react-icons/md";
import FilmAdmin from '../../pageadmin/film/film';
import CategoryAdmin from '../../pageadmin/category/category';
import EpisodesAdmin from '../../pageadmin/episodes/episodes';
import { Switch, Route } from "react-router-dom";
import NotFound from './notfound';
// import HomeAdminSub from '../../pageadmin/home/home';
import CommentAdmin from '../../pageadmin/comment/comment';
import ViewAdmin from '../../pageadmin/view/view';
import Account from '../../page/account/account';
import Evaluate from '../../pageadmin/evaluate/evaluate';
import Country from '../../pageadmin/country/country';
import HistoryTransaction from '../../pageadmin/historyTransaction/historyTransaction';
import TypeTransaction from '../../pageadmin/typetransaction/typeTransaction';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import * as toasts from '../toast/toast';
export default function BodyAdmin() {
    const history = useHistory();
    const { setIsLogin } = useContext(PublicContext);
    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(false);
        history.push("/home");
        toasts.notifySuccess("Đăng xuất thành công");
    }
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <div><MdAccountCircle className={styles.icon_account} onClick={onLogout} /></div>
            </div>
            <Switch>
                <Route exact path="/admin"> <Account /></Route>
                <Route path="/admin/account"> <Account /></Route>
                <Route path="/admin/film"> <FilmAdmin /></Route>
                <Route path="/admin/category"> <CategoryAdmin /></Route>
                <Route path="/admin/episodes"> <EpisodesAdmin /></Route>
                <Route path="/admin/comments"> <CommentAdmin /></Route>
                <Route path="/admin/views"> <ViewAdmin /></Route>
                <Route path="/admin/evaluates"> <Evaluate /></Route>
                <Route path="/admin/countrys"> <Country /></Route>
                <Route path="/admin/transaction"> <HistoryTransaction /></Route>
                <Route path="/admin/type/transaction"> <TypeTransaction /></Route>
                <Route path="/admin/*"><NotFound /></Route>
            </Switch>

        </div>
    )
}

