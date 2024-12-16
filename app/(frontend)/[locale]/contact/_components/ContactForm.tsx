"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    firstName: z.string().min(2, t("validation.firstName")),
    lastName: z.string().min(2, t("validation.lastName")),
    email: z.string().email(t("validation.email")),
    phone: z.string().optional(),
    subject: z.string().min(1, t("validation.subject")),
    message: z.string().min(10, t("validation.message")),
  });

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.firstName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.firstName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.lastName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.lastName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.phone")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.phone")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.subject")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("placeholders.subject")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">{t("subjects.general")}</SelectItem>
                  <SelectItem value="courses">{t("subjects.courses")}</SelectItem>
                  <SelectItem value="support">{t("subjects.support")}</SelectItem>
                  <SelectItem value="other">{t("subjects.other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.message")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("placeholders.message")}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
} 