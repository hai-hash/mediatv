import React, { useRef, useEffect, useContext } from "react";
import accountApi from "../../api/account/accountApi";
import { PublicContext } from "../../publicContexts/contexts";
import * as toasts from './../toast/toast';
import transactionApi from "../../api/transaction/transactionApi";
export default function Paypal({ onPayment, month, moneyPayment }) {
    const paypal = useRef();
    const { infoAccount, setInfoAccount } = useContext(PublicContext);

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Nâng cấp tài khoản",
                                amount: {
                                    //CAD
                                    currency_code: "USD",
                                    value: moneyPayment,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    const username = infoAccount?.username ? infoAccount?.username : ""

                    if (order.status === "COMPLETED") {
                        const accountUpToVip = async () => {
                            try {
                                const res = await accountApi.upToVip(username, month);
                                setInfoAccount({ ...infoAccount, role: res?.role ? res?.role : "USER" });
                                const newUser = { ...infoAccount, role: res?.role ? res?.role : "USER" };
                                localStorage.setItem("user", JSON.stringify(newUser));
                                onPayment();
                                toasts.notifySuccess("nâng cấp tài khoản thành công");
                            } catch (error) {
                                console.log(error);
                                toasts.notifyError("nâng cấp tài khoản thất bại");
                            }
                        }
                        accountUpToVip();
                        const saveToHistoryTransaction = async () => {
                            try {
                                const data = {
                                    contentTransaction: "Nâng cấp tài khoản lên vip",
                                    money: moneyPayment * 23000,
                                }
                                const res = await transactionApi.createNewHistoryTransaction(data, username, "paypal");
                                console.log(res);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        saveToHistoryTransaction();
                    }

                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}




