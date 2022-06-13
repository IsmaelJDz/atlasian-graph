import { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { MainContext } from "@/context/index";
import { ThreeDots as Skeleton } from "@/components/ui/Skeleton";

import { serializePresence } from "@/utils/index";
import { optionsPrice } from "@/constant/common";

import style from "./Products.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Products = () => {
  const { data: ctxData } = useContext(MainContext);
  const [presenceData, setPresenceData] = useState<any>([]);

  useEffect(() => {
    const data = serializePresence(ctxData);

    setPresenceData(data);
  }, [ctxData]);

  return (
    <>
      <h2>Presence Share by Product</h2>
      <div className={style.ProductsGraph}>
        {presenceData.labels?.length ? (
          <>
            <Pie options={optionsPrice} data={presenceData} />
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};
