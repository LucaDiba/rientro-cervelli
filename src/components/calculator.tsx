"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { TaxResults, getTaxResults } from "@/utils/tax";
import { ResultsTable } from "./tax-result";
import { RegionDisplayNames, RegionSchema } from "@/utils/region";

const FormSchema = z.object({
  region: RegionSchema,
  grossAnnualIncome: z.number(),
  hasMinorChild: z.boolean(),
});

export function Calculator() {
  const [results, setResults] = useState<TaxResults | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      region: "LAZIO",
      grossAnnualIncome: 50000,
      hasMinorChild: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResults(getTaxResults(data));
  }

  useEffect(() => {
    form.watch(() => onSubmit(form.getValues()));
    onSubmit(form.getValues());
  }, [form, form.watch]);

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
                  <Input
                    type="number"
                    value={String(field.value)}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter your gross annual income.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region (or autonomous province)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(RegionDisplayNames).map(
                      ([region, displayName]) => (
                        <SelectItem key={region} value={region}>
                          {displayName}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the region or autonomous province where you are moving
                  to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hasMinorChild"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Minor child</FormLabel>
                  <FormDescription>
                    Check this if you are moving to Italy with a minor child or
                    in case of birth/adoption of a minor during the facilitation
                    period. The facilitation is 50% if you have no minor child
                    and 60% if you have a minor child.
                  </FormDescription>
                </div>
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
