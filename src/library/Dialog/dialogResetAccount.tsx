import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import accountApi from '../../api/account/accountApi'
import * as notifys from '../toast/toast';
import { AiFillWarning } from 'react-icons/ai';
import { Account } from '../../page/account/utils/account.types';

interface Props {
    statusDialog: boolean,
    onStatusDialog: () => void,
    accountSelected: Account,
    onResetPassWord: (username: string) => void
}


const DialogResetAccount = ({ statusDialog, onStatusDialog, accountSelected, onResetPassWord }: Props) => {
    const onReset = async () => {
        await onResetPassWord(accountSelected.username);
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
