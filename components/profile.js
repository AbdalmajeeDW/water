import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Button, Divider, Select } from "antd";

import Link from "next/link";
export default function order(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [userN, setUserN] = useState('');
  useEffect(() => {
    const userName = localStorage.getItem("clientName");
    setUserN(userName);
  }, []);

  const showMenu = () => {
    setShow(!show);
  };
  const showClose = () => {
    setHideText(!hideText);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
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
              <Link href={"/"} style={{ color: "gray" }}>
                <FaHome style={{ marginTop: "20px" }} />
              </Link>{" "}
              <LanguageIcon />
              <Link href={"profile"} style={{ color: "gray" }}>
                <BsFillPersonFill style={{ marginTop: "20px" }} />
              </Link>
            </div>
            <div className="text_menu">
              الطلبات متاحة من الساعة 12الظهر الى 6 المغرب بتوقيت السعودية
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
      <div className="title" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Divider
          className="divider"
        />
        <span className="userName">{userN}   <BsFillPersonFill /></span>
      </div>
      <div className="now2">
        <span style={{ color: "gray", fontSize: "20px" }}>
          <span style={{ fontSize: "25px" }}>رصيدي الحالي</span>  : 50 ريال
        </span>
        <span style={{ fontSize: "25px", color: "gray", marginTop: "40px" }}>
          طلباتي
        </span>
      </div>
    </div>
  );
}
