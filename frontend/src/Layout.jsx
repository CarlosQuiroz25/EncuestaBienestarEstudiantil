import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className="min-h-[calc(100vh-120px)] flex-col flex">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}