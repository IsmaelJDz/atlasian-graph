import Image from "next/image";
export const NOT_IMAGE = "/images/sin-imagen.jpg";

const RenderImage = ({ src, height, width, alt }: any) => (
  <Image
    className="w-full h-full rounded shadow"
    src={src ?? NOT_IMAGE}
    width={height}
    height={width}
    alt={alt}
    objectFit="cover"
  />
);

export const columns = () => [
  {
    name: "Name",
    accessor: (row: any) => row,
    cell: ({ name, productImage }: any) => (
      <div className="ml-3 image-text">
        <div>
          <RenderImage src={productImage} height={80} width={80} alt={name} />
        </div>
        <p className="red">{name ?? "-"}</p>
      </div>
    ),
  },
  {
    name: "Sku",
    accessor: "sku",
    cell: (sku: any) => (
      <div className="text-center th-title">{sku ?? "-"}</div>
    ),
  },
  {
    name: "% Presence",
    accessor: "persistence",
    cell: (persistence: any) => (
      <div
        className={
          persistence < 0
            ? "text-center negative bold"
            : "text-center positive bold"
        }
      >
        {persistence + "%" ?? "-"}
      </div>
    ),
  },
  {
    name: "Av. Price",
    accessor: "averagePrice",
    cell: (averagePrice: any) => (
      <div className="text-center">{averagePrice ?? "-"}</div>
    ),
  },
  {
    name: "Av. Position",
    accessor: "averagePrice",
    cell: (averagePosition: any) => (
      <div className="text-center">{averagePosition ?? "-"}</div>
    ),
  },
];
