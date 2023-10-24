import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { FaUserMinus, FaUserPen } from "react-icons/fa6";
import { type Customer } from "~/schema/customers/CustomerSchemas";
import CustomerTabs from "./tabs/CustomerTabs";

interface CustomerDetailsProps {
  customer: Customer;
}

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <Card className="py-4">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h2 className=" text-2xl font-bold">{customer.name}</h2>
          <ButtonGroup size="sm" variant="bordered" color="default">
            <Button aria-label="edit-customer" isIconOnly>
              <FaUserPen className="text-gray-400" />
            </Button>
            <Button aria-label="delete-customer" isIconOnly color="danger">
              <FaUserMinus />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 space-y-2 lg:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-400">Email</span>
              <span>{customer.email}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-gray-400">Phone</span>
              <span>{customer.phone}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-gray-400">Address</span>
              <span>{customer.address}</span>
            </div>
          </div>

          <div className="flex h-full flex-col space-y-1">
            <span className="text-gray-400">Special Instructions</span>
            <p>{customer.specialInstructions}</p>
          </div>
        </div>

        <Divider className="my-4" />
        <CustomerTabs />
      </CardBody>
    </Card>
  );
}
