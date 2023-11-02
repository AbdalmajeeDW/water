// import { Button } from 'antd';
// import Link from 'next/link';
// import React from 'react';
// import { AiOutlineMenu } from "react-icons/ai";
// import { FaHome } from "react-icons/fa";
// import LanguageIcon from "@mui/icons-material/Language";
// import { FaUsers } from "react-icons/fa";;
// import { CiLogout } from "react-icons/ci";
// const drawer = (props) => {
//     const showMenu = () => {
//         setShow(!show);
//     };
//     return   <div className="icon_menu">
//     <AiOutlineMenu
//         onClick={showMenu}
//         style={{ position: "relative", zIndex: "99999" }}
//     />
//     <div className={`menu_${show && "show"}`}>
//         <div className="content_menu">
//             <Link href={props.Home} style={{ color: "gray" }}>
//                 <FaHome style={{ marginTop: "20px" }} />
//             </Link>
//             <LanguageIcon />
//             <Link href={"/client-list"} style={{ color: "gray" }}>
//                 <FaUsers style={{ marginTop: "20px" }} />
//             </Link>
//         </div>

//         <Button onClick={logOut} style={{ marginTop: "20px" }}>
//             <CiLogout
//                 style={{
//                     fontSize: "17px",
//                 }}
//             />
//             تسجيل الخروج
//         </Button>
//     </div>
// </div>
// }



// export default drawer;