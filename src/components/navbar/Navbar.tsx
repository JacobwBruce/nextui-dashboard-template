import { useClerk, useUser } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar as NavbarContainer,
  NavbarBrand as NextNavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { type Key } from "react";
import { toast } from "sonner";
import SidebarContent from "../sidebar/SidebarContent";
import NavbarBrand from "./NavbarBrand";

export default function Navbar() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const handleAction = (key: Key) => {
    switch (key) {
      case "profile":
        openUserProfile();
        break;
      case "logout":
        toast.promise(signOut, {
          loading: "Signing out...",
          success: "Signed out successfully",
          error: "Failed to sign out",
        });
        break;
      default:
        throw new Error("Invalid action");
        break;
    }
  };

  return (
    <NavbarContainer isBordered maxWidth="2xl">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
        <NextNavbarBrand>
          <NavbarBrand />
        </NextNavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <User
                className="cursor-pointer"
                name={user?.fullName}
                description={user?.primaryEmailAddress?.emailAddress}
                avatarProps={{
                  src: user?.imageUrl,
                }}
              />
            </DropdownTrigger>
            <DropdownMenu
              variant="shadow"
              color="primary"
              onAction={handleAction}
            >
              <DropdownSection showDivider>
                <DropdownItem key="profile">Profile</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="logout">Logout</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <SidebarContent />
      </NavbarMenu>
    </NavbarContainer>
  );
}
