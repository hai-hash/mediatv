import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import viewApi from '../../api/view/viewApi';
import ItemView from './itemView';
// import { Bar } from 'react-chartjs-2';
const ViewDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [dataLable, setDataLable] = useState([]);
    const [dataNumber, setDataNumber] = useState([]);
    useEffect(() => {
        const getAll = async () => {
            try {
                const res = await viewApi.getAll();
                setData(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])

    const genDataLableChart = (data) => {
        var arrName = [];
        var arrLable = [];
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                arrName.push(data[i]?.film?.nameFilm)

            }
            for (var j = 0; j < arrName.length; j++) {
                if (arrLable.indexOf(arrName[j]) === -1) {
                    arrLable.push(arrName[j])
                }
            }


        }
        var dataNumber = [];
        for (var k = 0; k < arrLable.length; k++) {
            var value = 0;
            for (var z = 0; z < data.length; z++) {
                if (data[z]?.film?.nameFilm === arrLable[k]) {
                    value = value + data[z].countView;
                }
            }
            dataNumber.push(value);
        }
        setDataLable(arrLable);
        setDataNumber(dataNumber);
        console.log("đây là lable :", arrLable);
        console.log("đây là dữ liệu :", dataNumber);
    }



    useEffect(() => {
        genDataLableChart(data)
    }, [data])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((view, index) => {
                return <ItemView view={view} key={index} setStatus={setStatus} />
            })
        }
        return result;
    }

    return (
        <>


            <div className={styles.table}>
                {/* <div className={styles.chart}>
                    <Bar
                        data={{
                            labels: dataLable,
                            datasets: [
                                {
                                    label: "view Total",
                                    data: dataNumber,
                                    backgroundColor: '#426ebe',
                                }
                            ]

                        }}
                        width={600}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div> */}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Lượt xem</th>
                            <th>Ngày</th>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Phim</th>
                            <th>ngày khởi tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Display(data)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ViewDisplay
