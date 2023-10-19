import { Card, CardBody } from "@nextui-org/react";
import ProtectedRoute from "~/components/routes/ProtectedRoute";
import CustomersTable from "~/components/tables/customers/CustomerTable";

export default function Customers() {
  return (
    <ProtectedRoute title="Customers">
      <Card>
        <CardBody>
          <div className="py-4">
            <CustomersTable />
          </div>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}
