import { AiOutlineClose } from 'react-icons/ai';
import {
    EmailIcon, EmailShareButton, FacebookIcon,
    FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LineIcon, LineShareButton, PinterestIcon, PinterestShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, ViberIcon, ViberShareButton
} from 'react-share';
import Slider from 'react-slick';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';

const ShareModal = ({ onShare, activeShare, id }) => {
    const shareUrl = `https://firmtv.herokuapp.com/home/anime/${id}`;

    function NextArrow({ onClick }) {
        return (
            <div
                className={`${styles.customArrow} ${styles.customNext}`}
                onClick={onClick}
            >
                <img src="/home/icArrowRight.svg" alt="" />
            </div>
        );
    }

    function PrevArrow({ onClick }) {
        return (
            <div
                className={`${styles.customArrow} ${styles.customPrev}`}
                onClick={onClick}
            >
                <img src="/home/icArrowLeft.svg" alt="" />
            </div>
        );
    }

    const settings = {
        // infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <Modal
            isOpen={activeShare}
            toggle={onShare}
            size="lg"
            style={{ maxWidth: '518px' }}
        >
            <ModalBody>
                <p className={styles.title_share}>
                    chia sẻ
                    <span onClick={onShare}>
                        <AiOutlineClose className={styles.icon_close} />
                    </span>
                </p>
                <div className={styles.share}>
                    <Slider {...settings} className={styles.slider}>
                        <div className={`${styles.dip} ${styles.item}`}>
                            <div className={styles.iconDip}>
                                <p>Nhúng</p>
                            </div>
                            <p>Nhúng</p>
                        </div>

                        <div className={styles.facebook}>
                            <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={60} round={true} />
                            </FacebookShareButton>
                            <p>Facebook</p>
                        </div>

                        <div className={styles.massage}>
                            <FacebookMessengerShareButton
                                appId=""
                                url={shareUrl}
                            >
                                <FacebookMessengerIcon size={60} round={true} />
                            </FacebookMessengerShareButton>
                            <p>Massage</p>
                        </div>

                        <div className={styles.twitter}>
                            <TwitterShareButton url={shareUrl}>
                                <TwitterIcon size={60} round={true} />
                            </TwitterShareButton>
                            <p>Twitter</p>
                        </div>

                        <div className={styles.email}>
                            <EmailShareButton url={shareUrl}>
                                <EmailIcon size={60} round={true} />
                            </EmailShareButton>
                            <p>Email</p>
                        </div>

                        <div className={styles.pinterest}>
                            <PinterestShareButton
                                media={shareUrl}
                                url={shareUrl}
                            >
                                <PinterestIcon size={60} round={true} />
                            </PinterestShareButton>
                            <p>Pinterest</p>
                        </div>

                        <div className={styles.line}>
                            <LineShareButton url={shareUrl}>
                                <LineIcon size={60} round={true} />
                            </LineShareButton>
                            <p>Line</p>
                        </div>

                        <div className={styles.telegram}>
                            <TelegramShareButton url={shareUrl}>
                                <TelegramIcon size={60} round={true} />
                            </TelegramShareButton>
                            <p>telegram</p>
                        </div>

                        <div className={styles.viber}>
                            <ViberShareButton url={shareUrl}>
                                <ViberIcon size={60} round={true} />
                            </ViberShareButton>
                            <p> Viber</p>
                        </div>
                    </Slider>
                </div>

                <div className={styles.content_dip}>
                    <input value={shareUrl} />
                    <button>Sao chép</button>
                </div>

            </ModalBody>
        </Modal>
    )
}

export default ShareModal
