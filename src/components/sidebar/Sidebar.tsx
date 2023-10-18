import NavbarBrand from "../navbar/NavbarBrand";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white px-4 py-8 dark:border-gray-600 dark:bg-gray-800">
      <NavbarBrand />
      <div className="flex h-full flex-col justify-between">
        <SidebarContent />
      </div>
    </div>
  );
}
