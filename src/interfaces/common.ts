import {
  PriceEvolutionResponse,
  PresenceProductResponse,
  ComparativeTableProductResponse,
} from "./index";

export interface PropsResponse {
  price: PriceEvolutionResponse[];
  presence: PresenceProductResponse[];
  products: ComparativeTableProductResponse[];
}
