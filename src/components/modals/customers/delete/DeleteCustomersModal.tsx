import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { TRPCClientError } from "@trpc/client";

import { FaUserMinus } from "react-icons/fa6";
import { toast } from "sonner";
import { api } from "~/utils/api";

interface DeleteCustomersModalProps {
  customerIds: Set<string>;
  setCustomerIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function DeleteCustomerModal({
  customerIds,
  setCustomerIds,
}: DeleteCustomersModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const trpcUtils = api.useContext();
  const deleteCustomers = api.customer.deleteMany.useMutation();

  const handleDelete = async () => {
    try {
      const customerIdsNumber = new Set<number>();
      for (const key of customerIds) {
        customerIdsNumber.add(Number(key));
      }
      await deleteCustomers.mutateAsync(customerIdsNumber);
      setCustomerIds(new Set<string>());
      await trpcUtils.customer.getAll.invalidate();
      toast.success("Customers deleted");
      onClose();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Tooltip content="Delete customers" color="danger">
        <Button variant="shadow" color="danger" isIconOnly onPress={onOpen}>
          <FaUserMinus />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={deleteCustomers.isLoading}
      >
        <ModalContent>
          <ModalHeader>Delete Customers</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold text-danger">{customerIds.size}</span>{" "}
              customer{customerIds.size > 1 && "s"}? This action cannot be
              undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              variant="flat"
              onPress={onClose}
              isDisabled={deleteCustomers.isLoading}
            >
              Close
            </Button>
            <Button
              type="submit"
              color="danger"
              onPress={handleDelete}
              isLoading={deleteCustomers.isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
