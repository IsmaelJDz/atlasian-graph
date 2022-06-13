import { useContext, useState, useEffect } from "react";

import { columns } from "@/components/ui/Table/Settings";
import { Table } from "@/components/ui/Table";
import { ThreeDots as Skeleton } from "@/components/ui/Skeleton";

import { MainContext } from "@/context/index";

import style from "./Comparative.module.css";

const Comparative = () => {
  const { data: ctxData } = useContext(MainContext);
  const [comparativeData, setComparativeData] = useState<any>([]);

  useEffect(() => {
    setComparativeData(ctxData.products);
  }, [ctxData]);

  return (
    <div style={{ overflowX: "scroll" }}>
      {comparativeData?.length ? (
        <>
          <Table
            columns={columns()}
            data={comparativeData}
            fixedHeader
            border={true}
          />
        </>
      ) : (
        <div className={style.SkeletonContainer}>
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default Comparative;
