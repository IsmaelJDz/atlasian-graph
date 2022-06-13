import { format } from "date-fns";

import { PropsResponse } from "@/interfaces/index";

interface ChartDataSets {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor?: string;
}

export const serializePrice = (ctxData: PropsResponse) => {
  const labels: string[] = [];
  const datasets: ChartDataSets[] = [];

  ctxData.price.map((data) => {
    if (!labels.includes(format(new Date(data.dateExtraction), "MMM dd"))) {
      labels.push(format(new Date(data.dateExtraction), "MMM dd"));
    }
  });

  ctxData.price.map((data) => {
    if (!datasets.find((dataset) => dataset.label === data.name)) {
      datasets.push({
        label: data.name,
        data: ctxData.price
          .filter((dataId) => dataId.name === data.name)
          .map((data) => data.price),
        backgroundColor:
          data.name === "Cerveza XX Ambar 325 ml"
            ? "#FF6384"
            : data.name === "Cerveza Tecate Light 355 ml"
            ? "#7530B2"
            : data.name === "Cerveza XX Lager 355 ml"
            ? "#FFCE56"
            : "",
        borderColor:
          data.name === "Cerveza XX Ambar 325 ml"
            ? "#FF6384"
            : data.name === "Cerveza Tecate Light 355 ml"
            ? "#7530B2"
            : data.name === "Cerveza XX Lager 355 ml"
            ? "#FFCE56"
            : "",
      });
    }
  });

  const data = {
    labels,
    datasets,
  };

  return data;
};

export const serializePresence = (ctxData: PropsResponse) => {
  const labels: string[] = [];
  const presence: number[] = [];

  ctxData.presence.map((item) => {
    if (!labels.includes(item.name)) {
      labels.push(item.name);
    }
  });

  ctxData.presence.map((item) => {
    presence.push(item.presenceShare);
  });

  const data: any = {
    labels,
    datasets: [
      {
        backgroundColor: [
          "#D6215B",
          "#23B794",
          "#7530B2",
          "#FF7A00",
          "#006FFF",
        ],
        borderColor: ["#D6215B", "#23B794", "#7530B2", "#FF7A00", "#006FFF"],
        borderWidth: 1,
        data: presence,
        label: "Statistics",
      },
    ],
  };

  return data;
};
