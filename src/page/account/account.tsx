import React, { useState } from 'react';
import { DISPLAY, ADD, EDIT } from './utils/account.types';
import styles from './styles.module.scss';
import AccountDisPlay from './accountDisplay';
import AccountEdit from './accountEdit';
import AccountAdd from './accountAdd';
import AccountUtils from './utils/account.utils';

const Account = () => {
    const [statusPage, setStatusPage] = useState<string>(DISPLAY);
    const {
        dataCopy,
        onStatusDialog,
        onRefresh,
        onChangeDate,
        onSearch,
        refreshDate,
        statusDialog,
        accountSelected,
        HandlerResetPassWordButton,
        onResetPassWord,
        handlerEditAccountButton
    } = AccountUtils();

    const genData = () => {
        switch (statusPage) {
            case DISPLAY:
                return <AccountDisPlay
                    setStatusPage={setStatusPage}
                    dataCopy={dataCopy}
                    onStatusDialog={onStatusDialog}
                    onRefresh={onRefresh}
                    onChangeDate={onChangeDate}
                    onSearch={onSearch}
                    refreshDate={refreshDate}
                    statusDialog={statusDialog}
                    accountSelected={accountSelected}
                    HandlerResetPassWordButton={HandlerResetPassWordButton}
                    onResetPassWord={onResetPassWord}
                    handlerEditAccountButton={handlerEditAccountButton}
                />
            case ADD:
                return <AccountAdd />
            case EDIT:
                return <AccountEdit accountSelected={accountSelected} />

            default:
                return <AccountDisPlay
                    setStatusPage={setStatusPage}
                    dataCopy={dataCopy}
                    onStatusDialog={onStatusDialog}
                    onRefresh={onRefresh}
                    onChangeDate={onChangeDate}
                    onSearch={onSearch}
                    refreshDate={refreshDate}
                    statusDialog={statusDialog}
                    accountSelected={accountSelected}
                    HandlerResetPassWordButton={HandlerResetPassWordButton}
                    onResetPassWord={onResetPassWord}
                    handlerEditAccountButton={handlerEditAccountButton}
                />
        }
    }

    const onAdd = () => {
        if (statusPage === DISPLAY)
            setStatusPage(ADD)
        else setStatusPage(DISPLAY)
    }
    const genTitle = () => {
        if (statusPage === DISPLAY) return "Display";
        else if (statusPage === ADD) return "Add";
        else return "Edit";
    }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <h5>{`Account >>> ${genTitle()}`}</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Account</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default Account
