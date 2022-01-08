import HistoryItem from './historyItem'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import transactionApi from '../../api/transaction/transactionApi';
import StatisticMoney from './StatisticMoney';
import { Row, Col } from 'reactstrap';
import * as notifys from './../../library/toast/toast';
import { CSVLink } from "react-csv";
const HistoryDisplay = () => {
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
    const [years, setYears] = useState([new Date().getFullYear()]);
    const [dataCopy, setDataCopy] = useState([]);
    const [search, setSearch] = useState({ startDate: "", endDate: "" });





    useEffect(() => {
        const fetchTransactionList = async () => {
            try {
                const res = await transactionApi.getAll();
                setData(res);
                setYears(getYears(res));
                setDataTotal(getDataTotal(yearSelected, res));
                toasts.notifySuccess("lấy danh sách lịch sử giao dịch thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách lịch sử giao dịch thất bại");
            }
        }

        fetchTransactionList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setDataTotal(getDataTotal(yearSelected, data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearSelected])

    useEffect(() => {
        setDataCopy(data);
    }, [data])

    const getYears = (data) => {
        const years = [];
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let year = new Date(data[i]?.createDate).getFullYear();
                if (years.indexOf(year)) {
                    years.push(year)
                }
            }
        }
        return years;
    }

    const getDataTotal = (yearSelected, data) => {
        let dataMap = new Map();
        let dataTotal = [];
        for (let i = 0; i < data.length; i++) {
            let year = new Date(data[i]?.createDate).getFullYear();
            let month = new Date(data[i]?.createDate).getMonth() + 1;
            if (year === yearSelected) {
                if (dataMap.get(month)) {
                    let oldValue = dataMap.get(month);
                    dataMap.set(month, oldValue + data[i].money);
                }
                else {
                    dataMap.set(month, data[i].money);
                }
            }
        }

        for (let j = 1; j <= 12; j++) {
            if (dataMap.get(j)) {
                dataTotal.push(dataMap.get(j));
            }
            else {
                dataTotal.push(0);
            }
        }


        return dataTotal;
    }

    const onFilter = (e) => {
        const name = e.target.name;
        if (e.target.value !== "") {
            const dataFilter = data.filter((item) => {
                const value = item?.[name];
                if (typeof value === 'number') {
                    return value === parseInt(e.target.value);
                }
                else {
                    return item?.[name].toLowerCase().indexOf(e.target.value) !== -1;
                }

            })
            setDataCopy(dataFilter);
        }
        else {
            setDataCopy(data);
        }
    }

    const onFilterUser = (e) => {
        if (e.target.value !== "") {
            const dataFilter = data.filter((item) => {

                return item?.account?.username.toLowerCase().indexOf(e.target.value) !== -1;
            })
            setDataCopy(dataFilter);
        }
        else {
            setDataCopy(data);
        }
    }

    const onFilterByDate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearch({ ...search, [name]: value });
        if (name === "startDate") {
            if (search.endDate !== "") {
                const startDate = new Date(value);
                const endDate = new Date(search.endDate);
                if (startDate < endDate) {
                    const dataFilter = data.filter((item) => {
                        const date = new Date(item?.createDate);
                        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                        return +newDate <= +endDate && +newDate >= +startDate
                    })
                    setDataCopy(dataFilter);
                }
                else if (+startDate === +endDate) {
                    const dataFilter = data.filter((item) => {
                        const date = new Date(item?.createDate);
                        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                        return +newDate === +endDate;
                    })
                    setDataCopy(dataFilter);
                }
                else {
                    notifys.notifyWarning("Ngày bắt đầu phải nhỏ hơn ngày kết thúc.")
                }
            }
        }
        else {
            if (search.startDate !== "") {
                const endDate = new Date(value);
                const startDate = new Date(search.startDate);
                if (startDate < endDate) {
                    const dataFilter = data.filter((item) => {
                        const date = new Date(item?.createDate);
                        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                        return +newDate <= +endDate && +newDate >= +startDate
                    })
                    setDataCopy(dataFilter);
                }
                else if (+startDate === +endDate) {
                    const dataFilter = data.filter((item) => {
                        const date = new Date(item?.createDate);
                        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0, 0);
                        return +newDate === +endDate;
                    })
                    setDataCopy(dataFilter);
                }
                else {
                    notifys.notifyWarning("Ngày kết thúc phải lớn hơn ngày bắt đầu");
                }
            }
        }

    }



    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((transaction, index) => {
                return <HistoryItem transaction={transaction} key={index} />
            })
        }
        return result;
    }

    const DisplayListTime = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((item, index) => {
                return <option key={index}>{item}</option>
            })
        }
        return result;
    }

    const onChangeYear = (e) => {
        console.log(e.target.value)
        setYearSelected(parseInt(e.target.value));
    }

    const caculatorTotalMoney = (data) => {
        let sum = 0;
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                sum += data[i].money;
            }
        }
        return sum;
    }

    return (
        <div className={styles.table}>
            <div className={styles.time_selected}>
                <span>Doanh thu theo năm : </span>
                <select onChange={onChangeYear} value={yearSelected}>
                    {DisplayListTime(years)}
                    <option>2019</option>
                </select>
            </div>


            <StatisticMoney dataTotal={dataTotal} />

            <div className={styles.custom_table}>Tổng Thu Nhập : {caculatorTotalMoney(dataCopy)} VNĐ</div>
            <div className={styles.export}><CSVLink data={dataCopy} filename={"history-transaction.csv"}>Export</CSVLink></div>

            <table class={`table  table-bordered ${styles.custom_table}`}>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Nội dung giao dịch</th>
                        <th>Số tiền giao dịch</th>
                        <th>Ngày Tạo</th>
                        <th>Người Tạo</th>
                        <th>Hình thức thanh toán</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" name="contentTransaction" className="form-control" onChange={onFilter} /></td>
                        <td><input type="text" name="money" className="form-control" onChange={onFilter} /></td>
                        <td>
                            <Row>
                                <Col xs="6">
                                    <input type="date" name="startDate" style={{ width: '100px' }} onChange={onFilterByDate} />
                                </Col>
                                <Col xs="6">
                                    <input type="date" name="endDate" style={{ width: '100px' }} onChange={onFilterByDate} />
                                </Col>
                            </Row>



                        </td>
                        <td><input type="text" className="form-control" onChange={onFilterUser} /></td>
                        <td><input type="text" name="money" className="form-control" /></td>
                        <td></td>
                    </tr>
                    {Display(dataCopy)}

                </tbody>
            </table>
        </div>
    )
}

export default HistoryDisplay
