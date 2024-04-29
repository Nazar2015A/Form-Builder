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
} from "./ParagraphField";
import { useFormBuilderContext } from "../../../hooks/useFormBuilderContext";
import { Textarea } from "../../ui/textarea";

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
      title: element.extraAttributes.title,
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} onKeyDown={handleKeyDown} />
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
