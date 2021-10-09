import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import countryAdminApi from '../../api/country/countryApi';
import CountryItem from './countryItem';

const CountryDisplay = ({setStatus}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCountryList = async () => {
            try {

                const res = await countryAdminApi.getAll();
                setData(res);
                toasts.notifySuccess("lấy danh sách country thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách country thất bại");
            }
        }

        fetchCountryList();
    }, [])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((country, index) => {
                return <CountryItem country={country} key={index} setStatus={setStatus} />
            })
        }
        return result;
    }
    return (
        <div className={styles.table}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tên quốc gia</th>
                        <th>Ngày Tạo</th>
                        <th>Ngày Cập Nhật</th>
                        <th>Người Tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Display(data)}
                </tbody>
            </Table>
        </div>
    )
}

export default CountryDisplay
