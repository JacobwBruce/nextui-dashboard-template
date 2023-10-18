import { useRouter } from "next/router";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";

import { type NavItem, NavItems, type NavLink } from "../contants/ui/NavItems";

export default function SidebarContent() {
  const router = useRouter();
  return (
    <div className="x-2 mt-9 flex flex-col gap-6 text-gray-500">
      {NavItems.map((item: NavItem, index: number) => {
        if (item.type === "link") {
          return (
            <SidebarItem
              key={index}
              title={item.title}
              href={item.path}
              icon={item.icon}
              isActive={router.pathname === item.path}
            />
          );
        } else {
          return (
            <SidebarMenu key={index} title={item.name}>
              {item.links.map((link: NavLink, index: number) => (
                <SidebarItem
                  key={index}
                  title={link.title}
                  href={link.path}
                  icon={link.icon}
                  isActive={router.pathname === link.path}
                />
              ))}
            </SidebarMenu>
          );
        }
      })}
    </div>
  );
}
