import { Button, Tab, Tabs } from "@nextui-org/react";
import { FaBagShopping, FaCreditCard } from "react-icons/fa6";
import CustomerCreditCards from "./Cards";
import CustomerTransactions from "./Transactions";

export const CUSTOMER_TABS = [
  {
    id: "cards",
    label: "Cards",
    icon: <FaCreditCard />,
    content: <CustomerCreditCards />,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: <FaBagShopping />,
    content: <CustomerTransactions />,
  },
];

export default function CustomerTabs() {
  return (
    <div className="flex flex-row items-start justify-between">
      <div>
        <Tabs aria-label="customer-tabs" items={CUSTOMER_TABS}>
          {(tab) => (
            <Tab
              key={tab.id}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
              }
            >
              {tab.content}
            </Tab>
          )}
        </Tabs>
      </div>
      <Button>Create</Button>
    </div>
  );
}
