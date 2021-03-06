import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { initializeApollo } from "../libs/apollo-client";
import { NotionPage } from "../components/NotionPage";
import AllCategory_query from "../queries/allCategories.graphql";
import { NotionAPI } from "notion-client";
import gql from "graphql-tag";
import { Footbar } from "../components/Footbar";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo();
    const categoryFetch = await apolloClient.query({
      query: gql`
        query {
          categoriesByName(search: "Index") {
            id
            name
            notionId
            notionType
            isEnable
            parentCategory {
              id
              name
              notionId
              notionType
            }
          }
        }
      `,
    });

    const allCategoryFetch = await apolloClient.query({
      query: AllCategory_query,
    });

    const catData = allCategoryFetch.data;
    const pageData = categoryFetch.data.categoriesByName.map(
      (category: { notionId: any }) => category.notionId
    );

    const pageId = pageData.toString();

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

function Home({
  recordMap,
  catData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Ash999</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="cQsyrhwamwGGMZZBoNgRkiRiMSyYP3R6eNWu2jPdRHQ"
        />
      </Head>
      <main className="antialiased">
        <Navbar catData={catData} />

        <div className="flex">
          <Sidebar catData={catData} />

          <NotionPage recordMap={recordMap} />
        </div>
        <Footbar />
      </main>
    </>
  );
}

export default Home;
