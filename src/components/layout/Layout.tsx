import Head from "next/head";
import { Navbar } from "@/components/ui/Nabvar";

interface Props {
  title?: string;
  children: React.ReactNode[] | React.ReactNode;
}

export const Layout = ({ title = "Atlasian Search", children }: Props) => {
  return (
    <>
      <Head>
        <meta name="author" content="Ismael R" charSet="utf-8" />
        <meta name="description" content={`${title}`} />
        <title> {title} </title>
      </Head>

      <Navbar />

      <main>{children}</main>
    </>
  );
};
