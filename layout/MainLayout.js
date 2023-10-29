import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "antd";
const { Content } = Layout;

const MainLayout = (
  props,
) => {
  const router = useRouter();
  useEffect(() => {
    const tokenAdmin = localStorage.getItem("token-admin");
    const tokenUser = localStorage.getItem("token-client");
    const tokenDeliveryMans = localStorage.getItem("token-deliveryMan");

    if (tokenAdmin) {
      // التوكن الإداري موجود - توجيه إلى واجهة الإدارة
      if (isPublicRoute(router.pathname)) {
        router.push("/controlAdmin");
      }
    } else if (tokenUser) {
      // توكن المستخدم موجود - توجيه إلى واجهة المستخدم
      if (isPublicRoute(router.pathname)) {
        router.push("/");
      }
    } else if (tokenDeliveryMans) {
      if (router.pathname === "/deliveryMan") {

        router.push("/deliveryMan")
      }

    } else {
      // لا توكن متوفر
      if (router.pathname === "/admin") {
        // توجيه المستخدم إلى واجهة تسجيل الدخول الخاصة بالإدمن
        router.push("admin");
      } else if (router.pathname === '/login') {
        // توجيه المستخدم إلى واجهة تسجيل الدخول العامة
        router.push("/login");
      } else if (router.pathname === '/deliveryMan') {
        router.push("/deliveryMan")

      } else {

        router.push("register")
      }
    }
  }, [router.pathname]);


  const isPublicRoute = (path) => {
    return path === "/login" || path === "/register" || path === "/admin" || path === "/deliveryMan";
  };

  return (
    <Layout>
      {router.asPath === "/login" &&
        router.asPath === "/register" &&
        router.asPath === "/admin" &&
        router.asPath === "adminb" ? (
        <Content>{props.children}
        </Content>
      ) : (
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      )}
    </Layout>
  );
};



export default MainLayout;
