"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/custom_form_field";
import { Form } from "@/components/ui/form";
import { loginFormSchema, type LoginFormData } from "./schema";

interface Props {
  onSubmit?: (data: LoginFormData) => Promise<void> | void;
  isLoading?: boolean;
}

export function LoginForm(props: Props) {
  const { onSubmit, isLoading = false } = props;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    await onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Content de vous revoir
          </h1>
          <p className="text-sm text-muted-foreground">
            Connectez-vous pour retrouver vos retours et vos equipes.
          </p>
        </div>

        <div className="space-y-4">
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="votre.email@exemple.com"
            fieldType={FormFieldType.INPUT}
            inputType="email"
            disabled={isLoading}
          />

          <CustomFormField
            control={form.control}
            name="password"
            label="Mot de passe"
            placeholder="••••••••"
            fieldType={FormFieldType.PASSWORD}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !form.formState.isValid}
          className="w-full rounded-full bg-sky-600 text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
