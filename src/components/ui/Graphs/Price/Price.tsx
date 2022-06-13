import { useState, useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MainContext } from "@/context/index";
import { ThreeDots as Skeleton } from "@/components/ui/Skeleton";

import { serializePrice } from "@/utils/index";
import { optionsProducts } from "@/constant/common";
import style from "./Price.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Price = () => {
  const { data: ctxData } = useContext(MainContext);
  const [priceData, setPriceData] = useState<any>([]);

  useEffect(() => {
    const data = serializePrice(ctxData);

    setPriceData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxData]);

  return (
    <>
      <h2>Price Evolution</h2>
      <div className={style.PriceGraph}>
        {priceData.labels?.length ? (
          <>
            <Line options={optionsProducts} data={priceData} />
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};
