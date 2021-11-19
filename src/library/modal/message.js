import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import { IoMdSend } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';
import SockJsClient from 'react-stomp';
import { PublicContext } from '../../publicContexts/contexts';
import Picker from 'emoji-picker-react';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import * as notifys from './../toast/toast';
import messageApi from '../../api/message/messageApi';

const SOCKET_URL = 'https://file-managementt.herokuapp.com/api/public/ws-message';
const Message = ({ activeMessage, activeNotify }) => {
    const [typedMessage, setTypedMessage] = useState("");
    const [messages, setMessages] = useState({ fullName: "", message: "" });
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [numberRoom, setNumberRoom] = useState("Chung");
    const { infoAccount } = useContext(PublicContext);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [activeEmoji, setActiveEmoji] = useState(false);
    const [anonymous] = useState(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5));


    // lưu thay đổi data khi thêm tin nhắn mới
    useEffect(() => {
        if (messages?.message && messages?.fullName) {
            var newdata = data;
            newdata.push(messages);
            console.log(newdata);
            setData(newdata);
            var scroll = document.getElementById('scroll');
            scroll.scrollTop = scroll.scrollHeight;
            scroll.animate({ scrollTop: scroll.scrollHeight });
            if (activeNotify) {
                notifys.notifySuccess("bạn có tin nhắn mới từ nhóm " + numberRoom);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])



    useEffect(() => {
        const sendMessage = async () => {
            try {
                const data = {
                    message: infoAccount?.username ? infoAccount?.username : anonymous + " joined room",
                    fullName: infoAccount?.username ? infoAccount?.username : anonymous
                }
                const res = await messageApi.send(data, numberRoom);
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        sendMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberRoom])

    useEffect(() => {
        if (chosenEmoji) {
            let newContent = typedMessage + chosenEmoji?.emoji;
            setTypedMessage(newContent);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenEmoji])

    // kết nối
    let onConnected = () => {
        console.log("Connected!!")
    }

    // nhận tin nhắn từ server
    let onMessageReceived = (msg) => {
        setMessages(msg);
        setCount(count + 1);
    }

    const onSender = () => {
        setTypedMessage("");
        const sendMessage = async () => {
            try {
                const data = {
                    message: typedMessage,
                    fullName: infoAccount?.username ? infoAccount?.username : anonymous
                }
                const res = await messageApi.send(data, numberRoom);
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }
        sendMessage();
    }

    // hiển thị tin nhắn
    const displayMessages = (data) => {
        var result = null;
        result = data.map((msg, index) => {
            if (infoAccount?.username) {
                if (msg?.fullName !== infoAccount?.username) {
                    return (<li className={styles.message_other_user} key={index}>
                        <span>{msg?.fullName.slice(0, 1)}</span>
                        <p>{msg?.message}</p>
                    </li>
                    )
                }
                else {
                    return (
                        <li className={styles.message_mySelf} key={index}>
                            <p>{msg?.message}</p>
                        </li>
                    )
                }
            }
            else {
                if (msg?.fullName !== anonymous) {
                    return (<li className={styles.message_other_user} key={index}>
                        <span>{msg?.fullName.slice(0, 1)}</span>
                        <p>{msg?.message}</p>
                    </li>
                    )
                }
                else {
                    return (
                        <li className={styles.message_mySelf} key={index}>
                            <p>{msg?.message}</p>
                        </li>
                    )
                }
            }


        })

        return result;
    };
    const onChangeRoom = async () => {
        if (typedMessage !== "") {
            setNumberRoom(typedMessage);
            setTypedMessage("");
            const sendMessage = async () => {
                try {
                    const data = {
                        message: infoAccount?.username ? infoAccount?.username : anonymous + " left room",
                        fullName: infoAccount?.username ? infoAccount?.username : anonymous
                    }
                    const res = await messageApi.send(data, numberRoom);
                    console.log(res);
                } catch (error) {
                    console.log(error)
                }
            }
            sendMessage();
        }
        else {
            notifys.notifyWarning("Bạn phải nhập tên phòng trước khi đổi !.");
        }
    }

    const onActiveEmoji = () => {
        setActiveEmoji(!activeEmoji);
    }
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
    return (
        <div className={`${activeMessage ? styles.activeMessage : null} ${styles.content_message}`}>
            <div className={styles.numberRoom}> Phòng Chat {numberRoom}</div>
            <ul id="scroll">
                {displayMessages(data)}

            </ul>
            <input type="text" name="contentMessage" className={styles.contentMessage} placeholder="Aa" required value={typedMessage} onChange={event => setTypedMessage(event.target.value)} />
            <IoMdSend className={styles.icon_send} onClick={onSender} />
            <FaExchangeAlt className={styles.change_room} onClick={onChangeRoom} />
            <MdOutlineInsertEmoticon className={styles.icon_emoji} onClick={onActiveEmoji} />
            <div className={`${styles.emoji} ${activeEmoji ? styles.active_emoji : null}`}>
                <Picker onEmojiClick={onEmojiClick} />
            </div>
            <SockJsClient
                url={SOCKET_URL}
                topics={[`/topic/message/${numberRoom}`]}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={(msg) => onMessageReceived(msg)}
                debug={false}
            />
        </div>
    )
}

export default Message
