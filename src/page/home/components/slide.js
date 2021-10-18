import Slider from "react-slick";
import styles from "./styles.module.scss";

const Slide = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const arr = [1, 2, 3, 4, 5, 6]
  const display = () => {
    var result = null;
    if (arr.length > 0) {
      result = arr.map((slide, index) => {
        return (
          <div className={styles.item_slide} key={index}>
            <img src="https://static.fptplay.net/static/img/share/video/28_09_2021/nu-thanh-tra-tai-ba-fpt-play-banner_28-09-2021_19g15-10.jpg" alt="" />
            <div className={styles.title_slide}>
              <div className={styles.name_slide}>Sắp ra mắt</div>
              {/* <div className={styles.time_slide}>2021</div> */}
            </div>
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