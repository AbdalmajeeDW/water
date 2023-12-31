import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { Button, Divider, Input, message } from "antd";
import { BsFillPersonFill } from "react-icons/bs";
import { postTransactions } from "@/api-services/transactions-services";
import { BiSolidLeftArrowCircle, BiSolidLogOut } from "react-icons/bi";
import Link from "next/link";
import { getTransactions } from "@/api-services/get-transactions-services";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaUsers } from "react-icons/fa";
const editOrder = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState(null);
  const [note, setNote] = useState(null);
  const [clients, setClients] = useState();
  const [load, setload] = useState(true);
  const [show, setShow] = useState(false);

  const {
    query: { numOrder, status, id, balance, name },
  } = router;
  const props = {
    numOrder,
    status,
    id,
    balance,
    name,
  };

  const selectedProduct = load === false && clients.map((product,i) => 
    product.client
    );

  console.log(selectedProduct,"ddd");

  const valTransactions = (e) => {
    setTransactions(e.target.value);
  };
  const valNote = (e) => {
    setNote(e.target.value);
  };
  const date = new Date().toISOString();

  const sendTransactions = () => {
    if (isNaN(transactions)) {
      message.error("من فضلك ادخل مبلغ ك رقم ");
    } else if (transactions === null) {
      message.error("املأ الحقل بل المبلغ من فضلك");
    } else {
      postTransactions({
        client: props.id,
        amount: transactions,
        addedBy: "1",
        date: date,
        note: note,
      }).then(()=>{
        message.success(`${props.name} تم اضافة  ${transactions} في حساب  `)
      });
      getTransactions().then((e) => {
        setClients(e.data);
        console.log(e.data);
        setload(false)
      });
      setTransactions(null);
      setNote(null);
    }
  };
  const showMenu = () => {
    setShow(!show);
  };
  const logOut = () => {
    localStorage.removeItem("token-admin");
    router.push("/admin");
  };
  return (
    <div>
      <div className="home">
        <div className="logo">
          <Image src={wat1} alt="test" width={75} height={75} />
        </div>
        <div
          onClick={logOut}
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", cursor: "pointer" }}
        >
          تسجيل الخروج{" "}
        </div>

        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: " #3dc5cd" }}
          href={"/admin/client-list"}
        >
          العملاء
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", marginRight: "25px" }}
          href={"/admin/controlAdmin"}
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
              <Link href={"/admin/controlAdmin"} style={{ color: "gray" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"/admin/client-list"} style={{ color: " #3dc5cd" }}>
                العملاء <FaUsers style={{ marginTop: "20px" }} />
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
      <div className="bodEdit">
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <BsFillPersonFill /> {props.name}
        </div>
        <div> رقم الطلب : {props.numOrder}</div>
        <div> حالة الطلب :{props.status} </div>
        <span>الرصيد الحالي : {props.balance} ر.س</span>
      </div>
      <div className="addMon">
        <Input
          rules={[
            {
              required: true,
            },
          ]}
          prefix="ر.س"
          onChange={(e) => valTransactions(e)}
          value={transactions}
          style={{
            marginTop: "20px",
            direction: "rtl",
            borderRadius: "70px",
            width: "70%",
            boxShadow: "1px 1px 3px 2px gray",
          }}
          placeholder="اضافة رصيد"
        />{" "}
        <Input.TextArea
          rules={[
            {
              required: true,
            },
          ]}
          onChange={(e) => valNote(e)}
          value={note}
          prefix="ر.س"
          style={{
            marginTop: "20px",
            direction: "rtl",
            borderRadius: "70px",
            width: "70%",
            boxShadow: "1px 1px 3px 2px gray",
            height: "17px",
          }}
          placeholder="اضافة ملاحظة"
        />{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <Button onClick={sendTransactions} style={{ marginTop: "35px" }}>
            اضافة
          </Button>
          <Link
            style={{ marginTop: "20px", color: "#71878b" }}
            href={"/admin/controlAdmin"}
          >
            <BiSolidLeftArrowCircle fontSize={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default editOrder;
