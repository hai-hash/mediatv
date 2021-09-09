import 'bootstrap/dist/css/bootstrap.min.css';
import ItemFirm from './Itemfirm';
import styles from './styles.module.scss';
import {AiFillVideoCamera} from 'react-icons/ai'
import VideoUtils from '../../../handler/video/video.utils';
const SeriesMoved = () =>{
    const arr = []
    const{videos} = VideoUtils();
    const display = () =>{
        var result = null;
        if(videos.length > 0){
            result = videos.map((video,index) =>{
                return (
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"  key={index}>
                      <ItemFirm video={video}/>
                    </div>
                )
            })
        }
        return result;
      }
    return(
        <>
        <h1 className={styles.title_series}><AiFillVideoCamera className={styles.icon_series}/>PHIM BỘ CẬP NHẬT</h1>
        <div className="row">
        {display()}
        </div>
        

        </>
    )
}
export default SeriesMoved;