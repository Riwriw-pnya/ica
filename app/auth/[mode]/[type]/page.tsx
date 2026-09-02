"use client";

import { use } from "react";
import RegisterMemberForm from "@/components/auth/RegisterMemberForm";
import DefaultAuthForm from "@/components/auth/DefaultAuthForm";

interface PageProps {
  params: Promise<{
    mode: "login" | "register";
    type: "member" | "cattery";
  }>;
}

export default function AuthFormPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { mode, type } = resolvedParams;

  if (mode === "register" && type === "member") {
    return <RegisterMemberForm />;
  }

  return <DefaultAuthForm mode={mode} type={type} />;
}