import fs from "fs";
import { initializeApollo } from "../libs/apollo-client";
import { categories as AllCategory_query } from "../queries/allCategories.graphql";

const Sitemap = () => {};
export const getServerSideProps = async ({ res }) => {
  const apolloClient = initializeApollo();

  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://ash999.xyz",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.tsx",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath.replace(/\.[^/.]+$/, "")}`;
    });

  const catData = await apolloClient.query({
    query: AllCategory_query,
  });

  const categories = catData?.data?.allCategories || [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticPages
            .map((url) => {
              return `
                <url>
                  <loc>${url}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `;
            })
            .join("")}
            ${categories
              .map((category) => {
                return `
              <url>
                <loc>${baseUrl}/${category.name}-${category.notionId}</loc>
                <lastmod>${category.lastModifiedTime}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
              })
              .join("")}
            })

            }
        </urlset>
      `;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  console.log("Static SiteMaps", staticPages);
  // console.log("Some Dynamic SiteMaps", categories);
  return {
    props: {},
  };
};

export default Sitemap;
