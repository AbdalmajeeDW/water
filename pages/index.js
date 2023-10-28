import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../assets/img/logo.png";
import car from "../assets/img/car.png";
import hand from "../assets/img/hand.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { PhoneFilled } from "@ant-design/icons";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { Button, Divider } from "antd";
import Link from "next/link";
export default function Home() {
  const router = useRouter();

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
        <div className="icon_menu">
          <AiOutlineMenu
            onClick={showMenu}
            style={{ position: "relative", zIndex: "99999" }}
          />
          <div className={`menu_${show && "show"}`}>
            <div className="content_menu">
              <Link href={"/"} style={{ color: "gray" }}>
                <FaHome style={{ marginTop: "20px" }} />
              </Link>
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

      <div className="text_body">
        "احصل على جودة عالية وراحة لا مثيل لها مع جوالين الماء القابلة للتنقل
        التي نقدمها على موقعنا"
        <Image
          src={hand}
          alt="test"
          width={100}
          height={100}
          style={{ position: "absolute", left: "31px", marginTop: "80px" }}
        />
      </div>
      <div className="car">
        <div>
          <div className="ord1">وش تنتظر ؟</div>
          <Link href={"/order"}>
            <div className="ord">اطلب الان</div>
          </Link>
        </div>
        <div className="img">
          <Image src={car} alt="test" width={250} height={250} />
        </div>
      </div>
      <Divider></Divider>
      <div className="support">
        <div className="sup_pport">

          <HiChatBubbleLeftRight />
          <PhoneFilled />
          الدعم الفني
        </div>
        <Link href={"/order"} style={{ marginLeft: "20px", color: "gray" }}>

          <BsFillArrowLeftCircleFill />
        </Link>
      </div>
    </main>
  );
}
