import { Modal } from 'reactstrap';
import styles from './styles.module.scss';


export default function ModalComingSoonComponent({onCommingSoon,activeCommingSoon}) {
    
  
    return (
        <Modal isOpen={activeCommingSoon} toggle={onCommingSoon} className={styles.wrapperModalComingSoon}>
            <div className={styles.content}>
                <img className={styles.imgComing} src="/home/bgModalComing.png" alt="bgModalComingSoon"/>
            </div>
        </Modal>
    )
}