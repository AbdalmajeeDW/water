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
import { Modal, Space } from "antd";
import { Button, Divider, Select, message } from "antd";
import Link from "next/link";
import { getProducts } from "@/api-services/products-services";
import { addOrderServices } from "@/api-services/add-order-services";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
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
  const [selectedValueC, setSelectedValueC] = useState(null);
  const [nameprod, setNameprod] = useState(null);
  const [nameprodC, setNameprodC] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = products.filter(
    (product) => product.category !== "C"
  );
  const filteredProductsC = productsC.filter(
    (product) => product.category !== "G"
  );

  const info = (
    details,
    productone,
    producttwo,
    productonePrice,
    producttwoPrice,
    productoneImage,
    producttwoImage
  ) => {
    console.log(productoneImage,producttwoImage);
    Modal.success({
      direction: "ltr",
      okText: "تم",
      title: details,

      content: (
        <div style={{ direction: "rtl" }}>
          <Divider className="divider" />

          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {" "}
            {
          productoneImage === null ? "لاتوجد صورة للمنتج": <Image src={productoneImage} width={50} height={50} alt="لاتوجد صورة"/>
        } {productone} عدد {countGal}سعر الغالون الواحد {productonePrice} ر.س   
          </div>
          <Divider className="divider" />

          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {
          producttwoImage === null ? "لاتوجد صورة للمنتج": <Image  src={producttwoImage} width={50} height={50} alt="لاتوجد صورة"/>
        } {producttwo} عدد {countCar} سعر الكرتونة الواحدة {producttwoPrice}{" "}
            ر.س 
          </div>
          <Divider className="divider" />
          <p style={{ textAlign: "center" }}>المبلغ الاجمالي {totalP} ر.س</p>
        </div>
      ),
    });
  };

  function handleSelect(value) {
    setSelectedValue(value);
    setCountGal(0);
    const selectedProduct = products.find((product) => product.id === value);
    setNameprod(selectedProduct.name);
    if (selectedProduct) {
      setTotalP(0);
    }
  }
  function handleSelectC(value) {
    setSelectedValueC(value);
    setCountCar(0);
    const selectedProduct = products.find((product) => product.id === value);
    setNameprodC(selectedProduct.name);
    if (selectedProduct) {
      setTotalP(0);
    }
  }
  const optionsP = filteredProducts.map((product) => ({
    value: product.id,
    label: product.name,
    thumbnail: product.image,
  }));
  const optionsC = filteredProductsC.map((product) => ({
    value: product.id,
    label: product.name,
    thumbnail: product.image,
  }));

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setProductsC(res.data);
      })
      .catch((e) => {
        const token = localStorage.getItem("token-client");
        if (!token) {
          router.push("/login");
        } else message.error("لايوجد منتجات");
      });
  }, [""]);

  const blusGal = () => {
    if (selectedValue === null) {
      message.error("اختر نوع الغالون أولا");
    } else {
      const increment = 1;
      setCountGal(countGal + increment);
      const filtered = products.filter(
        (product) => product.id === selectedValue
      );
      const incrementTotal = increment * filtered[0].price;
      setTotalP(totalP + incrementTotal);
    }
  };
  const minGal = () => {
    if (countGal > 0) {
      const decrement = 1;
      setCountGal(countGal - decrement);
      const filtered = products.filter(
        (product) => product.id === selectedValue
      );
      const decrementTotal = decrement * filtered[0].price;
      setTotalP(totalP - decrementTotal);
    }
  };
  const minCar = () => {
    if (countCar > 0) {
      const decrement = 1;
      setCountCar(countCar - decrement);
      const filtered = productsC.filter(
        (product) => product.id === selectedValue
      );
      const decrementTotal = decrement * filtered[0].price;
      setTotalP(totalP - decrementTotal);
    }
  };
  const blusCar = () => {
    if (selectedValue === null) {
      message.error("اختر نوع الكرتون أولا");
    } else {
      const increment = 1;
      setCountCar(countCar + increment);
      const filtered = productsC.filter(
        (product) => product.id === selectedValue
      );
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
    localStorage.removeItem("token-client");
    localStorage.removeItem("id");
    localStorage.removeItem("clientName");

    router.push("/login");
  };

  const submitOrder = (event) => {
    if (
      (selectedValue === null && selectedValueC === null) ||
      selectedValue === null ||
      selectedValueC === null
    ) {
      message.error("من فضلك اختر الاصناف ");
    } else if (
      (countCar === 0 && countGal === 0) ||
      countCar === 0 ||
      countGal === 0
    ) {
      message.error("من فضلك اختر الكميات ");
    } else {
      const filtered = products.filter(
        (product) => product.id === selectedValue
      );
      const filteredProductsC = productsC.filter(
        (product) => product.category !== "G" && product.id === selectedValueC
      );
      const date = new Date().toISOString();
      setIsLoading(true);
      addOrderServices({
        client: localStorage.getItem("id"),
        tendered: 2,
        items: [
          {
            product: filtered[0].id,
            product__name: filtered[0].name,
            price: filtered[0].price,
            quantity: countGal,
          },
          {
            product:
              filteredProductsC[0].id === undefined
                ? null
                : filteredProductsC[0].id,
            product__name:
              filteredProductsC[0].name === undefined
                ? null
                : filteredProductsC[0].name,
            price:
              filteredProductsC[0].price === undefined
                ? null
                : filteredProductsC[0].price,
            quantity: countCar,
          },
        ],
        status: "not started",
        dateCreated: date,
        total: totalP,
        tenderedAmount: totalP,
      }).then(() => {
        info(
          "تمت الاضافة بنجاح",
          filteredProductsC[0].name,
          filtered[0].name,
          filteredProductsC[0].price,
          filtered[0].price,
          filteredProductsC[0].image,
          filtered[0].image,
        );

        setIsLoading(false);

        message.success("تم ارساال الطلب بنجاح");
        setTotalP(0);
        setSelectedValue(null);
        setSelectedValueC(null);
        setNameprod(null);
        setNameprodC(null);
        setCountCar(0);
        setCountGal(0);
      });
    }
  };
  return (
    <div>
     <div className="home">
        <div className="logo">
          <Image src={wat1} alt="test" width={75} height={75} />
        </div>
        <div  
        
        className="up-bar"
        
        onClick={logOut} style={{ fontSize: "20px", color: "gray" ,cursor:'pointer'}}>
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
          style={{ fontSize: "20px", color: "#3dc5cd" }}
          href={"/order"}
        >
          الطلبات
        </Link>
        <Link
          className="up-bar"
          style={{ fontSize: "20px", color: "gray", marginRight: "25px" }}
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
              <Link href={"/"} style={{ color: "gray" }}>
                الرئيسية <FaHome style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"profile"} style={{ color: "gray" }}>
                الملف الشخصي <BsFillPersonFill style={{ marginTop: "20px" }} />
              </Link>
              <Link href={"/order"} style={{ color: "#3dc5cd" }}>
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
      <div className="title">
    
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
            style={{width:"300px"}}

              showSearch
              value={nameprod}
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
            style={{width:"300px"}}
            value={nameprodC}
              onChange={handleSelectC}
              onSelect={handleSelectC}
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
        <Button
          loading={isLoading}
          style={{ marginTop: "20px" }}
          onClick={submitOrder}
        >
          اطلب
        </Button>
      </div>
    </div>
  );
}
