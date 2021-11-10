import Slider from "react-slick";
import styles from "./styles.module.scss";
import filmApi from "../../../api/film/filmApi";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";
const Slide = () => {
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    const getFilmFavorite = async () => {
      try {
        const res = await filmApi.getFavoriteFilm();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    getFilmFavorite();
  }, [])
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  const onGoToIntroduce = (id) => {
    history.push(`/home/anime/${id}`);
  }

  const display = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((film, index) => {
        return (
          <div className={styles.item_slide} key={index} onClick={() => onGoToIntroduce(film?.id)}>
            <img src={film?.subImage} alt="" />
            <div className={styles.title_slide}>
              <div className={styles.name_slide}>{film?.status}</div>
            </div>
            <div className={styles.view_now}>Xem ngay <GoChevronRight /></div>
          </div>
        )
      })
    }
    return result;
  }
  return (
    <div className={styles.slide}>
      <Slider {...settings}>
        {display()}
      </Slider>
    </div>
  );
}

export default Slide;