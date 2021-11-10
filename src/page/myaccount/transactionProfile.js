import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { PublicContext } from '../../publicContexts/contexts';
import transactionApi from '../../api/transaction/transactionApi';
import { Spinner } from 'react-bootstrap';
const TransactionProfile = () => {
    const [data, setData] = useState([]);
    const { infoAccount } = useContext(PublicContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getTransactionByAccount = async () => {
            try {
                const params = {
                    nameAccount: infoAccount.username
                }
                const res = await transactionApi.getTransactionByAccount(params)
                setData(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getTransactionByAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const genData = () => {
        var result = null;
        if (data.length > 0) {
            result = data.map((item, index) => {
                return <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.contentTransaction}</td>
                    <td>{item?.money}</td>
                    <td>{item?.createDate}</td>
                    <td>{item?.nameType}</td>
                </tr>
            })
        }
        return result;
    }
    return (
        <div className={styles.wap_account}>
            {data.length > 0 ?
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nội dung giao dịch</th>
                            <th>Số tiền giao dịch</th>
                            <th>Thời gian giao dịch</th>
                            <th>Hình thức giao dịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genData()}
                    </tbody>
                </table>
                : <h5>Không có dữ liệu</h5>
            }
            {loading ? <Spinner animation="border" className={styles.loading} /> : null}
        </div>
    )
}

export default TransactionProfile
