import Slider from "react-slick";
import styles from "./styles.module.scss";

const Slide = () =>{
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
      };
      const arr = [1,2,3,4,5,6]
      const display = () =>{
        var result = null;
        if(arr.length > 0){
            result = arr.map((slide,index) =>{
                return (
                    <div className={styles.item_slide} key={index}>
                    <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/04/hinh-anh-anime-girl-toc-xanh-duong-xinh-dep-cho-desktop-may-tinh.jpg" alt=""/>
                    <div className={styles.title_slide}>
                        <div className={styles.name_slide}>Đấu phá thương khung</div>
                        <div className={styles.time_slide}>Hoàn thiên lạc ( 1999 )</div>
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