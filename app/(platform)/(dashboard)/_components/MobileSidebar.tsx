"use client";

import { useEffect, useState } from "react";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { STORAGE_KEYS } from "@/app/utils/constant";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        className="block md:hidden mr-2"
        onClick={onOpen}
        variant={"ghost"}
        size={"sm"}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10">
          <Sidebar storageKey={STORAGE_KEYS.T_SIDEBAR_MOBILE_STATE} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
