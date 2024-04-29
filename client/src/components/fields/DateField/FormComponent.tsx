import { FC, useEffect, useState } from "react";
import { CustomInstance, DateFieldFormElement } from "./DateField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../ui/calendar";
import { format } from "date-fns";

interface Props {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}

const FormComponent: FC<Props> = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}) => {
  const element = elementInstance as CustomInstance;

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  const [error, setError] = useState(false);

  const handleCalendarSelect = (date: Date | undefined) => {
    setDate(date);

    if (!submitValue) return;
    const value = date?.toUTCString() || "";
    const valid = DateFieldFormElement.validate(element, value);
    setError(!valid);
    submitValue(element.id, value);
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalendarSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormComponent;
