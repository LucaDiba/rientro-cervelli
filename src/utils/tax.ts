import { Region } from "./region";

type TaxResult = {
  grossAnnualIncome: number;
  inpsTax: number;
  taxableIrpef: number;
  irpefTax: number;
  irpefRegionAddition: number;
  netIncome: number;
  overallTax: number;
  overallTaxRate: number;
};

export type TaxResults = {
  standard: TaxResult;
  impatriate: TaxResult;
};

export function getTaxResults({
  region,
  grossAnnualIncome,
  hasMinorChild,
}: {
  region: Region;
  grossAnnualIncome: number;
  hasMinorChild: boolean;
}): TaxResults {
  // INPS tax
  const inpsTax = getInpsTax(grossAnnualIncome);

  // Taxable IRPEF
  const impatriateFacilitation = hasMinorChild ? 0.6 : 0.5;
  const standardTaxableIrpef = grossAnnualIncome - inpsTax;
  const impatriateTaxableIrpef =
    standardTaxableIrpef < 600_000
      ? standardTaxableIrpef * (1 - impatriateFacilitation)
      : 600_000 * (1 - impatriateFacilitation) +
        (standardTaxableIrpef - 600_000);

  // IRPEF tax
  const standardIrpefTax = getIrpefTax(standardTaxableIrpef);
  const impatriateIrpefTax = getIrpefTax(impatriateTaxableIrpef);

  // IRPEF region addition
  const standardIrpefRegionAddition = getIrpefRegionAddition(
    standardTaxableIrpef,
    region
  );
  const impatriateIrpefRegionAddition = getIrpefRegionAddition(
    impatriateTaxableIrpef,
    region
  );

  // Net income
  const standardNetIncome =
    grossAnnualIncome -
    inpsTax -
    standardIrpefTax -
    standardIrpefRegionAddition;
  const impatriateNetIncome =
    grossAnnualIncome -
    inpsTax -
    impatriateIrpefTax -
    impatriateIrpefRegionAddition;

  // Overall tax rate
  const standardOverallTax = grossAnnualIncome - standardNetIncome;
  const impatriateOverallTax = grossAnnualIncome - impatriateNetIncome;

  const standardOverallTaxRate = standardOverallTax / grossAnnualIncome;
  const impatriateOverallTaxRate = impatriateOverallTax / grossAnnualIncome;

  return {
    standard: {
      grossAnnualIncome,
      inpsTax,
      taxableIrpef: standardTaxableIrpef,
      irpefTax: standardIrpefTax,
      irpefRegionAddition: standardIrpefRegionAddition,
      netIncome: standardNetIncome,
      overallTax: standardOverallTax,
      overallTaxRate: standardOverallTaxRate,
    },
    impatriate: {
      grossAnnualIncome,
      inpsTax,
      taxableIrpef: impatriateTaxableIrpef,
      irpefTax: impatriateIrpefTax,
      irpefRegionAddition: impatriateIrpefRegionAddition,
      netIncome: impatriateNetIncome,
      overallTax: impatriateOverallTax,
      overallTaxRate: impatriateOverallTaxRate,
    },
  };
}

type TaxBracket = {
  min: number;
  max: number;
  percent: number;
};

type TaxBrackets = Array<TaxBracket>;

function getTax({
  grossAmount,
  brackets,
}: {
  grossAmount: number;
  brackets: TaxBrackets;
}) {
  let tax = 0;
  let remainingAmount = grossAmount;

  for (const { min, max, percent } of brackets) {
    if (remainingAmount <= 0) {
      break;
    }

    const taxableAmount = Math.min(remainingAmount, max - min);
    tax += taxableAmount * (percent / 100);
    remainingAmount -= taxableAmount;
  }

  return tax;
}

// INPS

function getInpsTax(grossAmount: number) {
  return getTax({ grossAmount, brackets: inpsBrackets });
}

const inpsBrackets: TaxBrackets = [
  { min: 0, max: 47_380, percent: 9.19 },
  { min: 47_380, max: 103_055, percent: 10.19 },
];

// IRPEF

function getIrpefTax(grossAmount: number) {
  return getTax({ grossAmount, brackets: irpefBrackets });
}

const irpefBrackets: TaxBrackets = [
  { min: 0, max: 28_000, percent: 23 },
  { min: 28_000, max: 50_000, percent: 35 },
  { min: 50_000, max: Infinity, percent: 43 },
];

// IRPEF Region Addition

function getIrpefRegionAddition(grossAmount: number, region: Region) {
  const specialAddition = getIrpefRegionSpecialAddition(grossAmount, region);
  if (specialAddition !== null) {
    return specialAddition;
  }

  const regionIrpefBrackets = irpefRegionBrackets[region];

  return getTax({ grossAmount, brackets: regionIrpefBrackets });
}

function getIrpefRegionSpecialAddition(
  grossAmount: number,
  region: Region
): number | null {
  if (region === "LAZIO") {
    // È prevista un’aliquota agevolata del 1.73% a favore
    // dei contribuenti con un reddito imponibile ai fini
    // dell’addizionale regionale Irpef non superiore a
    // 35.000 euro.
    if (grossAmount <= 35_000) {
      return grossAmount * (1.73 / 100);
    }
  }

  if (region === "TRENTO") {
    // Ai contribuenti con un reddito imponibile non
    // superiore a euro 15.000 spetta una deduzione di
    // euro 15.000.
    if (grossAmount <= 15_000) {
      return 0;
    }
  }

  return null;
}

const irpefRegionBrackets = {
  ABRUZZO: [{ min: 0, max: Infinity, percent: 1.73 }],
  BASILICATA: [
    { min: 0, max: 55_000, percent: 1.23 },
    { min: 55_000, max: 75_000, percent: 1.73 },
    { min: 75_000, max: Infinity, percent: 2.33 },
  ],
  BOLZANO: [
    { min: 0, max: 35_000, percent: 0 },
    { min: 35_000, max: 75_000, percent: 1.23 },
    { min: 75_000, max: Infinity, percent: 1.73 },
  ],
  CALABRIA: [{ min: 0, max: Infinity, percent: 2.03 }],
  CAMPANIA: [{ min: 0, max: Infinity, percent: 2.03 }],
  EMILIA_ROMAGNA: [
    { min: 0, max: 15_000, percent: 1.33 },
    { min: 15_000, max: 28_000, percent: 1.93 },
    { min: 28_000, max: 55_000, percent: 2.03 },
    { min: 55_000, max: 75_000, percent: 2.23 },
    { min: 75_000, max: Infinity, percent: 2.33 },
  ],
  FRIULI_VENEZIA_GIULIA: [
    { min: 0, max: 15_000, percent: 0.7 },
    { min: 15_000, max: Infinity, percent: 1.23 },
  ],
  LAZIO: [
    { min: 0, max: 15_000, percent: 1.73 },
    { min: 15_000, max: 28_000, percent: 2.73 },
    { min: 28_000, max: 55_000, percent: 2.93 },
    { min: 55_000, max: 75_000, percent: 3.23 },
    { min: 75_000, max: Infinity, percent: 3.33 },
  ],
  LIGURIA: [
    { min: 0, max: 15_000, percent: 1.23 },
    { min: 15_000, max: 28_000, percent: 1.81 },
    { min: 28_000, max: 55_000, percent: 2.31 },
    { min: 55_000, max: 75_000, percent: 2.32 },
    { min: 75_000, max: Infinity, percent: 2.33 },
  ],
  LOMBARDIA: [
    { min: 0, max: 15_000, percent: 1.23 },
    { min: 15_000, max: 28_000, percent: 1.58 },
    { min: 28_000, max: 55_000, percent: 1.72 },
    { min: 55_000, max: 75_000, percent: 1.73 },
    { min: 75_000, max: Infinity, percent: 1.74 },
  ],
  MARCHE: [
    { min: 0, max: 15_000, percent: 1.23 },
    { min: 15_000, max: 28_000, percent: 1.53 },
    { min: 28_000, max: 55_000, percent: 1.7 },
    { min: 55_000, max: 75_000, percent: 1.72 },
    { min: 75_000, max: Infinity, percent: 1.73 },
  ],
  MOLISE: [
    { min: 0, max: 15_000, percent: 2.03 },
    { min: 15_000, max: 28_000, percent: 2.23 },
    { min: 28_000, max: 55_000, percent: 2.43 },
    { min: 55_000, max: 75_000, percent: 2.53 },
    { min: 75_000, max: Infinity, percent: 2.63 },
  ],
  PIEMONTE: [
    { min: 0, max: 15_000, percent: 1.62 },
    { min: 15_000, max: 28_000, percent: 2.13 },
    { min: 28_000, max: 55_000, percent: 2.75 },
    { min: 55_000, max: 75_000, percent: 3.32 },
    { min: 75_000, max: Infinity, percent: 3.33 },
  ],
  PUGLIA: [
    { min: 0, max: 15_000, percent: 1.33 },
    { min: 15_000, max: 28_000, percent: 1.43 },
    { min: 28_000, max: 55_000, percent: 1.71 },
    { min: 55_000, max: 75_000, percent: 1.72 },
    { min: 75_000, max: Infinity, percent: 1.73 },
  ],
  SARDEGNA: [{ min: 0, max: Infinity, percent: 1.23 }],
  SICILIA: [{ min: 0, max: Infinity, percent: 1.23 }],
  TOSCANA: [
    { min: 0, max: 15_000, percent: 1.42 },
    { min: 15_000, max: 28_000, percent: 1.43 },
    { min: 28_000, max: 55_000, percent: 1.68 },
    { min: 55_000, max: 75_000, percent: 1.72 },
    { min: 75_000, max: Infinity, percent: 1.73 },
  ],
  TRENTO: [
    { min: 0, max: 15_000, percent: 1.23 },
    { min: 15_000, max: 28_000, percent: 1.23 },
    { min: 28_000, max: 55_000, percent: 1.23 },
    { min: 55_000, max: 75_000, percent: 1.73 },
    { min: 75_000, max: Infinity, percent: 1.73 },
  ],
  UMBRIA: [
    { min: 0, max: 15_000, percent: 1.23 },
    { min: 15_000, max: 28_000, percent: 1.63 },
    { min: 28_000, max: 55_000, percent: 1.68 },
    { min: 55_000, max: 75_000, percent: 1.73 },
    { min: 75_000, max: Infinity, percent: 1.83 },
  ],
  VALLE_D_AOSTA: [{ min: 0, max: Infinity, percent: 1.23 }],
  VENETO: [{ min: 0, max: Infinity, percent: 1.23 }],
} as const satisfies Record<Region, TaxBrackets>;
