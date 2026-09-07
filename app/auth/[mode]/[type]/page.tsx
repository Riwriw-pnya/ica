"use client";

import { use } from "react";
import LoginMember from "@/components/auth/LoginMember";
import RegisterMember from "@/components/auth/RegisterMember";
import LoginCattery from "@/components/auth/LoginCattery";
import RegisterCattery from "@/components/auth/RegisterCattery";

interface PageProps {
  params: Promise<{
    mode: "login" | "register";
    type: "member" | "cattery";
  }>;
}

export default function AuthFormPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { mode, type } = resolvedParams;

  if (mode === "login") {
    if (type === "member") return <LoginMember />;
    if (type === "cattery") return <LoginCattery />;
  }

  if (mode === "register") {
    if (type === "member") return <RegisterMember />;
    if (type === "cattery") return <RegisterCattery />;
  }

  return null;
}