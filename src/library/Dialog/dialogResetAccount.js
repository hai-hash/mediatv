import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import accountApi from '../../api/account/accountApi'
import * as notifys from './../../library/toast/toast';
import { AiFillWarning } from 'react-icons/ai';


const DialogResetAccount = ({ statusDialog, onStatusDialog, accountSelected }) => {
    const onReset = () => {
        const resetPassWord = async () => {
            try {
                const res = await accountApi.resetPassWord(accountSelected);
                console.log(res);
                notifys.notifySuccess("Reset mật khẩu thành công !");
                onStatusDialog();
            } catch (error) {
                console.log(error);
                notifys.notifyError("Gửi yêu cầu thất bại");
                onStatusDialog();
            }
        }
        resetPassWord();
    }
    return (
        <div>
            <Modal
                isOpen={statusDialog}
                // toggle={onStatusDialog}
                size="lg"
                style={{ maxWidth: '380px' }}
            >
                <ModalBody>
                    <AiFillWarning size={28} style={{ color: "#ff6565" }} />
                    Bạn có chắc chắn muốn Reset tài khoản !
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={onReset}
                    >
                        OK
                    </Button>
                    <Button
                        color="primary"
                        onClick={onStatusDialog}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DialogResetAccount
