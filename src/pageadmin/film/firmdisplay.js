import React,{useEffect} from 'react'
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import VideoUtils from './../../handler/video/video.utils';
import ItemFirm from './itemfilm';
const FilmDisplay = ({setStatus,setId}) => {
    const {dataFilmAdmin,GetAllFilmAdmin,changeActiveFilm,changeHotFilm,} = VideoUtils();
    useEffect(() => {
        GetAllFilmAdmin();
    }, [])

    const Dispplay = (data) =>{
        let result = null;
        if(data.length > 0){
            result = data.map((film,index) =>{
                return <ItemFirm key={index} film = {film} changeActiveFilm={changeActiveFilm} changeHotFilm={changeHotFilm} setStatus={setStatus} setId={setId}/>
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
                                <th>Name Film</th>
                                <th>Ngày Tạo</th>
                                <th>Người Tạo</th>
                                <th>View</th>
                                <th>Hot</th>
                                <th>Active</th>
                                <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Dispplay(dataFilmAdmin)}
                            </tbody>
                </Table>
           </div>
    )
}

export default FilmDisplay
