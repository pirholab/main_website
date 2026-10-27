"""Source for db/blogs.json. Edit posts here, then run: python3 scripts/blogs-source.py"""
import json
import pathlib

AUTHOR = "Farhan Sadik"
DATE = "2026-10-27"

POSTS = [
    {
        "title": "How Much Does It Cost to Build a Mobile App in 2026?",
        "slug": "mobile-app-development-cost",
        "description": "A founder's breakdown of what really drives mobile app development cost, why Flutter saves money, and how to scope an MVP without overspending.",
        "tags": ["Mobile App Development", "Flutter", "Startups"],
        "image": "/blog-covers/mobile-app-development-cost.png",
        "content": """
<p>"How much will my app cost?" is the first question almost every founder asks us, and the honest answer is: it depends on a handful of decisions you can control. After building apps like <a href="/works/kormi-koi-find-trusted-service-providers">Kormi Koi</a>, <a href="/works/cover-page-generator">Cover Page Generator</a> and <a href="/works/nanoscan-pdf-scanner-tools">NanoScan</a>, here is how we think about app cost at PiRhoTech.</p>

<h2>The 5 things that decide your app development cost</h2>
<h3>1. Number of platforms</h3>
<p>Building separate native apps for iOS and Android means two codebases and two teams. With <strong>Flutter</strong>, one codebase runs on both, which usually cuts build and maintenance effort significantly. Most of our client apps are built in Flutter for exactly this reason.</p>

<h3>2. Real-time features</h3>
<p>Live location tracking, chat and instant notifications need WebSockets, background services and careful testing. In Kormi Koi, real-time tracking and chat were among the most engineering-heavy parts of the project.</p>

<h3>3. Payments, wallets and verification</h3>
<p>An in-app wallet, payment gateway integration or identity verification (e-KYC) adds security work, compliance checks and edge cases. These are worth it when trust is your product, but they should be planned from day one.</p>

<h3>4. Admin dashboard and backend</h3>
<p>Founders often forget that every app needs a backend and an admin panel to manage users, content and payments. This is frequently 30–40% of the total work.</p>

<h3>5. Design quality</h3>
<p>A custom UI/UX design with prototypes costs more upfront but reduces rework later. Skipping design usually costs more in development changes.</p>

<h2>Typical app tiers</h2>
<ul>
<li><strong>Simple utility app</strong> (offline tool, few screens, no accounts): the smallest budget and the fastest build. Example: a document or PDF tool.</li>
<li><strong>MVP with accounts and backend</strong>: login, profiles, a core workflow, admin panel and push notifications.</li>
<li><strong>Marketplace or real-time platform</strong>: two user types, bidding or booking, chat, tracking, payments. The biggest budget, built in phases.</li>
</ul>

<h2>How to keep your app budget under control</h2>
<ol>
<li><strong>Start with one core workflow.</strong> Launch the one thing users pay for, then add features based on real usage.</li>
<li><strong>Choose Flutter</strong> unless you need deep platform-specific features.</li>
<li><strong>Use proven services</strong> (authentication, payments, maps) instead of building them from scratch.</li>
<li><strong>Get a fixed-scope MVP quote</strong> with clear milestones so you know exactly what you are paying for.</li>
</ol>

<h2>Get a real estimate for your app</h2>
<p>Every app is different, so the fastest way to a reliable number is a short scoping call. <a href="/contact">Tell us about your app idea</a> and we will send you a feature breakdown, timeline and quote. International clients can also reach our team through <a href="https://solidy.io">Solidy.io</a>.</p>
""",
    },
    {
        "title": "How We Built Kormi Koi: A Real-Time Service Marketplace App in Flutter",
        "slug": "building-service-marketplace-app-flutter",
        "description": "A case study on building an on-demand service marketplace with real-time tracking, bidding, e-KYC verification and an in-app wallet using Flutter, Express.js and MongoDB.",
        "tags": ["Case Study", "Flutter", "Marketplace App"],
        "image": "/kormikoi/banner.png",
        "content": """
<p>Finding a trusted plumber or electrician is still mostly word of mouth. <a href="/works/kormi-koi-find-trusted-service-providers">Kormi Koi</a> set out to fix that: one platform where people post a job, compare bids from verified professionals and track them in real time. Here is how our team built it.</p>

<h2>The problem</h2>
<p>The local service industry is fragmented. Customers don't know who to trust, and skilled workers struggle to find steady jobs. The app needed to build <strong>trust and transparency</strong> on both sides.</p>

<h2>Key features we built</h2>
<ul>
<li><strong>Job posting and bidding:</strong> customers post detailed requests, compare bids and choose professionals based on ratings and profiles.</li>
<li><strong>Real-time location tracking:</strong> customers see the provider on the way, just like a ride-hailing app.</li>
<li><strong>One app, two roles:</strong> seamless account switching lets a user be a customer and a service provider in the same app.</li>
<li><strong>e-KYC verification:</strong> workers are verified before they can take jobs, which is the core of the trust model.</li>
<li><strong>In-app wallet:</strong> secure payments between customers and providers.</li>
<li><strong>Real-time chat</strong> and role-based access control.</li>
</ul>

<h2>Tech stack</h2>
<ul>
<li><strong>Flutter</strong> for iOS and Android from one codebase</li>
<li><strong>Express.js microservices</strong> so each part (jobs, payments, chat) can scale independently</li>
<li><strong>MongoDB</strong> for flexible job and profile data</li>
<li><strong>WebSockets</strong> for live tracking and chat</li>
</ul>

<h2>What we learned building a marketplace app</h2>
<ol>
<li><strong>Trust features come first.</strong> Verification and ratings matter more than any visual feature in a two-sided marketplace.</li>
<li><strong>Design both sides of the marketplace separately.</strong> Providers and customers have very different daily workflows.</li>
<li><strong>Real-time is an infrastructure decision.</strong> Planning WebSocket architecture early avoided a painful rewrite later.</li>
</ol>

<h2>Building a marketplace or on-demand app?</h2>
<p>If you are planning a service marketplace, booking platform or on-demand app, we have done the hard parts before. <a href="/contact">Book a free consultation</a> with PiRhoTech, or with <a href="https://solidy.io">Solidy.io</a> if you are outside Bangladesh.</p>
""",
    },
    {
        "title": "AI Chatbots for Small Business: What They Can and Can't Do",
        "slug": "ai-chatbot-for-small-business",
        "description": "A practical guide to AI chatbots for small businesses: real use cases, limits, costs to consider and how to launch one that actually helps customers.",
        "tags": ["AI Chatbots", "Automation", "Small Business"],
        "image": "/blog-covers/ai-chatbot-for-small-business.png",
        "content": """
<p>Modern AI chatbots are no longer the frustrating "press 1 for sales" bots of the past. Built properly, an AI assistant can answer customers in natural language, 24/7, using your own business information. Built badly, it annoys customers and gives wrong answers. Here is the honest picture.</p>

<h2>What an AI chatbot can do well</h2>
<ul>
<li><strong>Answer repetitive questions</strong> about pricing, opening hours, delivery, policies and services, around the clock.</li>
<li><strong>Capture and qualify leads</strong> after hours, asking the right questions before passing them to your team.</li>
<li><strong>Book appointments</strong> directly into your calendar.</li>
<li><strong>Track orders</strong> and give status updates by connecting to your store or database.</li>
<li><strong>Work across channels:</strong> your website, WhatsApp, Facebook Messenger and more.</li>
</ul>

<h2>What it should not do alone</h2>
<ul>
<li>Handle complaints, refunds or sensitive situations without a human handoff.</li>
<li>Invent answers. A good chatbot is grounded in your real documents and says "let me connect you to the team" when it doesn't know.</li>
<li>Replace your team. It removes repetitive work so your people can focus on customers who need them.</li>
</ul>

<h2>Best businesses for AI chatbots</h2>
<p>Clinics, real estate agencies, e-commerce stores, education providers, travel agencies and service businesses. In other words, any business that gets the same 20 questions every day and loses leads after office hours.</p>

<h2>How we build AI chatbots at PiRhoTech</h2>
<ol>
<li><strong>Collect your knowledge:</strong> FAQs, service pages, policies and price lists.</li>
<li><strong>Design the conversation:</strong> what the bot answers, what it asks and when it hands off to a human.</li>
<li><strong>Connect your tools:</strong> calendar, CRM, store or database.</li>
<li><strong>Test with real questions</strong> from your customers before launch.</li>
<li><strong>Monitor and improve</strong> using real conversations after launch.</li>
</ol>

<h2>Want an AI assistant for your business?</h2>
<p><a href="/contact">Contact PiRhoTech</a> for a free consultation. We will tell you honestly whether a chatbot makes sense for your business, and what it would take. International clients can work with us through <a href="https://solidy.io">Solidy.io</a>.</p>
""",
    },
    {
        "title": "10 Business Processes You Should Automate First",
        "slug": "business-process-automation-examples",
        "description": "Ten practical business process automation examples, from lead follow-up to invoicing and reporting, that save small teams hours every week.",
        "tags": ["Automation", "Business Process Automation", "Productivity"],
        "image": "/blog-covers/business-process-automation-examples.png",
        "content": """
<p>Most growing businesses lose hours every week copying data between tools, sending the same emails and building the same reports. Business process automation fixes that. Here are the ten processes we recommend automating first, because they are frequent, rule-based and easy to measure.</p>

<h2>Sales and customers</h2>
<ol>
<li><strong>Lead capture to CRM:</strong> website forms, Facebook leads and emails go straight into your CRM with no copy-pasting.</li>
<li><strong>Instant lead follow-up:</strong> every new lead gets a personalised reply within minutes, even at night.</li>
<li><strong>Appointment reminders:</strong> automatic SMS, WhatsApp or email reminders reduce no-shows.</li>
<li><strong>Customer support triage:</strong> an AI assistant answers common questions and routes the rest to the right person.</li>
</ol>

<h2>Operations</h2>
<ol start="5">
<li><strong>Order processing:</strong> new orders automatically update inventory, notify the warehouse and send confirmations.</li>
<li><strong>Inventory alerts:</strong> get notified before stock runs out, not after.</li>
<li><strong>Employee onboarding:</strong> accounts, documents and welcome emails created from one form.</li>
</ol>

<h2>Finance and reporting</h2>
<ol start="8">
<li><strong>Invoicing and payment reminders:</strong> invoices are generated and followed up automatically.</li>
<li><strong>Data sync between systems:</strong> keep your store, accounting software and spreadsheets consistent.</li>
<li><strong>Weekly reports:</strong> sales, ads and operations numbers delivered to your inbox every Monday.</li>
</ol>

<h2>How to choose what to automate</h2>
<p>Pick the task that is <strong>repeated often</strong>, <strong>follows clear rules</strong> and <strong>causes problems when done late or wrong</strong>. Measure the hours it takes today, automate it, and measure again.</p>

<h2>Tools vs. custom automation</h2>
<p>Tools like Zapier, Make and n8n handle many simple workflows. When you need complex logic, AI decision-making or integration with your own software, custom automation and API integrations are more reliable and cheaper at scale.</p>

<h2>Get a free automation audit</h2>
<p>Our team will review your workflows and show you which processes to automate first and how much time you could save. <a href="/contact">Book your free audit</a>, or reach us through <a href="https://solidy.io">Solidy.io</a> if you are an international business.</p>
""",
    },
    {
        "title": "Building a Shopify App Admin Dashboard: Lessons from Boomerang Magic",
        "slug": "shopify-app-development-admin-dashboard",
        "description": "What goes into a Shopify app admin dashboard: revenue tracking, billing, roles and permissions, email templates and promo codes, based on our work on Boomerang Magic.",
        "tags": ["Shopify App Development", "SaaS", "Case Study"],
        "image": "/blog-covers/shopify-app-development-admin-dashboard.png",
        "content": """
<p>Building a Shopify app is not only about the features merchants see. Behind every successful app is an admin dashboard where the app team tracks revenue, manages installs, handles billing and supports merchants. Our team built this kind of control centre for <strong>Boomerang Magic</strong>, a Shopify SaaS app. Here is what we learned.</p>

<h2>What a Shopify app admin dashboard needs</h2>
<h3>Revenue and install tracking</h3>
<p>A clear view of recurring revenue and active shop installations is your mission control. You should see at a glance which shops installed, which churned and how revenue is trending.</p>

<h3>Team management with granular permissions</h3>
<p>As your app grows, support staff, developers and marketers all need access, but not to everything. Role-based permissions and activity tracking keep sensitive data safe.</p>

<h3>Communication tools</h3>
<p>Built-in email and notification template editors let your team update onboarding and billing emails without a developer.</p>

<h3>Billing and subscriptions</h3>
<p>A robust billing engine handles plans, upgrades, downgrades and failed payments, and it has to work correctly with Shopify's billing API.</p>

<h3>Growth tools</h3>
<p>Promo code generation and detailed transaction reporting help you run campaigns and understand your numbers.</p>

<h2>Lessons for Shopify app founders</h2>
<ol>
<li><strong>Build the admin early.</strong> Without it, your team ends up running the business from spreadsheets and database queries.</li>
<li><strong>Treat billing as a core feature</strong>, not an afterthought. Billing bugs cost revenue and trust.</li>
<li><strong>Design permissions before you hire.</strong> Adding roles later is much harder than starting with them.</li>
</ol>

<h2>Need a Shopify app or custom Shopify automation?</h2>
<p>We build Shopify apps, admin dashboards and store automations. <a href="https://solidy.io">Talk to our team at Solidy.io</a> or <a href="/contact">contact PiRhoTech</a> for a free consultation.</p>
""",
    },
    {
        "title": "Why Startups Choose a Software Development Company in Bangladesh",
        "slug": "software-development-company-in-bangladesh",
        "description": "Why startups and SMBs outsource software development to Bangladesh, what to look for in a development partner, and how PiRhoTech and Solidy.io work with clients worldwide.",
        "tags": ["Outsourcing", "Software Development", "Bangladesh"],
        "image": "/blog-covers/software-development-company-in-bangladesh.png",
        "content": """
<p>Bangladesh has become one of the world's fastest-growing destinations for software development and IT services. For startups and growing businesses, working with a software development company in Bangladesh can mean senior-level quality at a startup-friendly cost. Here is what to know, and how to choose the right partner.</p>

<h2>Why companies outsource software development to Bangladesh</h2>
<ul>
<li><strong>Cost-effective expertise:</strong> experienced engineers at rates that let startups build more with the same budget.</li>
<li><strong>Modern tech skills:</strong> Flutter, React, Next.js, Node.js, Laravel, AI and cloud are standard in strong Bangladeshi teams.</li>
<li><strong>Convenient time zone:</strong> overlap with Europe and the Middle East during the working day, and overnight progress for US clients.</li>
<li><strong>English communication</strong> and long experience working with international clients.</li>
</ul>

<h2>How to choose a software development partner</h2>
<ol>
<li><strong>Check real projects</strong>, not just a nice website. Ask for live apps, case studies and references.</li>
<li><strong>Ask how they communicate:</strong> weekly demos, a shared project board and one point of contact.</li>
<li><strong>Make sure you own the code</strong> and have access to the repository from day one.</li>
<li><strong>Start with a small, fixed-scope milestone</strong> before committing to a large project.</li>
<li><strong>Ask about support after launch</strong>, including maintenance, monitoring and updates.</li>
</ol>

<h2>About PiRhoTech and Solidy.io</h2>
<p>PiRhoTech is a software development company based in Dhaka. Our team of engineers, designers and AI specialists has delivered 50+ projects, from marketplace apps like <a href="/works/kormi-koi-find-trusted-service-providers">Kormi Koi</a> to booking platforms like <a href="/works/trufslot">Trufslot</a> and tools used by thousands of students like <a href="/works/cover-page-generator">Cover Page Generator</a>.</p>
<p>International clients work with the same team through <a href="https://solidy.io">Solidy.io</a>, our global software development brand. We build custom web apps, Flutter mobile apps, AI chatbots, business automation and Shopify apps.</p>

<h2>Let's talk about your project</h2>
<p><a href="/contact">Book a free consultation</a> and get a clear plan, timeline and quote for your software project.</p>
""",
    },
]

out = []
for i, post in enumerate(POSTS, start=1):
    out.append({
        "id": i,
        "title": post["title"],
        "slug": post["slug"],
        "description": post["description"],
        "content": " ".join(line.strip() for line in post["content"].strip().splitlines() if line.strip()),
        "image": post["image"],
        "author": AUTHOR,
        "date": DATE,
        "tags": post["tags"],
    })

path = pathlib.Path(__file__).resolve().parent.parent / "db" / "blogs.json"
path.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
print(f"Wrote {len(out)} posts to {path}")
