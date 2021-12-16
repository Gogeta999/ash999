import type { InferGetStaticPropsType } from "next";
import AllCategory_query from "../queries/allCategories.graphql";

import { NotionAPI } from "notion-client";
import dynamic from "next/dynamic";
import { parsePageId } from "notion-utils";

import React from "react";
import { NotionPage } from "../components/NotionPage";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { initializeApollo } from "../libs/apollo-client";
import { Footbar } from "../components/Footbar";

export const getStaticProps = async (context: any) => {
  try {
    const apolloClient = initializeApollo();
    const allCategoryFetch = await apolloClient.query({
      query: AllCategory_query,
    });
    const catData = allCategoryFetch.data;

    console.log("Context Params", context.params);

    const rawPageId = context.params.pageId as string;

    console.log("RawPageID", rawPageId);

    const pageId = parsePageId(rawPageId);
    console.log("Parse PageID", pageId);

    const api = new NotionAPI();
    const recordMap = await api.getPage(pageId);

    return {
      props: {
        recordMap,
        catData,
      },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function DynamicPage({
  recordMap,
  catData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Modal = dynamic(
    //@ts-ignore
    () => import("react-notion-x").then((notion) => notion.Modal),
    { ssr: false }
  );

  const Equation = dynamic(
    // @ts-ignore
    () => import("react-notion-x").then((notion) => notion.Equation)
  );

  return (
    <>
      <main className="">
        <div className="flex ">
          <Navbar />
        </div>
        <div className="flex h-full">
          {/* <div className="absolute inset-0"> */}
          <Sidebar catData={catData} />
          {/* </div> */}
          <NotionPage recordMap={recordMap} />
        </div>
        <Footbar />
      </main>
    </>
  );
}
