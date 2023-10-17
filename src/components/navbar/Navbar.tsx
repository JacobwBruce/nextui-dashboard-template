import { UserButton } from "@clerk/nextjs";
import {
  Link,
  NavbarBrand,
  Navbar as NavbarContainer,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <NavbarContainer>
      <NavbarBrand>
        <p className="font-bold text-inherit">AmEx</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link as={NextLink} href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserButton />
        </NavbarItem>
      </NavbarContent>
    </NavbarContainer>
  );
}
