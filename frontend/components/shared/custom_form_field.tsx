import Image from "next/image";
import { Control } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  inputType?: React.HTMLInputTypeAttribute;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  labelChildren?: React.ReactNode;
  inputClassName?: string;
  labelClassName?: string;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const parsedDateValue =
    field.value instanceof Date
      ? field.value
      : field.value
        ? new Date(field.value)
        : undefined;

  const safeDateValue =
    parsedDateValue && !Number.isNaN(parsedDateValue.getTime())
      ? parsedDateValue
      : undefined;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={
            props.iconSrc
              ? "flex rounded-md border border-gray-100 bg-gray-200"
              : ""
          }
        >
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type={props.inputType}
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
              className={
                props.inputClassName ||
                "rounded-md bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
              }
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="relative">
          <FormControl>
            <Input
              type={!showPassword ? "text" : "password"}
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
              className={
                props.inputClassName ||
                "rounded-md bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 pr-10 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
              }
            />
          </FormControl>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            disabled={props.disabled}
          >
            {showPassword ? (
              <HugeiconsIcon icon={ViewOffIcon} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon icon={ViewIcon} className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
            className="rounded-md bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 !important"
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
            />
            <label
              htmlFor={props.name}
              className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-10 px-3 rounded-md bg-white border-slate-300 outline-1 outline-slate-300 text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-700 dark:outline-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 focus-visible:ring-0 focus-visible:ring-offset-0",
                  !field.value && "text-slate-500",
                )}
                disabled={props.disabled}
              >
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  className="mr-2 h-4 w-4 opacity-50"
                />
                {safeDateValue ? (
                  format(safeDateValue, props.dateFormat || "PPP")
                ) : (
                  <span>{props.placeholder || "Pick a date"}</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-700"
            align="start"
          >
            <Calendar
              mode="single"
              selected={safeDateValue}
              onSelect={(date) =>
                field.onChange(date ? format(date, "yyyy-MM-dd") : "")
              }
              disabled={props.disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={String(field.value || "")}
            disabled={props.disabled}
          >
            <SelectTrigger className="rounded-md bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 w-full">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, labelChildren } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel
              className={
                props.labelClassName ||
                "block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
              }
            >
              {label}
              <div className="flex flex-1 justify-end">
                {labelChildren && <span className="ml-2">{labelChildren}</span>}
              </div>
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
