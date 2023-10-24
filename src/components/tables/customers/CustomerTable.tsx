import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type Customer } from "~/schema/customers/CustomerSchemas";
import { api } from "~/utils/api";
import CustomerTableUtils from "./CustomerTableUtils";
import { CUSTOMER_COLUMNS } from "./Columns";
import useCache from "~/hooks/useCache";
import { TRPCClientError } from "@trpc/client";
import { toast } from "sonner";
import CustomersLoading from "./CustomersLoading";
import CustomersTableError from "./CustomersTableError";

interface Sort {
  column: keyof Customer;
  direction: "ascending" | "descending";
}

export default function CustomersTable() {
  const router = useRouter();
  const [page, setPage] = useCache(1, "customers-page");
  const [sortBy, setSortBy] = useCache<Sort>(
    {
      column: "id",
      direction: "descending",
    },
    "customers-sort",
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
  const [search, setSearch] = useCache("", "customers-search");
  const rowsPerPage = 100;

  const { data, isLoading, error, isError } = api.customer.getAll.useQuery(
    {
      limit: rowsPerPage,
      offset: (page - 1) * rowsPerPage,
      sortBy,
      search,
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.log(error);
        toast.error("Error loading customers");
      },
    },
  );

  useEffect(() => {
    if (search !== "") setPage(1);
  }, [search, setPage]);

  if (isLoading) return <CustomersLoading />;

  if (isError) return <CustomersTableError message={error.message} />;

  return (
    <div className="flex flex-col gap-4">
      <CustomerTableUtils
        selectedItems={selectedKeys}
        setSelectedItems={setSelectedKeys}
        search={search}
        setSearch={setSearch}
      />
      <Table
        isHeaderSticky
        isStriped
        aria-label="Customer Table"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          setSelectedKeys(keys as Set<string>);
        }}
        sortDescriptor={sortBy}
        onSortChange={(key) => {
          setSortBy(key as Sort);
        }}
        onRowAction={(key) => router.push(`/customers/${key}`)}
        bottomContent={
          !isLoading &&
          data && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil((data.count as number) / rowsPerPage)}
                onChange={(page: number) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader columns={CUSTOMER_COLUMNS}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.allowSorting}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.customers as Customer[]}
          isLoading={isLoading}
          emptyContent={"No customers to display."}
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
