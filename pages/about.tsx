import Head from "next/head";
import { Navbar } from "../components/Navbar";
import Image from "next/image";
import useDarkMode from "use-dark-mode";
import { Footbar } from "../components/Footbar";
function About() {
  const darkMode = useDarkMode(false, { classNameDark: "dark-mode" });

  const isDarkMode = darkMode.value;
  return (
    <>
      <Head>
        <title>About Ash999</title>
        <meta
          name="description"
          content="here is summary of my self aka about page"
        />
      </Head>
      <Navbar />

      <section
        className={`${
          isDarkMode ? "bg-darkBG text-darkTxt" : ""
        }   flex flex-col h-screen `}
      >
        <div className="flex flex-row mx-auto">
          <div className="h-48  w-48 md:h-64 md:w-64  relative m-4">
            <Image
              src="/robin.jpg"
              alt="Picture Of My Love"
              layout="fill"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
        </div>

        <div className="flex flex-row mx-auto">
          <p className="text-xl font-bold">Ash999</p>
        </div>
        <div className="flex flex-col mx-auto">
          <p className="text-base w-96">
            So I'm Ash999, I'm a programmer as showing in{" "}
            <a href="https://github.com/Gogeta999">Github</a>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah
          </p>
        </div>
      </section>
      <Footbar />
    </>
  );
}

export default About;
