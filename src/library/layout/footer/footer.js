import React from 'react';
import styles from './styles.module.scss';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';

const Footer = () => {
    return (
        <div className={styles.wrap_footer}>
            <div className={styles.content_footer}>
                <div className={styles.logo_footer}>
                    <img src="/favicon.ico" alt="" className={styles.icon} />
                    <p>Film Tv</p>
                </div>
                <div className={styles.content}>
                    <p>Đồ án tốt nghiêp - Người thực hiện : Nguyễn Văn Hải</p>
                    <p>Trụ sở : Số nhà 65, Tổ 9, Mộ lao, Hà đông, Hà Nội</p>
                    <p>Điện thoại: 0339099040. Email: whynotme1131999@gmail.com</p>
                </div>
                <div className={styles.support}>
                    <div className={styles.facebook}>
                        <a href="https://www.facebook.com/profile.php?id=100005400360929" target="_blank" rel="noreferrer">
                            <FaFacebookF className={styles.icon_facebook} />
                        </a>

                    </div>
                    <div className={styles.email}>
                        <a href="mailto:whynotme1131999@gmail.com" target="_blank" rel="noreferrer"><GrMail className={styles.icon_email} /></a>

                    </div>
                    <div className={styles.contact}>
                        <FaPhoneAlt className={styles.icon_phone} />
                        <p>0339099040</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer
