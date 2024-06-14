"use client";

import { formatPercentage, formatPrice } from "@/utils/currency";
import { TaxResults } from "@/utils/tax";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HelpButton } from "./help-button";

export function ResultsTable({ results }: { results: TaxResults }) {
  return (
    <div className="mt-6">
      <div className="mt-4 space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className="text-right">Standard</TableHead>
              <TableHead className="text-right">Impatriate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-50">
              <TableCell>
                <HelpButton>
                  The gross annual income is the total amount of income received
                  by the employee in a year.
                </HelpButton>{" "}
                Gross Annual Income
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.standard.grossAnnualIncome)}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.impatriate.grossAnnualIncome)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <HelpButton>
                  INPS is the Italian public retirement system.
                </HelpButton>{" "}
                INPS
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.standard.inpsTax)}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.impatriate.inpsTax)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>
                <HelpButton>
                  The taxable IRPEF is the amount of income that is subject to
                  the IRPEF (Italian Personal Income Tax).
                  <br />
                  The standard taxable amount corresponds to the gross annual
                  income minus the INPS tax.
                  <br />
                  With the impatriate regime, the taxable amount corresponds to
                  the standard taxable amount with a 50% deduction (or 60%
                  deduction if the impatriate has minor children).
                </HelpButton>{" "}
                Taxable IRPEF
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.standard.taxableIrpef)}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.impatriate.taxableIrpef)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <HelpButton>
                  The IRPEF is the Italian Personal Income Tax. It is calculated
                  based on the taxable IRPEF.
                </HelpButton>{" "}
                IRPEF
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.standard.irpefTax)}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.impatriate.irpefTax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <HelpButton>
                  The additional IRPEF is a regional tax on personal income. It
                  varies by region. It is calculated based on the taxable IRPEF.
                </HelpButton>{" "}
                Additional IRPEF (region)
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.standard.irpefRegionAddition)}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.impatriate.irpefRegionAddition)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-blue-100">
              <TableCell>
                <HelpButton>
                  The net income is the amount of income that remains after
                  taxes have been deducted. This is the amount that the employee
                  receives.
                </HelpButton>{" "}
                Net Income
              </TableCell>
              <TableCell className="text-right font-bold">
                {formatPrice(results.standard.netIncome)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {formatPrice(results.impatriate.netIncome)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <HelpButton>
                  The overall tax is the total amount of taxes paid by the
                  employee. This includes the INPS, IRPEF, and additional IRPEF.
                </HelpButton>{" "}
                Taxes
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.standard.overallTax)}
                <br />
                {formatPercentage(results.standard.overallTaxRate)}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.impatriate.overallTax)}
                <br />
                {formatPercentage(results.impatriate.overallTaxRate)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
