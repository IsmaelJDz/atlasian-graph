import { useContext, useEffect } from "react";
import { GetStaticProps } from "next";

import {
  PriceEvolutionResponse,
  PresenceProductResponse,
  ComparativeTableProductResponse,
} from "@/interfaces/index";

interface PropsResponse {
  price: PriceEvolutionResponse[];
  presence: PresenceProductResponse[];
  products: ComparativeTableProductResponse[];
}

interface Props {
  data: PropsResponse;
}

import { Home } from "@/components/ui/Home";
import { MainContext } from "@/context/index";

/**
 *
 * @param {*} props gets data from api, server to client SSR
 * @returns Component -> Principal
 */

export default function Main({ data }: Props) {
  const { setDataResponse } = useContext(MainContext);

  useEffect(() => {
    setDataResponse(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Home />;
}

export const getStaticProps: GetStaticProps = async () => {
  const fetcher = async (path: string): Promise<PropsResponse> => {
    let response = await fetch(
      "https://atlantia-dev-test.herokuapp.com/api/" + path
    );
    return await response.json();
  };

  const response = async function getData() {
    try {
      let [price, presence, products] = await Promise.all([
        fetcher("price-evolution-chart/"),
        fetcher("presence-share-chart/"),
        fetcher("beer-products/"),
      ]);

      return { price, presence, products };
    } catch (error) {
      console.error("error: " + error);
    }
  };

  const data = await response();

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
        permanent: false,
      },
    };
  }

  if (Object.keys(data).length === 0) {
    return { notFound: true };
  }

  return {
    props: { data },
  };
};
