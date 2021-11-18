import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import { IoMdSend } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';
import SockJsClient from 'react-stomp';
import { PublicContext } from '../../publicContexts/contexts';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import * as notifys from './../toast/toast';

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
        axios.post(`https://file-managementt.herokuapp.com/api/public/send/${numberRoom}`, { message: infoAccount?.username + " joined room", fullName: infoAccount?.username ? infoAccount?.username : "USER" })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
        axios.post(`https://file-managementt.herokuapp.com/api/public/send/${numberRoom}`, { message: typedMessage, fullName: infoAccount?.username ? infoAccount?.username : "USER" })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // hiển thị tin nhắn
    const displayMessages = (data) => {
        var result = null;
        result = data.map((msg, index) => {
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


        })

        return result;
    };
    const onChangeRoom = async () => {
        if (typedMessage !== "") {
            setNumberRoom(typedMessage);
            setTypedMessage("");
            axios.post(`https://file-managementt.herokuapp.com/api/public/send/${numberRoom}`, { message: infoAccount?.username + " left room", fullName: infoAccount?.username ? infoAccount?.username : "USER" })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
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
