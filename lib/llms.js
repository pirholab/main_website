import blogData from "../db/blogs.json";
import { WorksWithSlug as Works } from "../db/works";

// Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the site's own data,
// so AI assistants get an accurate, up-to-date summary of PiRhoTech.

const BASE_URL = "https://pirhotech.com";

const projects = () => Works.filter((e) => e.image);

const htmlToText = (html) =>
  html
    .replace(/<h2>/g, "\n\n## ")
    .replace(/<h3>/g, "\n\n### ")
    .replace(/<li>/g, "\n- ")
    .replace(/<\/p>/g, "\n")
    .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (_, href, text) =>
      `[${text}](${href.startsWith("/") ? BASE_URL + href : href})`
    )
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const ABOUT = `# PiRhoTech

> PiRhoTech is a software development company in Dhaka, Bangladesh. We build custom web apps, Flutter mobile apps, AI chatbots, business automation and Shopify apps for startups and growing businesses. International clients work with the same team through Solidy.io (https://solidy.io).

- Founder & CEO: Farhan Sadik
- Location: Dhaka, Bangladesh; clients worldwide
- Contact: hello@pirhotech.com or ${BASE_URL}/contact
- Tech: Flutter, Kotlin, React, Next.js, Vue/Nuxt, Node.js, Laravel, ASP.NET, AI/LLM integrations

## Services

- Custom web application and SaaS development
- Mobile app development (Flutter for iOS and Android, native Android)
- AI chatbots and AI features for websites, WhatsApp and Messenger
- Business process automation and API integrations
- Shopify app and admin dashboard development
- UI/UX design, branding and ongoing maintenance`;

export function buildLlmsTxt() {
  return `${ABOUT}

## Main pages

- [Home](${BASE_URL}/): Overview of PiRhoTech and its services
- [Projects](${BASE_URL}/projects): Portfolio of web, mobile and AI projects
- [About](${BASE_URL}/about): The team behind PiRhoTech
- [Contact](${BASE_URL}/contact): Request a free project consultation
- [Blog](${BASE_URL}/blogs): Guides on software, AI and automation

## Case studies

${projects().map((p) => `- [${p.title}](${BASE_URL}/works/${p.slug})`).join("\n")}

## Blog

${blogData.map((b) => `- [${b.title}](${BASE_URL}/blog/${b.slug}): ${b.description}`).join("\n")}

## Optional

- [Full content for AI assistants](${BASE_URL}/llms-full.txt)
- [Solidy.io](https://solidy.io): PiRhoTech's brand for international clients
`;
}

export function buildLlmsFullTxt() {
  const caseStudies = projects()
    .map((p) =>
      [
        `## ${p.title}`,
        `URL: ${BASE_URL}/works/${p.slug}`,
        p.tags?.length ? `Tags: ${p.tags.join(", ")}` : "",
        p.description || "",
        p.overview || "",
      ]
        .filter(Boolean)
        .join("\n\n")
    )
    .join("\n\n---\n\n");

  const posts = blogData
    .map((b) => `## ${b.title}\n\nURL: ${BASE_URL}/blog/${b.slug}\n\n${b.description}\n\n${htmlToText(b.content)}`)
    .join("\n\n---\n\n");

  return `${ABOUT}

# Case studies

${caseStudies}

# Blog posts

${posts}
`;
}

export function sendText(res, body) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(body);
  res.end();
}
