import { Card, CardBody, CardHeader } from "@nextui-org/react";
import NavbarBrand from "../navbar/NavbarBrand";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <Card
      className="flex h-screen w-64 flex-col border-r  px-4 py-8 dark:border-gray-600 dark:bg-gray-800"
      isBlurred
      radius="none"
    >
      <CardHeader>
        <NavbarBrand />
      </CardHeader>
      <CardBody className="flex h-full flex-col justify-between p-0">
        <SidebarContent />
      </CardBody>
    </Card>
  );
}
