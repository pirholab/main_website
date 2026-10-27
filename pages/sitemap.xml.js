import blogData from "../db/blogs.json";
import { WorksWithSlug as Works } from "../db/works";

const BASE_URL = "https://pirhotech.com";

const STATIC_PATHS = ["", "/about", "/projects", "/blogs", "/contact", "/coverpagegenerator", "/privacy"];

function buildSitemap() {
  const urls = [
    ...STATIC_PATHS,
    ...Works.filter((e) => e.image).map((e) => `/works/${e.slug}`),
    ...blogData.map((blog) => `/blog/${blog.slug}`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;
}

export const getServerSideProps = ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
