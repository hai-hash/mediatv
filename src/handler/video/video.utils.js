
import {useState} from 'react'
import {findIndex} from 'lodash'


export default function VideoUtils(){
    const [firmCurren,setFirmCurren] = useState();
    const [videos, setVideo] = useState([
        {
            id: 1,
            nameVideo: "One piea",
            status : "Hoàn tất 4/25 tập",
            director: "Nguyễn văn hải",
            actor : "Nguyễn văn hải",
            category: "Hành động, phép thuật",
            nation: "Việt nam",
            time: "25 phút/tập",
            countview: "1000 view",
            year: "Sản xuất năm 1999",
            url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnVzV5GiUN6LjNGFCK6TxYoz2DD7KtiljlQ&usqp=CAU",
            firm:[
                {
                    namechap: "Tập 1",
                    url: "https://www.youtube.com/embed/AeaD3Q-bFjU",
                },
                {
                    namechap: "Tập 2",
                    url: "https://youtube.com/embed/mOUQwVUO4q0",
                },
                {
                    namechap: "Tập 3",
                    url: "https://www.youtube.com/embed/tzv86xibN6s",
                },
                {
                    namechap: "Tập 4",
                    url: " https://www.youtube.com/embed/puHNx_44koE",
                },
            ],
        },

        {
            id: 2,
            nameVideo: "Supper Dragon ball",
            status : "Hoàn tất 25/25 tập",
            director: "Nguyễn văn hải",
            actor : "Nguyễn văn hải",
            category: "Hành động, phép thuật",
            nation: "Việt nam",
            time: "25 phút/tập",
            countview: "1000 view",
            year: "Sản xuất năm 1999",
            url : "https://vuianime.net/upload/images/dragon-ball-super-thumbnail.jpg",
            firm:[
                {
                    namechap: "Tập 1",
                    url: "https://www.youtube.com/embed/LcBlNwOc5ws",
                },
                {
                    namechap: "Tập 2",
                    url: "https://www.youtube.com/embed/9Dhe4KF4bCY",
                },
                {
                    namechap: "Tập 3",
                    url: "https://www.youtube.com/embed/i5JMgOIzcbQ",
                },
                {
                    namechap: "Tập 4",
                    url: " https://www.youtube.com/embed/Kh5DB6Al38Q",
                },
                {
                    namechap: "Tập 5",
                    url: "https://www.youtube.com/embed/ffwHp7PIuCI",
                },
                {
                    namechap: "Tập 6",
                    url: "https://www.youtube.com/embed/tU1jTAUQfv8",
                },
                {
                    namechap: "Tập 7",
                    url: " https://www.youtube.com/embed/Kh5DB6Al38Q",
                },
            ],
        }
    ]);

    const getFirmCurren = (id) =>{
        let index = findIndex(videos,(video) =>{
            return video.id === parseInt(id);
        });
        if(index !== -1){
            setFirmCurren(videos[index])
    }
    }

    


    return {
        videos,
        getFirmCurren,
        firmCurren
    }
}