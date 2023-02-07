import React, { useState } from 'react';
import { AccountRequest } from './account.types';
import { createNewUser } from './account.services';
import * as toasts from '../../../library/toast/toast';
interface Utils {
    data: AccountRequest,
    onChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRole: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onSaveFilm: (event: React.FormEvent<HTMLDivElement>) => void
}

export default function AccountAddUtils(): Utils {
    const [data, setData] = useState<AccountRequest>({ username: "", password: "", fullName: "", email: "", numberPhone: "", role: "USER" });


    const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        var name = event.target.name;
        var value = event.target.value;
        setData({ ...data, [name]: value })

    }

    const onRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const onSaveFilm = async (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            const res = await createNewUser(data);
            if (res) {
                toasts.notifySuccess("Create new account success");
            }
        } catch (error) {
            toasts.notifyError("Create new account false");
        }
    }

    return {
        data,
        onChangeForm,
        onRole,
        onSaveFilm
    }
}