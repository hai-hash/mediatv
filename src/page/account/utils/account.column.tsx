import type { ColumnsType } from 'antd/es/table';
import { Account, EDIT } from './account.types';
import BaseTableActions from '../../../common/components/BaseTableActions';

interface Props {
    HandlerResetPassWordButton: (account: Account) => void;
    handlerEditAccountButton: (account: Account) => void;
    setStatusPage: (pageStatus: string) => void
}

const AccountColumns = ({ HandlerResetPassWordButton, handlerEditAccountButton, setStatusPage }: Props) => {

    const handlerEditButton = (account: Account) => {
        setStatusPage(EDIT);
        handlerEditAccountButton(account);
    }

    const HEADER_ACCOUNT: ColumnsType<Account> = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: any, b: any) => a.username.localeCompare(b.username)
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Number Phone',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Expiration Date',
            dataIndex: 'expirationDate',
            key: 'expirationDate',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, item: Account) => {
                return (
                    <BaseTableActions
                        onResetPassword={() => HandlerResetPassWordButton(item)}
                        onEdit={() => handlerEditButton(item)}
                    />
                );
            },
        },
    ];
    return HEADER_ACCOUNT;
}
export default AccountColumns;