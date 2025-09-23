"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PathnameUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.setAttribute("data-pathname", pathname);
  }, [pathname]);

  return null;
}
