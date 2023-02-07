import { useEffect, useState } from "react";
import { Account, EDIT, DISPLAY } from './account.types';
import { getListAccount, resetPassWord } from './account.services';
import { OnFilter, OnFilterByDate, formatDate } from '../../../common/commonFuncition';
import * as notifys from '../../../library/toast/toast';

interface Utils {
    data: Account[];
    dataCopy: Account[];
    onChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: () => void;
    onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRefresh: () => void;
    onStatusDialog: () => void;
    setStatusDiaLog: (value: boolean) => void;
    refreshDate: any;
    statusDialog: boolean;
    accountSelected: Account;
    setAccountSelected: (account: Account) => void;
    HandlerResetPassWordButton: (account: Account) => void;
    onResetPassWord: (username: string) => void;
    handlerEditAccountButton: (account: Account) => void

}

export default function AccountUtils(): Utils {
    const [data, setData] = useState<Account[]>([])
    const [dataCopy, setDataCopy] = useState<Account[]>([]);
    const [date, setDate] = useState<any>({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState<any>(formatDate(new Date()));
    const [statusDialog, setStatusDiaLog] = useState<boolean>(false);
    const [accountSelected, setAccountSelected] = useState<Account>({
        id: 0,
        username: "",
        fullName: "",
        email: "",
        numberPhone: "",
        role: "",
        expirationDate: "",
        status: false
    });



    useEffect(() => {
        fetchListAccount();
    }, [])

    useEffect(() => {
        setDataCopy(data);
    }, [data])

    const fetchListAccount = async () => {
        const res = await getListAccount();
        setData(res);
    }

    const onResetPassWord = async (username: string) => {
        try {
            const res = await resetPassWord(username);
            if (res) {
                notifys.notifySuccess("Reset password success");
                setStatusDiaLog(false);
            }
        } catch (error) {
            notifys.notifySuccess("Reset password false");
        }
    }

    const HandlerResetPassWordButton = (account: Account) => {
        setStatusDiaLog(true);
        setAccountSelected(account);
    }

    const handlerEditAccountButton = (account: Account) => {
        setAccountSelected(account);
    }



    const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        let dataFilter = OnFilter(name, value, data);
        setDataCopy(dataFilter);
    }

    const onSearch = () => {
        let dataFilter = OnFilterByDate('expirationDate', date.startDate, date.endDate, data);
        setDataCopy(dataFilter);
    }

    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setDate({ ...date, [name]: value });
    }

    const onRefresh = () => {
        setRefreshDate(formatDate(new Date()));
        fetchListAccount();
    }

    const onStatusDialog = () => {
        setStatusDiaLog(!statusDialog)
    }

    return {
        data,
        dataCopy,
        onStatusDialog,
        onRefresh,
        onChangeDate,
        onSearch,
        onFilter,
        setStatusDiaLog,
        refreshDate,
        statusDialog,
        accountSelected,
        setAccountSelected,
        HandlerResetPassWordButton,
        onResetPassWord,
        handlerEditAccountButton
    }
}