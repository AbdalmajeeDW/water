import wat1 from "../../assets/img/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Select, message } from "antd";
import { getProducts } from "@/api-services/products-services";
import { addOrderServices } from "@/api-services/add-order-services";
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

    const filteredProducts = products.filter((product) => product.category !== "C");
    const filteredProductsC = productsC.filter((product) => product.category !== "G");


    function handleSelect(value) {
        setSelectedValue(value);
        setCountGal(0);
        const selectedProduct = products.find((product) => product.id === value);
        setNameprod(selectedProduct.name)
        if (selectedProduct) {
            setTotalP(0);
        }
    }
    function handleSelectC(value) {

        setSelectedValueC(value);
        setCountCar(0);
        const selectedProduct = products.find((product) => product.id === value);
        setNameprodC(selectedProduct.name)
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

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data)
            setProductsC(res.data)
        }).catch((e) => {
            const token = localStorage.getItem("token-deliveryMan")
            if (!token) {
                router.push("/deliveryMan")
            } else
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
            const decrement = 1;
            setCountGal(countGal - decrement);
            const filtered = products.filter((product) => product.id === selectedValue);
            const decrementTotal = decrement * filtered[0].price;
            setTotalP(totalP - decrementTotal);
        }

    };
    const minCar = () => {
        if (countCar > 0) {
            const decrement = 1;
            setCountCar(countCar - decrement);
            const filtered = productsC.filter((product) => product.id === selectedValue);
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
        localStorage.removeItem("token-client");
        localStorage.removeItem("id");
        localStorage.removeItem("clientName");

        router.push("/login");
    };



    const submitOrder = (event) => {
        if (selectedValue === null && selectedValueC === null || selectedValue === null || selectedValueC === null) {
            message.error("من فضلك اختر الاصناف ")

        } else if (countCar === 0 && countGal === 0 || countCar === 0 || countGal === 0) {
            message.error("من فضلك اختر الكميات ")

        } else {

            const filtered = products.filter((product) => product.id === selectedValue);
            const filteredProductsC = productsC.filter((product) => product.category !== "G" && product.id === selectedValueC);
            const date = new Date().toISOString();

            addOrderServices(
                {
                    client: localStorage.getItem("id"),
                    tendered: 2,
                    items: [
                        {
                            product: filtered[0].id,
                            product__name: filtered[0].name,
                            price: filtered[0].price,
                            quantity: countGal
                        },
                        {
                            product: filteredProductsC[0].id === undefined ? null : filteredProductsC[0].id,
                            product__name: filteredProductsC[0].name === undefined ? null : filteredProductsC[0].name,
                            price: filteredProductsC[0].price === undefined ? null : filteredProductsC[0].price,
                            quantity: countCar,
                        }
                    ],
                    status: "not started",
                    dateCreated: date,
                    total: totalP,
                    tenderedAmount: totalP
                }
            )
            message.success("تم ارساال الطلب بنجاح")
            setSelectedValue(null)
            setSelectedValueC(null)
            setNameprod(null)
            setNameprodC(null)
            setCountCar(0)
            setCountGal(0)
        }
    }
    return (
        <div>
            <div className="home" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <div style={{ marginLeft:'20px',fontSize: "25px", marginTop: "20px", display: "flex", alignItems: "center", flexDirection: "column", color: "gray" }}>تعديل
                    <Divider style={{ width: "110px !important", minWidth: "0px" }} />

                </div>
                <div className="logo">
                    <Image src={wat1} alt="test" width={75} height={75} style={{marginRight:"20px"}} />
                </div>


            </div>

            <div className="content_order">
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
                <Button style={{ marginTop: "20px" }} onClick={submitOrder}>تعديل الطلب</Button>
            </div>
        </div>
    );
}
