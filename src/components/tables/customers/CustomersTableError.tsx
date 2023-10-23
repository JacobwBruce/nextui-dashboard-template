import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

interface CustomersTableErrorProps {
  message?: string;
}

export default function CustomersTableError({
  message = "An unkown error occured",
}: CustomersTableErrorProps) {
  return (
    <div className="flex justify-center ">
      <Card
        isFooterBlurred
        className="items-center border-1 border-solid border-danger bg-red-200"
      >
        <CardHeader>
          <h3 className="w-full text-center text-2xl">
            Error Loading Customers
          </h3>
        </CardHeader>
        <CardBody className=" items-center">
          <p>{message}</p>
        </CardBody>
        <CardFooter className=" bottom-1 z-10 m-2 w-auto justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small ">
          <p className="mr-2 text-sm">
            If the problem persists, notify the American Expediting IT Team
          </p>
          <Button
            as={Link}
            href="mailto:j.bruce@amexpediting.com"
            className="min-w-fit"
            variant="flat"
            color="danger"
            radius="lg"
            size="sm"
          >
            Notify IT Team
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
