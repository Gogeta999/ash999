import Head from "next/head";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
import useDarkMode from "use-dark-mode";
import { useEffect, useState } from "react";
import { CarouselData } from "../components/carousel/CarouselData";
import { initializeApollo } from "../libs/apollo-client";
import AllCategory_query from "../queries/allCategories.graphql";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Carousel from "../components/carousel/Carousel";
import { Footbar } from "../components/Footbar";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo();
    const allCategoryFetch = await apolloClient.query({
      query: AllCategory_query,
    });

    const catData = allCategoryFetch.data;

    return {
      props: {
        catData,
      },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
};

function Me({ catData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const darkMode = useDarkMode(false, { classNameDark: "dark-mode" });

  const isDarkMode = darkMode.value;

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>About Ash999</title>
        <meta
          name="description"
          content="here is summary of my self aka about page"
        />
      </Head>
      <Navbar catData={catData} />
      {hasMounted ? (
        <section
          className={`${
            isDarkMode ? "bg-darkBG text-darkTxt" : ""
          }   flex flex-col h-screen overflow-x-hidden`}
        >
          <div className="flex flex-row mx-auto">
            <div className="h-48  w-48 md:h-64 md:w-64  relative m-4">
              <Image
                src="/robin.jpg"
                alt="Picture Of My Love"
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-full "
              />
            </div>
          </div>

          <div className="flex flex-row mx-auto">
            <p className="text-3xl font-bold">Ash999</p>
          </div>
          <div className="flex flex-col mx-auto">
            <p className="text-sm md:text-xl m-2">
              I'm Ash999, I'm a human and i will write something when i want to
              write in this blog.
            </p>
          </div>
        </section>
      ) : null}

      <Footbar />
    </>
  );
}

export default Me;
