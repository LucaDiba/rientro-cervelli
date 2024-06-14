"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TaxResults, getTaxResults } from "@/utils/tax";
import { ResultsTable } from "./tax-result";

const FormSchema = z.object({
  grossAnnualIncome: z
    .number()
    .or(z.string().transform((val) => parseInt(val, 10))),
});

export function Calculator() {
  const [results, setResults] = useState<TaxResults | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      grossAnnualIncome: 50000,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResults(getTaxResults(data));
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="grossAnnualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gross Annual Income</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your gross annual income in EUR.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {results && <ResultsTable results={results} />}
    </>
  );
}
