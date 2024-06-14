type TaxResult = {
  grossAnnualIncome: number;
  inpsTax: number;
  taxableIrpef: number;
  irpefTax: number;
  netIncome: number;
};

export type TaxResults = {
  standard: TaxResult;
  impatriate: TaxResult;
};

export function getTaxResults({
  grossAnnualIncome,
}: {
  grossAnnualIncome: number;
}): TaxResults {
  // INPS tax
  const inpsTax = getInpsTax(grossAnnualIncome);

  // Taxable IRPEF
  const standardTaxableIrpef = grossAnnualIncome - inpsTax;
  const impatriateTaxableIrpef = standardTaxableIrpef * 0.5;

  // IRPEF tax
  const standardIrpefTax = getIrpefTax(standardTaxableIrpef);
  const impatriateIrpefTax = getIrpefTax(impatriateTaxableIrpef);

  // Net income
  const standardNetIncome = grossAnnualIncome - inpsTax - standardIrpefTax;
  const impatriateNetIncome = grossAnnualIncome - inpsTax - impatriateIrpefTax;

  return {
    standard: {
      grossAnnualIncome,
      inpsTax,
      taxableIrpef: standardTaxableIrpef,
      irpefTax: standardIrpefTax,
      netIncome: standardNetIncome,
    },
    impatriate: {
      grossAnnualIncome,
      inpsTax,
      taxableIrpef: impatriateTaxableIrpef,
      irpefTax: impatriateIrpefTax,
      netIncome: impatriateNetIncome,
    },
  };
}

type Brackets = Array<{ min: number; rate: number }>;

const inpsBrackets: Brackets = [
  { min: 0, rate: 9.19 / 100 },
  { min: 47_380, rate: 10.19 / 100 },
  { min: 103_056, rate: 0 },
];

const irpefBrackets: Brackets = [
  { min: 0, rate: 23 / 100 },
  { min: 28_000, rate: 35 / 100 },
  { min: 50_000, rate: 43 / 100 },
];

function getInpsTax(grossAmount: number) {
  return getTax({ grossAmount, brackets: inpsBrackets });
}

function getIrpefTax(grossAmount: number) {
  return getTax({ grossAmount, brackets: irpefBrackets });
}

function getTax({
  grossAmount,
  brackets,
}: {
  grossAmount: number;
  brackets: Brackets;
}) {
  let tax = 0;
  let remainingAmount = grossAmount;
  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    if (remainingAmount <= 0) {
      break;
    }
    const taxableAmount = Math.min(
      remainingAmount,
      bracket.min - (brackets[i - 1]?.min ?? 0)
    );
    tax += taxableAmount * bracket.rate;
    remainingAmount -= taxableAmount;
  }
  return tax;
}
