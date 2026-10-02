"use client";

import { useEffect } from "react";
import { useHeaderAction } from "@/context/HeaderActionContext";

export function CatDetailHeaderSetter({
  name,
  breed,
  emsCode,
}: {
  name: string;
  breed: string;
  emsCode: string;
}) {
  const { setHeaderTitle, setHeaderSubTitle } = useHeaderAction();

  useEffect(() => {
    setHeaderTitle(name);
    setHeaderSubTitle(`${breed} · EMS ${emsCode}`);

    return () => {
      setHeaderTitle(null);
      setHeaderSubTitle(null);
    };
  }, [name, breed, emsCode, setHeaderTitle, setHeaderSubTitle]);

  return null;
}