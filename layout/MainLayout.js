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

    if (tokenAdmin) {
      // التوكن الإداري موجود - توجيه إلى واجهة الإدارة
      if (isPublicRoute(router.pathname)) {
        router.push("/admin");
      }
    } else if (tokenUser) {
      // توكن المستخدم موجود - توجيه إلى واجهة المستخدم
      if (isPublicRoute(router.pathname)) {
        router.push("/");
      }
    } else {
      // لا توكن متوفر
      if (router.pathname === "/dash") {
        // توجيه المستخدم إلى واجهة تسجيل الدخول الخاصة بالإدمن
        router.push("/dash");
      } else if (router.pathname === '/login') {
        // توجيه المستخدم إلى واجهة تسجيل الدخول العامة
        router.push("/login");
      } else {
        router.push("register")
      }
    }
  }, [router.pathname]);


  const isPublicRoute = (path) => {
    return path === "/login" || path === "/register" || path === "/dash" || path === "/admin";
  };

  return (
    <Layout>
      {router.asPath === "/login" &&
        router.asPath === "/register" &&
        router.asPath === "/admin" &&
        router.asPath === "/dashb" ? (
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
