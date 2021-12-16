import { InferGetStaticPropsType, GetStaticProps } from "next";
import { Navbar } from "../components/Navbar";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 10,
  };
};

function A({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <p>Ash999's Test Field</p>
      </div>
    </>
  );
}

export default A;
