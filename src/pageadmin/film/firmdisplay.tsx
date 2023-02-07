import React from 'react'
import { Col, Row} from 'reactstrap';
import styles from './styles.module.scss';
import ItemFirm from './itemfilm';
import { MdRefresh } from 'react-icons/md';
import { Film } from './utils/film.types';
import FilmDisplayUtils from './utils/filmDisplay.utils';
import { DatePicker, Space } from 'antd';
import FilmColumns from './utils/film.column';
import { Table } from 'antd';
import { CSVLink } from "react-csv";
interface Props {
    setStatus: (pageStatus: string) => void;
    setId: (idFilm: number) => void;
}
const FilmDisplay = ({ setStatus, setId }: Props) => {
    const { dataCopy, onSearch, onChangeDate, onRefresh, refreshDate, onHandleChangeStatusHot, onHandleChangeStatusCost, onHandleChangeStatusActive } = FilmDisplayUtils();
    return (
        <div className={styles.table}>
            <div className={styles.search}>
                <Row>
                    <Col xs="4">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <DatePicker.RangePicker status="warning" style={{ width: '100%' }} />
                        </Space>
                    </Col>
                    <Col xs="2">
                        <button onClick={onSearch} >Search</button>
                    </Col>
                    <Col xs="3">
                    </Col>
                    <Col xs="3">
                        <span>Last Update : {refreshDate}</span>
                        <MdRefresh size={35} className={styles.icon_refresh} onClick={onRefresh} />

                    </Col>
                </Row>
            </div>
            <div className={styles.export}><CSVLink data={dataCopy} filename={"film.csv"}>Export</CSVLink></div>
            <Table columns={FilmColumns({ onHandleChangeStatusHot, onHandleChangeStatusActive, onHandleChangeStatusCost })} dataSource={dataCopy} rowKey="id" />
        </div>
    )
}

export default FilmDisplay
