import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { FormElementInstance } from "../../FormElements/FormElements";
import {
  CustomInstance,
  PropertiesFormSchemaType,
  propertiesSchema,
} from "./SpacerField";
import { useFormBuilderContext } from "../../../hooks/useFormBuilderContext";
import { Slider } from "../../ui/slider";

interface Props {
  elementInstance: FormElementInstance;
}

const PropertiesComponent: FC<Props> = ({ elementInstance }) => {
  const { updateSelectedElement } = useFormBuilderContext();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: element.extraAttributes.height,
    },
  });
  const handleChangeValues = (values: PropertiesFormSchemaType) => {
    updateSelectedElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    event.preventDefault();
  };
  
  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(handleChangeValues)}
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PropertiesComponent;
