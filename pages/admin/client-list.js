import { getUsers } from "@/api-services/register-services";
import { Button, Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiEdit, BiSolidLogOut } from "react-icons/bi";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import LanguageIcon from "@mui/icons-material/Language";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

import Link from "next/link";
const clientList = () => {
  const [products, setProducts] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isWebDevice = useMediaQuery("(max-width:580px)");

  const showMenu = () => {
    setShow(!show);
  };
  const sendProp = (product) => {
    localStorage.setItem("id-client", product.id);
    localStorage.setItem("fullname-client", product.fullname);
    router.push("/admin/clientEdit");
  };
  const logOut = () => {
    localStorage.removeItem("token-admin");
    router.push("/admin");
  };
  const data1 =
    isLoading === false &&
    products.map((product, key) => ({
      key: key,
      userName: product.username,
      phone1: product.phone,
      blance: product.balance,
      action: (
        <a
          onClick={() => {
            sendProp(product);
          }}
        >
          <BiEdit style={{ cursor: "pointer" }} />
        </a>
      ),
    }));

  useEffect(() => {
    getUsers().then((e) => {
      setProducts(e.data);
      setIsLoading(false);
    });
  }, []);
  const columnsMobile = [
    {
      title: "اسم العميل",
      dataIndex: "userName",
    },
    {
      title: "الرصيد",
      dataIndex: "blance",
    },

    {
      title: "العمليات",
      dataIndex: "action",
    },
  ];
  const columns = [
    {
      title: "اسم العميل",
      dataIndex: "userName",
    },
    {
      title: "الرصيد",
      dataIndex: "blance",
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone1",
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
          style={{ fontSize: "20px", color: " #3dc5cd" }}
          href={"/admin/client-list"}
        >
          العملاء
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", marginRight: "25px" }}
          href={"/admin/controlAdmin"}
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
              <Link href={"/admin/controlAdmin"} style={{ color: "gray" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"/admin/client-list"} style={{ color: " #3dc5cd" }}>
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
        style={{ direction: "rtl", padding: "10px" }}
        columns={isWebDevice === true ? columnsMobile : columns}
        dataSource={data1}
        loading={isLoading}
        size="middle"
      />
    </div>
  );
};

export default clientList;
