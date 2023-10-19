import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaUserMinus } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import CreateCustomerModal from "~/components/modals/customers/create/CreateCustomerModal";

interface CustomertableUtilsProps {
  selectedItems: Set<string>;
  search: string;
  setSearch: (value: string) => void;
}

export default function CustomerTableUtils({
  selectedItems,
  search,
  setSearch,
}: CustomertableUtilsProps) {
  const [localSearch, setLocalSearch] = useState(search);

  return (
    <div className="w-100 flex items-center justify-between">
      <Input
        className="w-96"
        variant="bordered"
        color="primary"
        isClearable
        radius="lg"
        placeholder="Type to search..."
        startContent={<LuSearch />}
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSearch(localSearch);
        }}
        onClear={() => {
          setLocalSearch("");
          setSearch("");
        }}
      />
      {selectedItems.size > 0 ? (
        <Button variant="shadow" color="danger" isIconOnly>
          <FaUserMinus />
        </Button>
      ) : (
        <CreateCustomerModal />
      )}
    </div>
  );
}
