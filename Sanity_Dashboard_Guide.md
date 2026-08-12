# Midex Content Management System: The Complete Handbook

**Access your dashboard here:** [https://www.midex-eg.com/studio](https://www.midex-eg.com/studio)

Welcome to your new CMS. This document isn't just a list of buttons—it's your manual for controlling the Midex website. We built this system to give you total control over your content, from the massive homepage hero banners down to the smallest footer link, across all three languages. 

Here is exactly how the dashboard thinks, and how you can use it to manage your business online.

---

## 1. How This System Thinks (The Ground Rules)

Before you start clicking around, you need to understand three core rules about how Sanity operates:

**The Auto-Save and The Publish Button**
Every time you type a letter, Sanity saves it instantly as a **Draft**. Don't panic if you make a mistake—nobody on the live internet can see your drafts. Your changes only go live when you click the green **Publish** button at the bottom right. If you completely mess up a page, just click the three dots `...` next to the publish button and hit **Discard changes** to revert everything back to exactly how it looks on the live site right now.

**The Three Languages**
Midex is a global platform. Whenever you open a document, you won't just see one text box; you'll see fields for English, Arabic, and German. **Do not leave these blank.** If you only fill out the English field, a client browsing your site in German might see an empty space or a broken layout. If you don't have the translation ready yet, just paste the English text into the other boxes temporarily.

**Singletons vs. Collections**
You'll notice two types of folders in your sidebar. 
- Some things are **Singletons** (like the Homepage or the About Page). There is only one Homepage in existence. You can't click a "+" button to make a new one; you can only edit the one that's there. 
- Other things are **Collections** (like Products, Blog Posts, or Client Logos). These are databases. You can click the "+" button to create as many of these as you want.

---

## 2. Managing Your Inbox

**Form Submissions**
Think of this as your website's built-in CRM. Whenever a potential client fills out the "Request a Quote" or "Contact Us" forms on the front end, you don't have to go digging through your email spam folder to find it. The website automatically saves a secure copy of their submission right here in the database. 
You'll see exactly who contacted you, their company name, phone number, the specific service they are interested in, and their message. The newest leads always sit right at the top.

---

## 3. The "Site" Folder: Global Settings

This folder controls the DNA of your website. The things you change here ripple across every single page.

**Site Settings**
This is where your global variables live. If the company gets a new phone number, changes its office address, or updates its LinkedIn URL, you change it here. Because the entire website is linked to this one document, updating your phone number here instantly updates it in the footer, the contact page, and the mobile menu simultaneously. 
You also control the **Promotional Popup** from here. If you're attending an exhibition (like Pharmaconex), you can turn the toggle on, upload a map image, write a quick announcement, and the popup will immediately appear for all visitors. Turn the toggle off when the event is over.

**UI Messages (The Dictionary)**
Websites have a lot of "micro-copy". Think about the "Read More" button on a blog post, or the "Back to Products" link, or the labels inside your navigation menu. Developers usually hardcode these into the website, which means you have to call them every time you want to change a single word. We didn't do that. 
Instead, we built a dictionary. Every tiny piece of text on the interface is pulled from here. If you want to change what a button says, or fix a typo in the Arabic footer, look for it in the UI Messages folder.

**Redirects**
If you ever delete an old product page, Google gets very angry when it tries to send users to a link that no longer exists (a 404 error). To protect your SEO, you create a Redirect. You simply tell the system: *"If anyone tries to visit `/products/old-pump`, send them to `/products/new-pump` instead."*

---

## 4. The "Pages" Folder: Building Your Landing Pages

You don't need code to change how your main pages look. 

**The Homepage**
This is your digital storefront. From here, you can rewrite the massive text that visitors see when the page first loads (the Hero section). But more importantly, you control the layout. 
In the "Section Order" field, you can literally drag and drop the blocks of your homepage. Do you want the "Client Logos" to appear above the "Capabilities" section? Just drag it up the list and hit publish. 

**The About Page**
This is where you tell the Midex story. You can update your Mission and Vision statements here. You also control the "Milestones" timeline from here—just link the important dates in your company's history, and the website will automatically draw a beautiful interactive timeline for visitors to scroll through.

**Catalog Pages (Products, Solutions, Blog, Case Studies)**
You might wonder: *"Why is there a Products Page here, but also a Products folder in the sidebar?"*
The sidebar folder is where you add the actual items (the database). This page setting is where you control the **landing experience**. You use this document to change the banner image at the top of the Products page, write the introductory paragraph, and manage the FAQs that sit at the bottom of the page.

---

## 5. The Core Business: Solutions & Products

This is where your actual catalog lives. We built this to be highly relational, meaning things connect to each other intelligently.

**Solution Groups & Solution Services**
We separated your engineering expertise into a Parent-Child relationship. 
- **Groups (The Parents):** These are your broad departments, like "Purified Water Systems". You set the big-picture text here, along with the general Workflow steps and FAQs for that department.
- **Services (The Children):** These are the specific offerings inside that department. A Service can be a simple summary card, or, if you have a lot of technical details to share, you can expand it into a massive "Rich Detail Page" with deep overviews and specific call-to-action buttons.

**Products & Categories**
When you add a new product, you assign it to a Category (like "Pumps" or "Valves"). 
*Pro-tip:* If all the pumps in a category share the same technical specifications, don't type them out for every single product. Just put the specs in the Category document. The products will automatically inherit them. 
You can also link a product directly to a Solution Service. When a client is reading about your water systems, the website will automatically show them the exact Midex products used in that system.

---

## 6. Marketing & Trust (Social Proof)

People buy from companies they trust. The Marketing folder is dedicated entirely to proving your track record.

**Case Studies**
Don't just list what you sell; tell a story about how you fixed a problem. Case studies are your best B2B sales tool. You can document the specific Challenge a client faced, the Approach your engineers took, and the final Outcome. 

**Testimonials**
When a client sends you a great email, turn it into a testimonial. You can even attach a review directly to a specific product, so when a new customer is looking at that product, they see a glowing review right next to it.

**Statistics & Milestones**
Got over 500 clients? 20 years of experience? Put those numbers in the Statistics folder. The website will automatically grab them and create those animated, counting-up numbers you see on the homepage. 

**Events & News**
Keep the site feeling alive. Whether it's a press release about a new factory or an announcement that you're attending a trade show, post it here to keep your audience engaged.

---

## 7. People, Partners, & Brands

**Founders & Authors**
Introduce your leadership team to the world. Also, if someone on your team writes a blog post, you can link their author profile to the article so their face and biography appear at the bottom of the page.

**Partners & Client Logos**
Upload your clients' logos here, and the website will automatically drop them into the infinite scrolling ticker on the homepage. For Partners, you can specify if they are a standard "Trademark Partner" or if you have "Exclusive Representation" rights for them in your region.

**Certificates**
Upload your ISOs or quality awards. Note: You cannot upload PDF files for certificates; you must convert them to image files (like JPG or PNG) before uploading so they display nicely on the cards.

---

## 8. SEO (Controlling Google)

By default, the Midex website is incredibly smart. It automatically reads your content and generates the perfect SEO tags for Google without you having to lift a finger. 

However, sometimes your marketing team needs absolute control. If they want to force Google to show a very specific title, or if they want a specific image to appear when a page is linked in a WhatsApp chat, they use the **SEO Entries** folder. 
Simply type in the exact URL path of the page you want to override (for example, `/about`), and you can force the website to use your custom Meta Title, Description, and Open Graph Image instead of the automated ones. 

---

### Final Piece of Advice: Images
Keep your website fast. Sanity is powerful and will try to optimize your images automatically, but you should still do your part. Before you upload massive 10MB photos from a photoshoot, compress them. Use formats like WebP or compressed JPGs. A fast website ranks better on Google and keeps your clients from leaving before the page loads.
