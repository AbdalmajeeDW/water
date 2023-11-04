import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { FaUsers } from "react-icons/fa";
import { Button, Divider,  Table } from "antd";
import Link from "next/link";
import { getOrderByAdminServices } from "@/api-services/get-orders-by-admin-services";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

export default function clientEdit() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const showMenu = () => {
    setShow(!show);
  };
  
  console.log(products);

  const logOut = () => {
    localStorage.removeItem("token-admin");
    router.push("/admin");
  };

  const data1 =
    isLoading === false &&
    products.map((product, key) => ({
      key: key,
      num: product.orderNo,
      total: product.total + " " + "ر.س",
      status: product.status,
      // pro: !product.items ? null: product.items[0].product__name ,
    }));

    useEffect(() => {
      let s = localStorage.getItem("id-client");
      const namec = localStorage.getItem("fullname-client");

    getOrderByAdminServices(s).then((e) => {
      setIsLoading(false);
      setProducts(e.data);
      console.log(e.data);
      setName(namec
        );
    });
  }, []);
  const columns = [
    {
      title: "رقم الطلب",
      dataIndex: "num",
    },
    // {
    //   title: "المنتج",
    //   dataIndex: "pro",
    // },
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
       {name} <BsFillPersonFill />
        </span>
      </div>
      <div className="now2">
    
        <span style={{ fontSize: "25px", color: "gray", marginTop: "40px" }}>
        <Link
            style={{ marginTop: "20px", color: "#71878b" }}
            href={"/admin/client-list"}
          >
            <BiSolidLeftArrowCircle fontSize={20} />
          </Link> {name}  :  طلبات   
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
