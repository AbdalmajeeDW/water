import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { getOrders } from "@/api-services/orders-services";
import { Table, Divider, Button } from "antd";
import { BiEdit, BiSolidLogOut } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import LanguageIcon from "@mui/icons-material/Language";
import { CiLogout } from "react-icons/ci";

import useMediaQuery from "@mui/material/useMediaQuery";
export default function MapComponent() {
  const router = useRouter();
  const [products, setProducts] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showMenu = () => {
    setShow(!show);
  };

  const logOut = () => {
    localStorage.removeItem("token-admin");
    router.push("/admin");
  };

  const ds = (product) => {
    const numOrder = product.orderNo;
    const status = product.status;
    const id = product.client.id;
    const balance = product.client.balance;
    const name = product.client.fullname;
    router.push({
      pathname: "/admin/editOrder",
      query: {
        numOrder,
        status,
        id,
        balance,
        name,
      },
    });
  };
  const isWebDevice = useMediaQuery("(max-width:580px)");
  console.log(isWebDevice);
  const data1 =
    isLoading === false &&
    products.map((product) => ({
      key: product.orderNo,
      num: product.orderNo,
      userName: product.client.username,
      total: product.total,
      status: product.status,
      blance: product.client.balance,
      action: (
        <a
          onClick={() => {
            ds(product);
          }}
        >
          <BiEdit style={{ cursor: "pointer" }} />
        </a>
      ),
    }));
  useEffect(() => {
    getOrders().then((e) => {
      setIsLoading(false);
      setProducts(e.data);

      console.log(e.data);
    });
    const token = localStorage.getItem("token-admin");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  const columns = [
    {
      title: "اسم العميل",
      dataIndex: "userName",
    },
    {
      title: "رقم الطلب",
      dataIndex: "num",
    },
    {
      title: "الاجمالي",
      dataIndex: "total",
    },
    {
      title: "الرصيد",
      dataIndex: "blance",
    },
    {
      title: "الحالة",
      dataIndex: "status",
    },
    {
      title: "العمليات",
      dataIndex: "action",
    },
  ];
  const columnsMobile = [
    {
      title: "اسم العميل",
      dataIndex: "userName",
    },

    {
      title: "الاجمالي",
      dataIndex: "total",
    },

    {
      title: "العمليات",
      dataIndex: "action",
    },
  ];
  return (
    <div>
      <div className="home">
        <div className="logo">
          <Image src={wat1} alt="test" width={75} height={75} />
        </div>
        <div
          onClick={logOut}
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", cursor: "pointer" }}
        >
          تسجيل الخروج{" "}
        </div>

        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray" }}
          href={"/admin/client-list"}
        >
          العملاء
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "#3dc5cd", marginRight: "25px" }}
          href={"/controlAdmin"}
        >
          الرئيسية{" "}
        </Link>

        <div className="icon_menu">
          <AiOutlineMenu
            onClick={showMenu}
            style={{ position: "relative", zIndex: "99999" }}
          />
          <div className={`menu_${show && "show"}`}>
            <div className="content_menu">
              <Link href={"/controlAdmin"} style={{ color: "#3dc5cd" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"/admin/client-list"} style={{ color: "gray" }}>
                العملاء <FaUsers style={{ marginTop: "20px" }} />
              </Link>

              <div onClick={logOut}>
                تسجيل الخروج{" "}
                <BiSolidLogOut
                  style={{
                    fontSize: "17px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => console.log(event), // click row
          };
        }}
        onChange={(e) => console.log(e)}
        style={{ direction: "rtl", padding: "10px" }}
        columns={isWebDevice === true ? columnsMobile : columns}
        dataSource={data1}
        loading={isLoading}
        size="middle"
      />
    </div>
  );
}
