import { type Customer } from "~/schema/customers/CustomerSchemas";

export interface CustomerColumn {
  key: keyof Customer;
  label: string;
  allowSorting?: boolean;
}

export const CUSTOMER_COLUMNS: CustomerColumn[] = [
  {
    key: "customerNumber",
    label: "Customer #",
    allowSorting: true,
  },
  {
    key: "name",
    label: "Name",
    allowSorting: true,
  },
  {
    key: "email",
    label: "Email",
    allowSorting: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    allowSorting: true,
  },
  {
    key: "address",
    label: "Address",
    allowSorting: true,
  },
];
