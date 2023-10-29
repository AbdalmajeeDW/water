import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { getOrders } from "@/api-services/orders-services";
import { Table, Divider } from 'antd';
import { BiEdit } from "react-icons/bi";
import EditOrder from "./editOrder";
export default function MapComponent() {
    const router = useRouter();
    const [products, setProducts] = useState([{}]);
    const [selectedProducts, setSelectedProducts] = useState([{}]);

    const ds = (product) => {
        setSelectedProducts(product)
        // router.push(`/editOrder/`)
    }

    const sendObject = (product) => {
        setSelectedProducts(product)
        // router.push("/editOrder")
    }

    const data1 = products.map((product) => ({
        key: product.orderNo,
        num: product.orderNo,
        total: product.total,
        status: product.status,
        action: <BiEdit style={{ cursor: "pointer" }} onClick={() => {
            ds(product)
        }} />
    }));
    useEffect(() => {
        getOrders().then((e) => {
            setProducts(e.data)
        })
        const token = localStorage.getItem("token-deliveryMan");
        if (!token) {
            router.push("/deliveryMan");
        }
    }, []);

    const columns = [
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
                <div style={{ fontSize: "25px", marginTop: "20px", display: "flex", alignItems: "center", flexDirection: "column", color: "gray" }}>الطلبات
                    <Divider style={{ width: "110px !important", minWidth: "0px" }} />

                </div>
                <div className="logo">
                    <Image src={wat1} alt="test" width={125} height={125} />
                </div>
            </div>
            <Table style={{ direction: "rtl", padding: "10px" }} columns={columns} dataSource={data1} size="middle" />

        </div>
    );
}