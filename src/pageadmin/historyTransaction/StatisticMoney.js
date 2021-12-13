import React from 'react';
import styles from './styles.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const StatisticMoney = ({ dataTotal }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thu Nhập hàng tháng',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'august', 'september', 'october', 'november', 'december'];

    const data = {
        labels,
        datasets: [
            {
                label: `Tổng`,
                data: dataTotal,
                borderColor: 'red',
                backgroundColor: 'red',
            },
        ],
    };

    return (
        <div className={styles.chart}>
            <Line options={options} data={data} style={{ height: '500px' }} />;
        </div>
    )
}
export default StatisticMoney;

