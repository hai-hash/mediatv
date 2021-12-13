import Slider from "react-slick";
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import filmApi from "../../../api/film/filmApi";
import { Link } from "react-router-dom";
const Banner = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getAllFilmViewMost = async () => {
      try {
        const res = await filmApi.getFilmViewMostIncurrent();
        setData(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFilmViewMost();
  }, [])

  const settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const display = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((video, index) => {
        return (
          <Link to={`/home/anime/${video.id}`} className={styles.wap_item_firm} key={index}>
            <div className={styles.item_banner} >
              <img src={video?.illustration} alt="" />
              <div className={styles.title_banner}>{video.nameFilm}</div>
              {/* <div className={styles.time_banner}>{video.viewingTime}</div> */}
              <span>{video.status}</span>
              {video?.cost &&
                <img className={styles.icon_vip} src="/logo/vip.png" alt="" />
              }
            </div >
          </Link>
        )
      })
    }
    return result;
  }
  return (
    <div className={styles.banner}>
      <Slider {...settings}>
        {display()}
      </Slider>
      {loading && <span className={styles.loader}></span>}
    </div>
  );
}
export default Banner;