import { useEffect, useState } from "react";
import { OnFilter, OnFilterByDate, formatDate } from '../../../common/commonFuncition';
import {Film} from './film.types';
interface Utils{
    data: Film[];
    dataCopy: Film[];
    onSearch: () => void;
    onChangeDate: (e:React.ChangeEvent<HTMLInputElement>) => void;
    onRefresh: () => void;
    refreshDate: string
}
export default function FilmUtils():Utils{
    const [data, setData] = useState<Film[]>([]);
    const [dataCopy, setDataCopy] = useState<Film[]>([]);
    const [date, setDate] = useState<any>({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState<string>(formatDate(new Date()));

    useEffect(() => {
        setDataCopy(data);
    }, [data])

    useEffect(() => {
        // const fetchFilmList = async () => {
        //     try {
        //         const params = {
        //             size: 8,
        //             page: 0,
        //         }
        //         const res = await filmAdminApi.getAll(params);
        //         setData(res);
        //         toasts.notifySuccess("lấy danh sách film thành công");
        //     } catch (error) {
        //         console.log("Failed to fetch film admin list :", error);
        //         toasts.notifyError("lấy danh sách phim thất bại");
        //     }
        // }

        // fetchFilmList();

        //get List Film
    }, [])

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
        // const fetchFilmList = async () => {
        //     try {
        //         const params = {
        //             size: 8,
        //             page: 0,
        //         }
        //         const res = await filmAdminApi.getAll(params);
        //         setData(res);
        //         toasts.notifySuccess("lấy danh sách film thành công");
        //     } catch (error) {
        //         console.log("Failed to fetch film admin list :", error);
        //         toasts.notifyError("lấy danh sách phim thất bại");
        //     }
        // }

        // fetchFilmList();

        //Get again list film
    }
return{
data,
dataCopy,
onChangeDate,
onSearch,
onRefresh,
refreshDate
}
}