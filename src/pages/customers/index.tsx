import { Card, CardBody } from "@nextui-org/react";
import CreateCustomerModal from "~/components/modals/customers/create/CreateCustomerModal";
import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Customers() {
  return (
    <ProtectedRoute title="Customers">
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <h1>Customers</h1>
            <CreateCustomerModal />
          </div>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}
