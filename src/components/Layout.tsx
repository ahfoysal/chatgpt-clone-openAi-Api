import React from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  title = `PewdsGPT - ${title}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="PewdsGpt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* <Sidebar /> */}

      <main className="pt-12 md:pt-0   relative flex flex-col flex-1 h-screen">
        <div className="flex-1">
          <div className="flex flex-col h-full">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
