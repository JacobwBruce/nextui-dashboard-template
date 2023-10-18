import { Card, CardBody } from "@nextui-org/react";
import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Transactions() {
  return (
    <ProtectedRoute title="Transactions">
      <Card>
        <CardBody>
          <h1>Transactions</h1>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}
