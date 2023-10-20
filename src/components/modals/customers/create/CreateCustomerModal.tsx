import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { TRPCClientError } from "@trpc/client";
import { useForm } from "react-hook-form";
import {
  type Customer,
  insertCustomerSchema,
} from "~/schema/customers/CustomerSchemas";

import { FaSave } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { toast } from "sonner";
import { api } from "~/utils/api";
import AutocompleteField from "~/components/inputs/autocomplete/AutoComplete";
import { useState } from "react";

export default function CreateCustomerModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addressLoading, setAddressLoading] = useState(false);

  const trpcUtils = api.useContext();
  const insertCustomer = api.customer.create.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Customer>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: {
      address: "",
    },
  });

  const address = watch("address");

  const saveCustomer = async (data: Customer) => {
    try {
      await insertCustomer.mutateAsync(data);
      reset();
      onClose();
      await trpcUtils.customer.getAll.invalidate();
      toast.success("Customer created successfully!");
    } catch (err) {
      if (err instanceof TRPCClientError) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const [locations, setLocations] = useState<string[]>([]);
  return (
    <>
      <Tooltip showArrow content="Create Customer">
        <Button onPress={onOpen} variant="shadow" color="primary" isIconOnly>
          <FaUserPlus />
        </Button>
      </Tooltip>
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
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">+1</span>
                      </div>
                    }
                    autoComplete="off"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    {...register("phone")}
                  />

                  <AutocompleteField
                    selectedValue={address}
                    isLoading={addressLoading}
                    inputProps={{
                      radius: "lg",
                      size: "sm",
                      variant: "bordered",
                      label: "Location",
                      autoComplete: "off",
                      isInvalid: !!errors.address,
                      errorMessage: errors.address?.message,
                    }}
                    onChange={async (value) => {
                      if (value.length === 0) {
                        setLocations([]);
                        return;
                      }
                      setAddressLoading(true);
                      const response =
                        await trpcUtils.location.search.fetch(value);
                      setAddressLoading(false);
                      setLocations(response);
                    }}
                    suggestions={locations}
                    renderSuggestion={(suggestion) => <span>{suggestion}</span>}
                    onSuggestionSelected={(suggestion) => {
                      setValue("address", suggestion);
                      //need to reset errors
                      clearErrors("address");
                    }}
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
