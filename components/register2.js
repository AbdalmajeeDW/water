import Image from "next/image";
import React from "react";
import wat from "../assets/img/wat.png";
import wat1 from "../assets/img/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Input, InputAdornment, TextField } from "@mui/material";
import { PhoneFilled } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export default function register() {
  return (
    <div className="containerss">
      <div className="login">
        <Image src={wat} alt="test" height={600} />
        <div className="word1 active1">تسجيل </div>
        <div className="word">
          <Link href="/login.html"> تسجيل الدخول </Link>{" "}
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
          <Input
            required={true}
            placeholder="رقم الجوال الاحتياطي "
            startAdornment={
              <InputAdornment position="start">
                <FaLocationDot
                  style={{ marginLeft: "10px", fontSize: "25px" }}
                />
              </InputAdornment>
            }
          />{" "}
          <Input
            required={true}
            placeholder="الحي"
            startAdornment={
              <InputAdornment position="start">
                <FaLocationCrosshairs
                  style={{ marginLeft: "10px", fontSize: "25px" }}
                />
              </InputAdornment>
            }
          />{" "}
          <Input
            required={true}
            placeholder="صورة العمارة"
            startAdornment={
              <InputAdornment position="start">
                <FaImage style={{ marginLeft: "10px", fontSize: "25px" }} />
              </InputAdornment>
            }
          />{" "}
          <Input
            required={true}
            placeholder="صورة العمارة"
            startAdornment={
              <InputAdornment position="start">
                <FaImage style={{ marginLeft: "10px", fontSize: "25px" }} />
              </InputAdornment>
            }
          />{" "}
        </div>
        <div className="next" style={{ color: "gray" }}>
          <FaArrowLeft />
          <Link href="/register.html" style={{ color: "gray" }}>
            <FaArrowRight />
          </Link>
        </div>
        <span className="rout">
          لديك حساب؟ <Link href="/login.html"> تسجيل الدخول </Link>
        </span>
      </div>
    </div>
  );
}
