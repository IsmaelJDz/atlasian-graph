import { Layout } from "@/components/layout";
import Comparative from "../Graphs/Comparative/Comparative";
import { Price } from "../Graphs/Price";
import { Products } from "../Graphs/Products";

import style from "./Home.module.css";

export const Home = () => {
  return (
    <Layout>
      <div className={style.Home}>
        <h1>General Performance Analysis</h1>
        <div className={style.HomeSections}>
          <div className={style.PriceContainer}>
            <Price />
          </div>
          <div className={style.ProductsContainer}>
            <Products />
          </div>
        </div>
        <h2>Comparative Analysis</h2>
        <Comparative />
      </div>
    </Layout>
  );
};
