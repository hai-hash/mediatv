import { Tooltip } from 'antd';
import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';

interface Props {
    onResetPassword?: () => any;
    onEdit?: () => any;
    onDelete?: () => any;
    onChangePassword?: () => any;
    onBlock?: () => any;
    onUnblock?: () => any;
    onDetailUser?: () => any;
    onDetail?: () => any;
    onShowProduct?: () => any;
    onAddCategory?: () => any;
    onAddSize?: () => any;
    onAdd?: () => any;
    onPrintBill?: () => any;
    onPrintExchange?: () => any;
}

const styles = {
    cursor: 'pointer',
    margin: '0 4px'
};
export default function BaseTableActions({
    onResetPassword,
    onChangePassword,
    onEdit,
    onDelete,
    onBlock,
    onUnblock,
    onDetailUser,
    onDetail,
    onShowProduct,
    onAddCategory,
    onAdd,
    onAddSize,
    onPrintBill,
    onPrintExchange
}: Props) {
    return (
        <div style={{ display: 'inline-block' }}>
            {onResetPassword && (
                <Tooltip placement="top" title={'shared.resetPassword'}>
                    <img
                        onClick={onResetPassword}
                        className="cursorPointer"
                        src="/images/icResetPassword.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onShowProduct && (
                <Tooltip placement="top" title={'detailUser'}>
                    <img
                        onClick={onShowProduct}
                        className="cursorPointer"
                        src="/images/icShowProduct.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}

            {onChangePassword && (
                <Tooltip placement="top" title={'changePassword'}>
                    <img
                        className="cursorPointer"
                        src="/images/icChangePassword.svg"
                        onClick={onChangePassword}
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onEdit && (
                <Tooltip placement="top" title={'edit'}>
                    <img
                        className="cursorPointer"
                        src="/images/icEdit.svg"
                        onClick={onEdit}
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onAdd && (
                <Tooltip placement="top" title={'shared.addNew'}>
                    <img
                        onClick={onAdd}
                        className="cursorPointer"
                        src="/images/icAdd.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onAddCategory && (
                <Tooltip placement="top" title={'addCategory'}>
                    <img
                        onClick={onAddCategory}
                        className="cursorPointer"
                        src="/images/icAdd.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onAddSize && (
                <Tooltip placement="top" title={'category.addSize'}>
                    <img
                        onClick={onAddSize}
                        className="cursorPointer"
                        src="/images/icAddSize.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onDelete && (
                <Tooltip placement="top" title={'delete'}>
                    <img
                        onClick={onDelete}
                        className="cursorPointer"
                        src="/images/icDelete.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}

            {onDetailUser && (
                <Tooltip placement="top" title={'detailUser'}>
                    <img
                        onClick={onDetailUser}
                        className="cursorPointer"
                        src="/images/icEye.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onBlock && (
                <Tooltip placement="top" title={'lockUser'}>
                    <img
                        onClick={onBlock}
                        className="cursorPointer"
                        src="/images/icBlock.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onUnblock && (
                <Tooltip placement="top" title={'unlockUser'}>
                    <img
                        onClick={onUnblock}
                        className="cursorPointer"
                        src="/images/icUnblock.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}
            {onDetail && (
                <Tooltip placement="top" title={'shared.viewDetail'}>
                    <img
                        onClick={onDetail}
                        className="cursorPointer"
                        src="/images/icEye.svg"
                        alt=""
                        style={styles}
                    />
                </Tooltip>
            )}

            {onPrintBill && (
                <Tooltip placement="top" title={'shared.printBill'}>
                    <PrinterOutlined
                        onClick={onPrintBill}
                        className="cursorPointer"
                        style={{ fontSize: 18, top: 3, position: 'relative', marginLeft: 2, color: '#24a514' }}
                    />
                </Tooltip>
            )}

            {onPrintExchange && (
                <Tooltip placement="top" title={'shared.printExchange'}>
                    <PrinterOutlined
                        onClick={onPrintExchange}
                        className="cursorPointer"
                        style={{ fontSize: 18, top: 3, position: 'relative', marginLeft: 5, color: 'red' }}
                    />
                </Tooltip>
            )}
        </div>
    );
}
