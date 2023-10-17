import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface ClerkProps {
  children: React.ReactNode;
}

export default function Clerk({ children }: ClerkProps) {
  const { theme, systemTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme:
          theme === "dark"
            ? dark
            : theme === "system" && systemTheme === "dark"
            ? dark
            : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
