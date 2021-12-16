import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import * as types from "../../@types/types";

export const Page404: React.FC<types.PageProps> = ({ site, pageId, error }) => {
  const title = site?.name || "Page Not Found";

  return (
    <>
      <Head>
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        {/* Here is Site Tab Name */}
        <title>{title}</title>
      </Head>

      <main className="flex flex-col">
        <div className="flex flex-col">
          <Link href="/">
            <img
              // Show when page not found
              src="/404.png"
              alt="404 Not Found"
              className="object-cover h-80 h-80 mx-auto "
            />
          </Link>
        </div>
        <div className="flex flex-col mx-auto">
          <p className="text-base w-96">
            Seem like there is no resources for this page
          </p>
        </div>
      </main>
    </>
  );
};
