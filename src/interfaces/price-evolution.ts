export interface PriceEvolutionResponse {
  sku: string;
  name: Name;
  price: number;
  dateExtraction: string;
}

export enum Name {
  CervezaTecateLight355Ml = "Cerveza Tecate Light 355 ml",
  CervezaXXAmbar325Ml = "Cerveza XX Ambar 325 ml",
  CervezaXXLager355Ml = "Cerveza XX Lager 355 ml",
}
