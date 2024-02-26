"use client";
import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [isDesktop, setisDesktop] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 650) {
      setisDesktop(true);
    } else {
      setisDesktop(false);
    }
  }, []);

  return { isDesktop };
};
