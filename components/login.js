import Image from "next/image";
import { useState } from "react";
import wat from "../assets/img/wat.png";
import wat1 from "../assets/img/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import { Input, message } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { postLogin } from "@/api-services/login-services";
import { useRouter } from "next/navigation";
export default function login() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState({
    username: "",
    passWord: "",
  });

  const handlePhoneChange = (event) => {
    setPhoneNumber({
      username: event.target.value,
      password: "HuisnnsUuGfTy##%*",
    });
  };
  const submit = () => {
    if (phoneNumber.username !== "") {
      postLogin(phoneNumber).then((res) => {
        localStorage.setItem("token-client", res.data.token);
        localStorage.setItem("clientName", res.data.data.first_name);
        localStorage.setItem("id", res.data.data.id);

        router.push("/")

      }).catch((err) => {
        message.error('المستخدم غير موجود');
      });;
    } else {
      message.error("من فضلك املأ الحقل")
    }

  };
  return (
    <div className="containerss">
      <div className="login">
        <Image src={wat} alt="test" height={600} />
        <div className="word1 ">
          <Link href="/register"> تسجيل </Link>{" "}
        </div>
        <div className="word active">تسجيل الدخول</div>
      </div>
      <div className="sectionTwo">
        <div className="icon">
          <LanguageIcon />
        </div>
        <div className="image">
          <Image src={wat1} alt="test" />
          <span className="" style={{ color: "#1D4760" }}>
            {" "}
            تسجيل الدخول (عميل)
 
          </span>
          <Input
            rules={[
              {
                required: true,
              },
            ]}
            value={phoneNumber.username}
            onChange={(e) => handlePhoneChange(e)}
            style={{
           
              direction: "rtl",
              borderRadius: "70px",
              width: "70%"
            }}
            prefix={<PhoneFilled
              style={{
                marginLeft: "10px",
                fontSize: "25px",
                color: "gray"
              }}
            />}
            placeholder="أدخل رقم الجوال"

          />{" "}
          <Button
            onClick={submit}
            type="primary"
            htmlType="submit"
            style={{
              background: "#4A5758",
              color: "white",
              borderRadius: "70px",
              fontSize: "18px",
              width: "150px",
       
            }}
          >
            تسجيل الدخول
          </Button>
          <span className="rout">
            <Link href="/register">   تسجيل  </Link> ليس لديك حساب؟
          </span>
        </div>
      </div>
    </div>
  );
}
