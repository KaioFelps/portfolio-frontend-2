import type { Metadata } from "next";
import logo from "@/assets/logo-dark-mode.svg";
import blob from "@/assets/orange-blob.svg";
import { MetaUtilities } from "@/utils/meta";
import AdminLoginForm from "./form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Login", true),
};

export default function AdminLoginPage() {
  return (
    <>
      <img src={logo.src} alt="Kaio Felps" className="absolute top-4 left-4" />

      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%_-_48px)] max-w-[500px]">
        <h1 className="font-bold text-2xl text-white mb-6 text-center">
          Acessar o dashboard
        </h1>

        <AdminLoginForm />
      </div>

      <div
        style={{ backgroundImage: `url("${blob.src}")` }}
        className="absolute inset-x-0 bottom-0 h-[40vh] bg-[center_top] bg-no-repeat bg-cover -z-50"
      />
    </>
  );
}
