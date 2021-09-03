import Slider from "react-slick";
import styles from './styles.module.scss';
const Banner = () =>{
    const settings = {
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay:true,
      };
      const arr= [1,2,3,4,5,6,7,8,9,10,11,12]
    
      const display = () =>{
        var result = null;
        if(arr.length > 0){
            result = arr.map((slide,index) =>{
                return (
                    <div className={styles.item_banner} key={index}>
                        <img src ="https://i.pinimg.com/474x/27/c5/fa/27c5fac7833c0233cef69700e4b44ee6.jpg" alt = ""/>
                        <div className={styles.title_banner}>anime bubu siêu hay kịch tính</div>
                        <div className={styles.time_banner}>1999</div>
                        <span>Full 40/40</span>
                    </div >
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
        </div>
      );
}
export default Banner;