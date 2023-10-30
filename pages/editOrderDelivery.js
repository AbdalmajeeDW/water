import React, { useState } from "react";
import { useRouter } from "next/router";
import wat1 from "../assets/img/logo.png";
import Image from "next/image";
import { Button, Divider, Input } from 'antd';
import { BsFillPersonFill } from "react-icons/bs";
import { Radio } from 'antd';
import Link from "next/link";
const editOrder = () => {
    const router = useRouter();
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const {
        query: {
            numOrder,
            status
        },

    } = router
    const props = {
        numOrder,
        status
    }
    return (
        <div>



            <div className="home" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <div style={{ fontSize: "25px", marginTop: "20px", display: "flex", alignItems: "center", flexDirection: "column", color: "gray" }}>تعديل
                    <Divider style={{ width: "110px !important", minWidth: "0px" }} />

                </div>
                <div className="logo">
                    <Image src={wat1} alt="test" width={125} height={125} />
                </div>


            </div>
            <div className="bodEdit" >
                <div style={{ display: "flex", alignItems: "center" }}>  <BsFillPersonFill />   نبيل</div>
                <div>  رقم الطلب :   {props.numOrder}</div>
                <div>   حالة الطلب :{props.status} </div>
                <span >الرصيد الحالي : </span>
            </div>
            <div className="addMon">
                <span style={{ color: "gray", fontSize: "22px" }}>اضافة رصيد</span>
                <div style={{ display: 'flex', alignItems: "center", gap: '10px', }}>
                    <Radio.Group onChange={onChange} value={value} style={{ color: "gray" }}>
                        <Radio style={{ color: "gray", fontSize: "22px" }} value={1}>موجب</Radio>
                        <Radio style={{ color: "gray", fontSize: "22px" }} value={2}>سالب</Radio>
                    </Radio.Group>
                </div>
                <Input
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    prefix="ر.س"
                    style={{
                        marginTop: "20px",
                        direction: "rtl",
                        borderRadius: "70px",
                        width: "70%",
                        boxShadow: '1px 1px 3px 2px gray'
                    }}
                    placeholder="اضافة رصيد"
                />{" "}
                <Button>اضافة</Button>
            </div>
        </div>

    )
}

export default editOrder;