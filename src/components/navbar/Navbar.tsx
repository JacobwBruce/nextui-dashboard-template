import { useClerk, useUser } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  NavbarBrand,
  Navbar as NavbarContainer,
  NavbarContent,
  NavbarItem,
  User,
  DropdownSection,
} from "@nextui-org/react";
import { type Key } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleAction = (key: Key) => {
    switch (key) {
      case "profile":
        console.log("profile");
        break;
      case "settings":
        console.log("settings");
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
    <NavbarContainer className="border-b-2 border-solid border-gray-100">
      <NavbarBrand>
        <p className="font-bold text-inherit">AmEx</p>
      </NavbarBrand>

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
                <DropdownItem key="settings">Settings</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="logout">Logout</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NavbarContainer>
  );
}
