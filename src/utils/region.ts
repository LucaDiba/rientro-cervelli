import { z } from "zod";

export const RegionSchema = z.enum([
  "ABRUZZO",
  "BASILICATA",
  "BOLZANO",
  "CALABRIA",
  "CAMPANIA",
  "EMILIA_ROMAGNA",
  "FRIULI_VENEZIA_GIULIA",
  "LAZIO",
  "LIGURIA",
  "LOMBARDIA",
  "MARCHE",
  "MOLISE",
  "PIEMONTE",
  "PUGLIA",
  "SARDEGNA",
  "SICILIA",
  "TOSCANA",
  "TRENTO",
  "UMBRIA",
  "VALLE_D_AOSTA",
  "VENETO",
]);

export type Region = z.infer<typeof RegionSchema>;

export const RegionDisplayNames: Record<Region, string> = {
  ABRUZZO: "Abruzzo",
  BASILICATA: "Basilicata",
  BOLZANO: "Bolzano",
  CALABRIA: "Calabria",
  CAMPANIA: "Campania",
  EMILIA_ROMAGNA: "Emilia Romagna",
  FRIULI_VENEZIA_GIULIA: "Friuli Venezia Giulia",
  LAZIO: "Lazio",
  LIGURIA: "Liguria",
  LOMBARDIA: "Lombardia",
  MARCHE: "Marche",
  MOLISE: "Molise",
  PIEMONTE: "Piemonte",
  PUGLIA: "Puglia",
  SARDEGNA: "Sardegna",
  SICILIA: "Sicilia",
  TOSCANA: "Toscana",
  TRENTO: "Trento",
  UMBRIA: "Umbria",
  VALLE_D_AOSTA: "Valle d'Aosta",
  VENETO: "Veneto",
};
