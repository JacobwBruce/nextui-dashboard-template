import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/router";
import ProtectedRoute from "~/components/routes/ProtectedRoute";
import { api } from "~/utils/api";

export default function CustomerPage() {
  const router = useRouter();

  const customerId = parseInt(router.query.id as string);

  const { data: customer } = api.customer.getById.useQuery(customerId, {
    enabled: !!customerId,
  });

  console.log(customer);

  return (
    <ProtectedRoute title="Customer">
      <Card>
        <CardHeader>Customer</CardHeader>
        <CardBody>some details</CardBody>
      </Card>
    </ProtectedRoute>
  );
}
