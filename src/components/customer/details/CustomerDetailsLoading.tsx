import { Spinner } from "@nextui-org/react";

export default function CustomerDetailsLoading() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <Spinner label="Loading..." />
    </div>
  );
}
