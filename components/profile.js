import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Button, Divider, Table } from "antd";
import Link from "next/link";
import { getOrderServices } from "@/api-services/add-order-services";
import { BiSolidLogOut } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
export default function order() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [userN, setUserN] = useState("");
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userName = localStorage.getItem("clientName");
    setUserN(userName);
  }, []);

  const showMenu = () => {
    setShow(!show);
  };

  const logOut = () => {
    localStorage.removeItem("token-client");
    localStorage.removeItem("id");
    localStorage.removeItem("clientName");
    router.push("/login");
  };

  const data1 = isLoading === false && products.map((product, key) => ({
    key: key,
    num: product.orderNo,
    total: product.total + " " + "ر.س",
    status: product.status,
    // pro: console.log(product)
  }));
  useEffect(() => {
    getOrderServices().then((e) => {
      setProducts(e.data);
      setIsLoading(false);

    });
    const token = localStorage.getItem("token-client");
    if (!token) {
      router.push("/login");
    }
  }, []);
  const columns = [
    {
      title: "رقم الطلب",
      dataIndex: "num",
    },
    
    {
      title: "الاجمالي",
      dataIndex: "total",
    },
    {
      title: "الحالة",
      dataIndex: "status",
    },
  ];
  return (
    <div style={{ height: "100vh" }}>
      <div className="home">
        <div className="logo">
          <Image src={wat1} alt="test" width={75} height={75} />
        </div>
        <div
        
        className="up-bar"
        
        onClick={logOut} style={{ fontSize: "20px", color: "gray" ,cursor:'pointer'}}>
          تسجيل الخروج{" "}
        </div>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "#3dc5cd" }}
          href={"/profile"}
        >
          الملف الشخصي
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray" }}
          href={"/order"}
        >
          الطلبات
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", marginRight: "25px" }}
          href={"/"}
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
              <Link href={"/"} style={{ color: "gray" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"profile"} style={{ color: "#3dc5cd" }}>
                الملف الشخصي <BsFillPersonFill style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"/order"} style={{ color: "gray" }}>
                الطلبات{" "}
                <MdOutlineProductionQuantityLimits
                  style={{ marginTop: "20px" }}
                />
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
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Divider className="divider" />
        <span className="userName">
          {userN} <BsFillPersonFill />
        </span>
      </div>
      <div className="now2">
        <span style={{ color: "gray", fontSize: "20px" }}>
          <span style={{ fontSize: "25px" }}>رصيدي الحالي</span> : 50 ريال
        </span>
        <span style={{ fontSize: "25px", color: "gray", marginTop: "40px" }}>
          طلباتي
        </span>
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
}
