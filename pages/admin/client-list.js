import { getUsers } from "@/api-services/register-services";
import { Button, Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import LanguageIcon from "@mui/icons-material/Language";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";

import Link from "next/link";
const clientList = () => {
  const [products, setProducts] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const showMenu = () => {
    setShow(!show);
  };
  const sendProp = (product) => {
    localStorage.setItem("id-client", product.id);
    localStorage.setItem("fullname-client",product.fullname);
    router.push("/admin/clientEdit" );
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
      <div
        className="home"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="icon_menu">
          <AiOutlineMenu
            onClick={showMenu}
            style={{ position: "relative", zIndex: "99999" }}
          />
          <div className={`menu_${show && "show"}`}>
            <div className="content_menu">
              <Link href={"/admin/controlAdmin"} style={{ color: "gray" }}>
                <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <LanguageIcon />

              <FaUsers style={{ marginTop: "20px", color: "#58abe9" }} />
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
      <Table
        style={{ direction: "rtl", padding: "10px" }}
        columns={columns}
        dataSource={data1}
        loading={isLoading}
        size="middle"
      />
    </div>
  );
};

export default clientList;
