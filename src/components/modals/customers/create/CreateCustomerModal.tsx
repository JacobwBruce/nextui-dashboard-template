import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  InsertCustomerValues,
  insertCustomerSchema,
} from "~/schema/customers/CustomerSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";

import { FaSave } from "react-icons/fa";
import { toast } from "sonner";
import { api } from "~/utils/api";

export default function CreateCustomerModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const insertCustomer = api.customer.create.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InsertCustomerValues>({
    resolver: zodResolver(insertCustomerSchema),
  });

  const saveCustomer = async (data: InsertCustomerValues) => {
    try {
      const customer = await insertCustomer.mutateAsync(data);
      console.log(customer);
      toast.success("Customer created successfully!");
    } catch (err: any | TRPCClientError<any>) {
      if (err instanceof TRPCClientError) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create Customer
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
        isDismissable={!isSubmitting}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(saveCustomer)}>
              <ModalHeader className="flex flex-col gap-1">
                Create Customer
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    className="col-span-2"
                    radius="lg"
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Customer #"
                    autoComplete="off"
                    isInvalid={!!errors.customerNumber}
                    errorMessage={errors.customerNumber?.message}
                    {...register("customerNumber")}
                  />
                  <Input
                    radius="lg"
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Name"
                    autoComplete="off"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    radius="lg"
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Email"
                    autoComplete="off"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    {...register("email")}
                  />
                  <Input
                    radius="lg"
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Phone number"
                    autoComplete="off"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    {...register("phone")}
                  />
                  <Input
                    radius="lg"
                    type="text"
                    size="sm"
                    variant="bordered"
                    label="Address"
                    autoComplete="off"
                    isInvalid={!!errors.address}
                    errorMessage={errors.address?.message}
                    {...register("address")}
                  />
                  <Textarea
                    className="col-span-2"
                    radius="lg"
                    size="sm"
                    variant="bordered"
                    label="Special Instructions"
                    autoComplete="off"
                    isInvalid={!!errors.specialInstructions}
                    errorMessage={errors.specialInstructions?.message}
                    {...register("specialInstructions")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  variant="flat"
                  isDisabled={isSubmitting}
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  className="text-white"
                  type="submit"
                  color="success"
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <FaSave />}
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
