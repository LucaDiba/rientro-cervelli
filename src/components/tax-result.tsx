"use client";

import { formatPrice } from "@/utils/currency";
import { TaxResults } from "@/utils/tax";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
              <TableCell>Gross Annual Income</TableCell>
              <TableCell className="text-right">
                {formatPrice(results.standard.grossAnnualIncome)}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.impatriate.grossAnnualIncome)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INPS</TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.standard.inpsTax)}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.impatriate.inpsTax)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Taxable IRPEF</TableCell>
              <TableCell className="text-right">
                {formatPrice(results.standard.taxableIrpef)}
              </TableCell>
              <TableCell className="text-right">
                {formatPrice(results.impatriate.taxableIrpef)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IRPEF</TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.standard.irpefTax)}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {formatPrice(-results.impatriate.irpefTax)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-blue-100">
              <TableCell>Net Income</TableCell>
              <TableCell className="text-right font-bold">
                {formatPrice(results.standard.netIncome)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {formatPrice(results.impatriate.netIncome)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
