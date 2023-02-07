import type { ColumnsType } from 'antd/es/table';
import { Film,EDIT,DETAIL} from './film.types';
import BaseTableActions from '../../../common/components/BaseTableActions';
import StatusElement from '../components/StatusElement';
interface Props {
    onHandleChangeStatusHot: (id:number) => void
    onHandleChangeStatusActive: (id:number) => void
    onHandleChangeStatusCost: (id:number) => void
}

const FilmColumns = ({ onHandleChangeStatusHot, onHandleChangeStatusActive,onHandleChangeStatusCost}: Props) => {

    const onHandleEditFilm = () => {
    }

    const onHandleDetailFilm = () => {
    }

    const HEADER_FILM: ColumnsType<Film> = [
        {
            title: 'Film Name',
            dataIndex: 'nameFilm',
            key: 'nameFilm',
            sortDirections: ['ascend', 'descend'],
            sorter: (a: any, b: any) => a.nameFilm.localeCompare(b.nameFilm)
        },
        {
            title: 'Count View',
            dataIndex: 'countView',
            key: 'countView',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            render:(_: any, item: Film) =>{
                return (
                    <StatusElement status={item.cost} contentEnable="pay" contentDisaple="Free" onChangeStatus={() =>onHandleChangeStatusCost(item.id)}/>
                )
            }
        },
        {
            title: 'Hot',
            dataIndex: 'hot',
            key: 'hot',
            render:(_: any, item: Film) =>{
                return (
                    <StatusElement status={item.hot} contentEnable="Hot" contentDisaple="Normal" onChangeStatus={() =>onHandleChangeStatusHot(item.id)}/>
                )
            }
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render:(_: any, item: Film) =>{
                return (
                    <StatusElement status={item.active} contentEnable="Active" contentDisaple="UnActive" onChangeStatus={() =>onHandleChangeStatusActive(item.id)}/>
                )
            }
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, item: Film) => {
                return (
                    <BaseTableActions
                    onDetail={() => onHandleDetailFilm()}
                    onEdit={() => onHandleEditFilm()}
                    />
                );
            },
        },
    ];
    return HEADER_FILM;
}
export default FilmColumns;