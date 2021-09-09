import styles from './styles.module.scss';
import {Link, useParams} from 'react-router-dom';
import VideoUtils from '../../handler/video/video.utils';
import {useState,useEffect} from 'react';
import {findIndex} from 'lodash'


const Introduct = () =>{
    const [info,setInfo] = useState({
            id: 0,
            nameVideo: "",
            status : "",
            director: "",
            actor : "",
            category: "",
            nation: "",
            time: "",
            countview: "",
            year: "",
            url: "",
    });
    const{videos} = VideoUtils();
    let { id } = useParams();

    
    useEffect(() => {
      let index = findIndex(videos,(video) =>{
          return video.id === parseInt(id);
      });
      if(index !== -1){
          setInfo(videos[index])
         
          
      }
    }, [id])

  
    
    return (
        
        <>
        <div className={styles.wap_introduct}>
            <div className={styles.top_introduct}>
                <div className={styles.image_introduct}>
                    <img src={info.url} alt="" />
                    <div className={styles.view}><Link className={styles.view_now} to = {`/firm/${info.id}`}><p>Xem ngay</p></Link></div>
                </div>
                <div className={styles.info_introduct}>
                    <p className={styles.name}>{info.nameVideo}</p>
                    <p className={styles.time}>Secrets In The Lattice (2021)</p>
                    <p className={styles.status}>Trạng thái: <span>{info.status}</span></p>
                    <p className={styles.director}>Đạo diễn:<span> {info.director}</span></p>
                    <p className={styles.actor}>Diễn viên:<span>{info.actor}</span></p>
                    <p className={styles.type}>Thể loại:<span> {info.type}</span></p>
                    <p>Quốc gia: {info.nation}</p>
                    <p>Thời lượng: {info.time}</p>
                    <p>Lượt xem: {info.view}</p>
                    <p>Năm xuất bản: {info.year}</p>

                </div>

            </div>

        </div>
        </>
    )
}
export default Introduct;