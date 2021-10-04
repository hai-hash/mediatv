import { useState } from 'react'
export default function MenuUtils() {
    const [menu] = useState(
        [
            {
                title: "Trang chủ",
                icon: "AiFillHome",
                element: [
                ]
            },
            {
                title: "Quản lý tài khoản",
                icon: "MdAccountCircle",
                element: [
                    {
                        title: "Tài khoản",
                        url: "/admin/account"
                    },
                ]
            },
            {
                title: "Quản lý phim",
                icon: "AiFillSwitcher",
                element: [
                    {
                        title: "Phim",
                        url: "/admin/film"
                    },
                    {
                        title: "Thể loại",
                        url: "/admin/category"
                    },
                    {
                        title: "Tập phim",
                        url: "/admin/episodes"
                    }
                ]
            },
            {
                title: "Quản lý bình luận",
                icon: "AiOutlineComment",
                element: [
                    {
                        title: "Bình Luận",
                        url: "/admin/comments"
                    },
                ]
            },
            {
                title: "Quản lý Lượt xem",
                icon: "AiFillEye",
                element: [
                    {
                        title: "Lượt xem",
                        url: "/admin/views"
                    },
                ]
            }
        ]
    );

    return {
        menu
    }

}

