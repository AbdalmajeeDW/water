import Image from "next/image";
import React, { useState } from "react";
import wat from "../assets/img/wat.png";
import wat1 from "../assets/img/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import Link from "next/link";
import { PhoneFilled } from "@ant-design/icons";
import { message, Button, Form, Input, Space } from "antd";
import { postRegister } from "@/api-services/register-services";
import { useRouter } from "next/navigation";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { BiSolidEditLocation } from "react-icons/bi";

export default function register() {
  const router = useRouter();


  const [form] = Form.useForm();
  const onFinish = (val) => {
    val.password = "HuisnnsUuGfTy##%*";
    val.phone = val.username
    postRegister(val).then((res) => {
      localStorage.setItem("token", res.data.token);
      message.success("تمت العملية بنجاح");

      router.push("/login");
    }).catch((err) => {
      message.error(err.response.data.username[0]);
    });
  };

  return (
    <div className="containerss">
      <div className="login">
        <Image src={wat} alt="test" height={600} />
        <div className="word1 active1">تسجيل </div>
        <div className="word">
          <Link href="/login"> تسجيل الدخول </Link>{" "}
        </div>
      </div>
      <div className="sectionTwo">
        <div className="icon">
          <LanguageIcon />
        </div>
        <div className="image">
          <Image src={wat1} alt="test" width={150} height={150} />
          <span className="state" style={{ color: "#1D4760" }}>
            {" "}
            تسجيل
          </span>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="رقم الجوال"
                style={{ borderRadius: "50px" }}
                prefix={<BsFillPersonFill style={{ color: "gray" }} />}
              />
            </Form.Item>
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="الاسم الأول"
                style={{ borderRadius: "50px" }}
                prefix={<BsFillPersonFill style={{ color: "gray" }} />}
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="الاسم الأخير"
                style={{ borderRadius: "50px" }}
                prefix={<BsFillPersonFill style={{ color: "gray" }} />}
              />
            </Form.Item>
            <Form.Item
              style={{ direction: "ltr" }}
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                placeholder="كلمة المرور"
                style={{ borderRadius: "50px", direction: "ltr" }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              style={{ display: "none" }}
            >
              <Input
                placeholder="رقم الجوال الاحتياطي"
                style={{ borderRadius: "50px" }}
                prefix={<BiSolidEditLocation style={{ color: "gray" }} />}
              />
            </Form.Item>
            <Form.Item
              name="locationLat"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="خط الطول"
                style={{ borderRadius: "50px" }}
                prefix={<BiSolidEditLocation style={{ color: "gray" }} />}
              />
            </Form.Item>
            <Form.Item
              name="locationLong"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="خط العرض"
                style={{ borderRadius: "50px" }}
                prefix={<PhoneFilled style={{ color: "gray" }} />}
              />
            </Form.Item>
            <Form.Item
              name="district"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="الحي"
                style={{ borderRadius: "50px" }}
                prefix={<BiCurrentLocation style={{ color: "gray" }} />}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  style={{
                    marginTop: "1px !important",
                    background: "#4A5758",
                    color: "white",
                    borderRadius: "70px",
                    fontSize: "18px",
                    width: "150px",



                  }}
                >
                  تسجيل
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        <span className="rout">
          لديك حساب؟ <Link href="/login"> تسجيل الدخول </Link>
        </span>
      </div>
    </div>
  );
}
