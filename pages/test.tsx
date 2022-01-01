import { gql } from "@apollo/client";
import { InferGetStaticPropsType, GetStaticProps } from "next";
import { NotionAPI } from "notion-client";
import { Footbar } from "../components/Footbar";
import { Navbar } from "../components/Navbar";
import { NotionPage } from "../components/NotionPage";
import { Sidebar } from "../components/Sidebar";
import { initializeApollo } from "../libs/apollo-client";
import AllCategory_query from "../queries/allCategories.graphql";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo();

    const allCategoryFetch = await apolloClient.query({
      query: AllCategory_query,
    });

    const catData = allCategoryFetch.data;
    const pageId = "Python-4333ae54c44c4662a06eab77fe422f14";

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

function A({
  recordMap,
  catData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <main className="antialiased">
        <Navbar />

        <div className="flex">
          <Sidebar catData={catData} />

          <NotionPage recordMap={recordMap} />
        </div>
        <Footbar />
      </main>
    </>
  );
}

export default A;
