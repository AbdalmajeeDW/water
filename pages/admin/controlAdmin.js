import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { getOrders } from "@/api-services/orders-services";
import { Table, Divider, Button } from 'antd';
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";;
import LanguageIcon from "@mui/icons-material/Language";
import { CiLogout } from "react-icons/ci";


export default function MapComponent() {
    const router = useRouter();
    const [products, setProducts] = useState([{}]);

    const [show, setShow] = useState(false);
    const showMenu = () => {
        setShow(!show);
    };
    const logOut = () => {
        localStorage.removeItem("token-admin");
        router.push("/admin");
    };
    const ds = (product) => {
        const numOrder = product.orderNo
        const status = product.status
        router.push({
            pathname: '/admin/editOrder',
            query: {
                numOrder,
                status
            }
        })

    }
    const data1 = products.map((product) => ({
        key: product.orderNo,
        num: product.orderNo,
        total: product.total,
        status: product.status,
        action: <a onClick={() => {
            ds(product)
        }}>
            <BiEdit style={{ cursor: "pointer" }} />
        </a>
    }));
    useEffect(() => {
        getOrders().then((e) => {
            setProducts(e.data)
            console.log(e.data);
        })
        const token = localStorage.getItem("token-admin");
        if (!token) {
            router.push("/admin");
        }
    }, []);

    const columns = [
        {
            title: 'اسم العميل',
            dataIndex: 'userName',
        },
        {
            title: 'رقم الطلب',
            dataIndex: 'num',
        },
        {
            title: 'الاجمالي',
            dataIndex: 'total',
        },
        {
            title: 'الحالة',
            dataIndex: 'status',
        },
        {
            title: 'العمليات',
            dataIndex: 'action',
        },
    ];

    return (
        <div>
            <div className="home" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>


                <div className="icon_menu">
                    <AiOutlineMenu
                        onClick={showMenu}
                        style={{ position: "relative", zIndex: "99999" }}
                    />
                    <div className={`menu_${show && "show"}`}>
                        <div className="content_menu">

                            <FaHome style={{ marginTop: "20px", color: "#58abe9" }} />

                            <LanguageIcon />
                            <Link href={"/admin/client-list"} style={{ color: "gray" }}>
                                <FaUsers style={{ marginTop: "20px" }} />
                            </Link>
                        </div>

                        <Button onClick={logOut} style={{ marginTop: "20px" }}>
                            <CiLogout
                                style={{
                                    fontSize: "17px",
                                }}
                            />
                            تسجيل الخروج
                        </Button>
                    </div>
                </div>


                <div className="logo">
                    <Image src={wat1} alt="test" width={125} height={125} />
                </div>
            </div>

            <Table style={{ direction: "rtl", padding: "10px" }} columns={columns} dataSource={data1} size="middle" />

        </div>
    );
}