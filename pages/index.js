import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../assets/img/logo.png";
import car from "../assets/img/car.png";
import hand from "../assets/img/hand.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { PhoneFilled } from "@ant-design/icons";
import { Card } from "antd";
import { BiSolidLogOut } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
const { Meta } = Card;

import { Button, Divider } from "antd";
import Link from "next/link";
import { getProducts } from "@/api-services/products-services";
export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([{}]);
  const [productsC, setProductsC] = useState([{}]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getProducts().then((res) => {
      setLoad(true);
      setProducts(res.data);
      setProductsC(res.data);
    });
  }, [""]);
  const [show, setShow] = useState(false);
  const showMenu = () => {
    setShow(!show);
  };
  const logOut = () => {
    localStorage.removeItem("token-client");
    localStorage.removeItem("id");
    localStorage.removeItem("clientName");

    router.push("/login");
  };
  return (
    <main>
      <div className="home">
        <div className="logo">
          <Image src={wat1} alt="test" width={75} height={75} />
        </div>
        <div onClick={logOut} 
          className="up-bar"
        
        
        style={{ fontSize: "20px", color: "gray" ,cursor:'pointer'}}>
          تسجيل الخروج{" "}
        </div>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray" }}
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
          style={{ fontSize: "20px", color: "#3dc5cd", marginRight: "25px" }}
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
              <Link href={"/"} style={{ color: "#3dc5cd" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"profile"} style={{ color: "gray" }}>
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

      <div className="text_body">
        "احصل على جودة عالية وراحة لا مثيل لها مع جوالين الماء القابلة للتنقل
        التي نقدمها على موقعنا"
      </div>
      {/* <div className="product">
        {load &&
          products.map((e) => (
            <Card
              hoverable
              style={{
                width: 240,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              cover={<Image alt="test" src={e.image} width={50} height={50} />}
            >
              <Meta title={e.name} description={e.price} />
            </Card>
          ))}
      </div> */}

      <div className="car">
        <div>
          <div className="ord1">وش تنتظر ؟</div>
          <Link href={"/order"} className="ord">

            اطلب الان
          </Link>
        </div>
        <div className="img">
          <Image src={car} alt="test" width={250} height={250} />
        </div>
      </div> 
       <Divider></Divider>
       <footer>

      <div className="support">
        <div className="sup_pport">
          <PhoneFilled />
          الدعم الفني
        </div>

      </div>
       </footer>
    </main>
  );
}
