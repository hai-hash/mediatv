import React from 'react';
// import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import { MdRefresh } from 'react-icons/md';
import DialogResetAccount from '../../library/Dialog/dialogResetAccount';
import { CSVLink } from "react-csv";
import { Account } from './utils/account.types';
import { Table } from 'antd';
import AccountColumns from './utils/account.column';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

interface Props {
    setStatusPage: (pageStatus: string) => void;
    dataCopy: Account[];
    onStatusDialog: () => void;
    onRefresh: () => void;
    onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    refreshDate: any;
    statusDialog: boolean;
    accountSelected: Account;
    HandlerResetPassWordButton: (account: Account) => void;
    handlerEditAccountButton: (account: Account) => void;
    onResetPassWord: (username: string) => void;
}

const AccountDisPlay = ({
    setStatusPage,
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
}: Props) => {


    return (
        <div className={styles.table}>
            <div className={styles.search}>
                <Row>
                    <Col xs="4">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <DatePicker.RangePicker status="warning" style={{ width: '100%' }} />
                        </Space>
                        {/* <input type="date" name="startDate" style={{ width: '170px' }} onChange={onChangeDate} /> */}
                    </Col>
                    <Col xs="2">
                        {/* <input type="date" name="endDate" style={{ width: '170px' }} onChange={onChangeDate} /> */}
                    </Col>
                    <Col xs="2">
                        <button onClick={onSearch} >Search</button>
                    </Col>
                    <Col xs="1">
                    </Col>
                    <Col xs="3">
                        <span>Last Update : {refreshDate}</span>
                        <MdRefresh size={35} className={styles.icon_refresh} onClick={onRefresh} />

                    </Col>
                </Row>
            </div>
            <div className={styles.export}><CSVLink data={dataCopy} filename={"account.csv"}>Export</CSVLink></div>
            <Table columns={AccountColumns({ HandlerResetPassWordButton, handlerEditAccountButton, setStatusPage })} dataSource={dataCopy} rowKey="id" />
            <DialogResetAccount statusDialog={statusDialog} onStatusDialog={onStatusDialog} accountSelected={accountSelected} onResetPassWord={onResetPassWord} />
        </div>
    )
}

export default AccountDisPlay
