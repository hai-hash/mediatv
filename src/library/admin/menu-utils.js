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
            },
            {
                title: "Quản lý đánh giá",
                icon: "AiFillEye",
                element: [
                    {
                        title: "Đánh giá",
                        url: "/admin/evaluates"
                    },
                ]
            },
            {
                title: "Quản lý quốc gia",
                icon: "AiFillEye",
                element: [
                    {
                        title: "Quốc gia",
                        url: "/admin/countrys"
                    },
                ]
            },
            {
                title: "Quản lý giao dịch",
                icon: "AiFillEye",
                element: [
                    {
                        title: "Giao dịch",
                        url: "/admin/transaction"
                    },
                    {
                        title: "Hình thức giao dịch",
                        url: "/admin/type/transaction"
                    },
                ]
            }
        ]
    );

    return {
        menu
    }

}

