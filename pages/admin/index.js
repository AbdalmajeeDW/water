import Image from "next/image";
import { useState } from "react";
import wat from "../../assets/img/wat.png";
import wat1 from "../../assets/img/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import { Input, message } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { postAdminLogin } from "@/api-services/login-admin-services";
export default function login() {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState({
        username: "",
        passWord: "",
    });
    const [authority, setAuthority] = useState('');
    const handlePhoneChange = (event) => {
        setPhoneNumber({
            username: event.target.value,
            password: "abo",
        });
    };
    const submit = () => {

        if (phoneNumber.username !== "") {
            postAdminLogin(phoneNumber).then((res) => {
                localStorage.setItem("token-admin", res.data.token);
                setAuthority(res.data.data.authority)
                router.push("admin/controlAdmin")

            }).then(()=>{}).catch(()=>{
                message.error("اسم الادمن غير صحيح")
            });
        }else{
            message.error("املا الحقل من فضلك")
        }

    };
    return (
        <div className="containerss">
            <div className="login">
                <Image src={wat} alt="test" height={600} />
     
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
                        تسجيل الدخول (ادمن)
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
                        prefix={<BsFillPersonFill
                            style={{
                                marginLeft: "10px",
                                fontSize: "25px",
                                color: "gray"
                            }}
                        />}
                        placeholder="أدخل الاسم"

                    />{" "}
                    <Button
                        onClick={submit}
                        style={{
                            background: "#4A5758",
                            color: "white",
                            borderRadius: "70px",
                            fontSize: "17px",
                            width: "150px",
                      
                        }}
                    >
                        تسجيل الدخول
                    </Button>

                </div>
            </div>
        </div>
    );
}
