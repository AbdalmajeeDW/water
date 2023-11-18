import React from "react";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

export default function splash() {
  return (
    <div className="splash">
      <Image src={wat1} alt="test" />
   <Link href={"/admin"}><Button style={{marginTop:"80px",width:"260px"}}>ادمن</Button></Link> 
   <Link href={"/deliveryMan"}><Button style={{width:"260px"}}>مندوب</Button></Link> 
   <Link href={"/login"}><Button style={{width:"260px"}}>مستخدم</Button></Link> 
    </div>
  );
}
