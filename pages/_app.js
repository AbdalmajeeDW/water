import "../assets/styles/sass/main.css";
import { useRouter } from "next/router";
import MainLayout from "@/layout/MainLayout";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();


  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}