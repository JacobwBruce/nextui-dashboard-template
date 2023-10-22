import React, { useState, useRef } from "react";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface AutocompleteFieldProps {
  isLoading?: boolean;
  inputProps?: React.ComponentProps<typeof Input>;
  dropdownProps?: Omit<React.ComponentProps<typeof Listbox>, "onAction">;
  suggestions: string[];
  onChange: (value: string) => void;
  selectedValue: string | null;
  renderSuggestion: (suggestion: string) => React.ReactNode;
  onSuggestionSelected: (suggestion: string) => void;
}

export default function AutocompleteField({
  isLoading,
  inputProps,
  dropdownProps,
  suggestions,
  onChange,
  renderSuggestion,
  onSuggestionSelected,
  selectedValue,
}: AutocompleteFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const ref = useRef<HTMLDivElement | null>(null);
  const onBlur = (e: any) => {
    if (ref?.current?.contains(e.relatedTarget)) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        onFocus={() => setIsOpen(true)}
        onBlur={onBlur}
        {...inputProps}
        value={!isOpen && selectedValue ? selectedValue : value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        endContent={
          <Spinner size="sm" className={`${!isLoading && "hidden"}`} />
        }
      />
      {isOpen && suggestions.length > 0 && (
        <Listbox
          ref={ref}
          className={`absolute z-50 mt-1 max-h-48 overflow-auto rounded-xl border-2 bg-[#ffffff] shadow-xl`}
          color="primary"
          {...dropdownProps}
          onAction={(key) => {
            onSuggestionSelected(key.toString());
            setIsOpen(false);
          }}
        >
          {suggestions.map((suggestion: string, i: number) => {
            return (
              <ListboxItem key={suggestion}>
                {renderSuggestion(suggestion)}
              </ListboxItem>
            );
          })}
        </Listbox>
      )}
    </div>
  );
}
