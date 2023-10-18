import { ClerkProvider } from "@clerk/nextjs";

interface ClerkProps {
  children: React.ReactNode;
}

export default function Clerk({ children, ...rest }: ClerkProps) {
  return <ClerkProvider {...rest}>{children}</ClerkProvider>;
}
