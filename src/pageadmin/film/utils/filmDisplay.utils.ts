import { useEffect, useState } from "react";
import { OnFilter, OnFilterByDate, formatDate } from '../../../common/commonFuncition';
import {Film} from './film.types';
import {getListAccount} from './film.services';
interface Utils{
    data: Film[];
    dataCopy: Film[];
    onSearch: () => void;
    onChangeDate: (e:React.ChangeEvent<HTMLInputElement>) => void;
    onRefresh: () => void;
    refreshDate: string;
    onHandleChangeStatusHot: (id:number) => void;
    onHandleChangeStatusCost: (id:number) => void;
    onHandleChangeStatusActive: (id:number) => void;
}
export default function FilmDisplayUtils():Utils{
    const [data, setData] = useState<Film[]>([]);
    const [dataCopy, setDataCopy] = useState<Film[]>([]);
    const [date, setDate] = useState<any>({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState<string>(formatDate(new Date()));

    useEffect(() => {
        setDataCopy(data);
    }, [data])

    useEffect(() => {
        fetchFilmList();
    }, [])

    const fetchFilmList = async () => {
        try {
            const res = await getListAccount();
            setData(res);
        } catch (error) {
            console.log("Failed to fetch film admin list :", error);
        }
    }

    const onSearch = () => {
        let dataFilter = OnFilterByDate('createDate', date.startDate, date.endDate, data);
        setDataCopy(dataFilter);
    }
    const onChangeDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setDate({ ...date, [name]: value });
    }
    const onRefresh = () => {
        setRefreshDate(formatDate(new Date()));
        fetchFilmList();
    }
    const onHandleChangeStatusHot=(id:number)=>{
        //handle
    }
    const onHandleChangeStatusCost=(id:number)=>{
        //handle
    }
    const onHandleChangeStatusActive=(id:number)=>{
        //handle
    }
return{
data,
dataCopy,
onChangeDate,
onSearch,
onRefresh,
refreshDate,
onHandleChangeStatusHot,
onHandleChangeStatusCost,
onHandleChangeStatusActive
}
}