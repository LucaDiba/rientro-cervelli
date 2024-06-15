import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  employmentType: z.enum(["employee", "self-employed"]).optional(),
  employer: z.enum(["new-company", "same-company", "same-group"]).optional(),
  timeSpentAbroad: z.enum(["more-than", "less-than"]).optional(),
  timeInItaly: z.enum(["more-than", "less-than"]).optional(),
});

export function Eligibility() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const employmentType = form.watch("employmentType");
  const employer = form.watch("employer");
  const timeSpentAbroad = form.watch("timeSpentAbroad");
  const timeInItaly = form.watch("timeInItaly");

  const isEmploymentStepDone =
    employmentType === "self-employed" || employer !== undefined;

  let minimumYearsSpentAbroad = 2;
  if (employmentType === "employee" && employer === "same-company") {
    minimumYearsSpentAbroad = 6;
  } else if (employmentType === "employee" && employer === "same-group") {
    minimumYearsSpentAbroad = 7;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Eligibility Checker</h1>
      <Form {...form}>
        <form className="flex flex-col flex-wrap items-start gap-6">
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What type of employment will you have?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employee" id="employee" />
                      <Label htmlFor="employee">
                        I will be employed in a company.
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="self-employed"
                        id="self-employed"
                      />
                      <Label htmlFor="self-employed">
                        I will start my own company.
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {employmentType === "employee" && (
            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What situation applies to you?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new-company" id="new-company" />
                        <Label htmlFor="new-company">
                          I will start working for a totally new company.
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="same-company"
                          id="same-company"
                        />
                        <Label htmlFor="same-company">
                          I will keep working for the same foreign company.
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="same-group" id="same-group" />
                        <Label htmlFor="same-group">
                          I will work for a different foreign company, but in
                          the same group of my current company.
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {employmentType === "self-employed" && (
            <Alert className="bg-yellow-50 border-yellow-400">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You have to create a company using the "regime ordinario" to be
                eligible for the facilitation. The "regime forfettario" is not
                eligible.
              </AlertDescription>
            </Alert>
          )}
          {isEmploymentStepDone && (
            <>
              <FormField
                control={form.control}
                name="timeSpentAbroad"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      How long have you been a resident outside Italy?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="more-than"
                            id="timeSpentAbroad-more-than"
                          />
                          <Label htmlFor="timeSpentAbroad-more-than">
                            I have been a resident outside Italy for at least{" "}
                            {minimumYearsSpentAbroad} years.
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="less-than"
                            id="timeSpentAbroad-less-than"
                          />
                          <Label htmlFor="timeSpentAbroad-less-than">
                            I have been a resident outside Italy for less than{" "}
                            {minimumYearsSpentAbroad} years.
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              {timeSpentAbroad === "more-than" ? (
                <>
                  <FormField
                    control={form.control}
                    name="timeInItaly"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          How long are you planning to stay in Italy?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="more-than"
                                id="timeInItaly-more-than"
                              />
                              <Label htmlFor="timeInItaly-more-than">
                                I am planning to stay in Italy for at least 2
                                years.
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="less-than"
                                id="timeInItaly-less-than"
                              />
                              <Label htmlFor="timeInItaly-less-than">
                                I am planning to stay in Italy for less than 2
                                years.
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {timeInItaly === "more-than" ? (
                    <Alert className="bg-green-50 border-green-400">
                      <AlertTitle>You are eligible! 🎉</AlertTitle>
                      <AlertDescription>
                        <p>Yay! You are eligible for the facilitation.</p>
                        <br />
                        <p>
                          The facilitation consists of a 50% tax reduction (60%
                          if you have a minor child). You will take advantage of
                          the facilitation for a maximum of 5 years (8 years if
                          you bought a house in Italy before December 31, 2023).
                        </p>
                      </AlertDescription>
                    </Alert>
                  ) : timeInItaly === "less-than" ? (
                    <Alert className="bg-red-50 border-red-400">
                      <AlertTitle>You are not eligible</AlertTitle>
                      <AlertDescription>
                        You are required to stay in Italy for at least 2 years
                        to be eligible for the facilitation. If you leave Italy
                        before that time, you will have to pay back the
                        difference.
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </>
              ) : timeSpentAbroad === "less-than" ? (
                <Alert className="bg-red-50 border-red-400">
                  <AlertTitle>You are not eligible</AlertTitle>
                  <AlertDescription>
                    You are required to be a resident outside Italy for at least{" "}
                    {minimumYearsSpentAbroad} years to be eligible for the
                    facilitation.
                  </AlertDescription>
                </Alert>
              ) : null}
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
