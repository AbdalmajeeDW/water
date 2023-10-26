import LanguageIcon from "@mui/icons-material/Language";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

import { Button, Divider, Select, message } from "antd";
import Link from "next/link";
import { getProducts } from "@/api-services/products-services";
export default function order() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [countGal, setCountGal] = useState(0);
  const [countCar, setCountCar] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [products, setProducts] = useState([{}]);
  const [productsC, setProductsC] = useState([{}]);
  const [selectedValue, setSelectedValue] = useState(null);

  const filteredProducts = products.filter((product) => product.category !== "C");
  const filteredProductsC = productsC.filter((product) => product.category !== "G");


  function handleSelect(value) {
    setSelectedValue(value);
    setCountGal(0);
    setCountCar(0);
    const selectedProduct = products.find((product) => product.id === value);
    if (selectedProduct) {
      setTotalP(0);
    }
  }
  const optionsP = filteredProducts.map((product) => ({
    value: product.id,
    label: product.name,
    thumbnail: product.image
  }));
  const optionsC = filteredProductsC.map((product) => ({
    value: product.id,
    label: product.name,
    thumbnail: product.image

  }));
  const text = (event) => {
    console.log(event, "id");
  }
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data)
      setProductsC(res.data)
    }).catch((e) => {
      message.error("لايوجد منتجات")
    })
  }, [''])

  const blusGal = () => {
    if (selectedValue === null) {
      message.error("اختر نوع الغالون أولا");
    } else {
      const increment = 1;
      setCountGal(countGal + increment);
      const filtered = products.filter((product) => product.id === selectedValue);

      const incrementTotal = increment * filtered[0].price;

      setTotalP(totalP + incrementTotal);
    }

  };
  const minGal = () => {
    if (countGal > 0) {
      // حساب الانقاص في العدد
      const decrement = 1;
      setCountGal(countGal - decrement);

      // حساب الانقاص في الإجمالي بناءً على فرق القيمة الجديدة والقديمة
      const filtered = products.filter((product) => product.id === selectedValue);
      const decrementTotal = decrement * filtered[0].price;
      setTotalP(totalP - decrementTotal);
    }

  };
  const minCar = () => {
    if (countCar > 0) {
      // حساب الانقاص في العدد
      const decrement = 1;
      setCountCar(countCar - decrement);

      // حساب الانقاص في الإجمالي بناءً على فرق القيمة الجديدة والقديمة
      const filtered = productsC.filter((product) => product.id === selectedValue);
      const decrementTotal = decrement * filtered[0].price;
      setTotalP(totalP - decrementTotal);
    }

  };
  const blusCar = () => {
    if (selectedValue === null) {
      message.error("اختر نوع الكرتون أولا");
    } else {
      // حساب الزيادة في العدد
      const increment = 1;
      setCountCar(countCar + increment);

      // حساب الزيادة في الإجمالي بناءً على فرق القيمة الجديدة والقديمة
      const filtered = productsC.filter((product) => product.id === selectedValue);
      const incrementTotal = increment * filtered[0].price;
      setTotalP(totalP + incrementTotal);
    }

  };

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
    <div>
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
      <div className="title">
        <div style={{ fontSize: "25px", marginTop: "20px", display: "flex", alignItems: "center", flexDirection: "column" }}>الطلبات
          <Divider style={{ width: "110px !important", minWidth: "0px" }} />
        </div>
      </div>
      <div className="content_order">
        <span className="close">
          <AiOutlineClose
            className={`${hideText && "hide"}`}
            onClick={showClose}
            style={{ cursor: "pointer" }}
          />
          <div className={`${hideText && "hide"}`}>
            الطلب مفتوح من 12 الظهر الى -6 المغرب
          </div>
        </span>
        <div className="input_order">
          <div className="input_gal">
            <Select
              showSearch
              onChange={handleSelect}
              onSelect={handleSelect}
              placeholder="نوع الغالون"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }

              options={optionsP}
            />
            <div className="con_count">
              <div className="countGal" onClick={blusGal}>
                +
              </div>
              {countGal}
              <div className="countGal" onClick={minGal}>
                -
              </div>
            </div>
          </div>
          <div className="input_gal">
            <Select
              showSearch
              placeholder="نوع الكرتون"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={optionsC}
            />
            <div className="con_count">
              <div className="countGal" onClick={blusCar}>
                +
              </div>
              {countCar}
              <div className="countGal" onClick={minCar}>
                -
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="limit">
        <span style={{ color: "gray" }}>*اقل عدد للطلب ٥ كراتين*</span>
      </div>
      <div className="now">
        <span style={{ color: "gray", fontSize: "20px" }}>
          المبلغ الأجمالي : {totalP} ريال
        </span>
        <Button style={{ marginTop: "20px" }}>اطلب</Button>
      </div>
    </div>
  );
}