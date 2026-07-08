"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  CogIcon,
  DocumentTextIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  HomeIcon,
  PackageIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
  WrenchIcon,
} from "@sanity/icons";
import { apiVersion, dataset, projectId, studioBasePath } from "@/sanity/env";
import { schemaTypes, singletonTypes } from "@/sanity/schemas";

function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));
}

function structure(S: StructureBuilder) {
  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Inbox")
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList("formSubmission")
            .title("Form Submissions")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Site")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Site")
            .items([
              singleton(S, "siteSettings", "Site Settings"),
              S.documentTypeListItem("uiMessages").title("UI Messages"),
              S.documentTypeListItem("redirect").title("Redirects"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Homepage"),
              singleton(S, "aboutPage", "About Page"),
              singleton(S, "contactPage", "Contact Page"),
              singleton(S, "productsPage", "Products Page"),
              singleton(S, "solutionsPage", "Solutions Page"),
              singleton(S, "blogPage", "Blog Page"),
            ]),
        ),
      S.listItem()
        .title("Solutions")
        .icon(WrenchIcon)
        .child(
          S.list()
            .title("Solutions")
            .items([
              S.documentTypeListItem("solutionGroup").title("Solution Groups"),
              S.documentTypeListItem("solutionChild").title("Solution Services"),
            ]),
        ),
      S.listItem()
        .title("Products")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Products")
            .items([
              S.documentTypeListItem("productCategory").title("Categories"),
              S.documentTypeListItem("product").title("Products"),
            ]),
        ),
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("blogPost").title("Posts"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Marketing")
        .icon(SparklesIcon)
        .child(
          S.list()
            .title("Marketing")
            .items([
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("stat").title("Statistics"),
              S.documentTypeListItem("milestone").title("Milestones"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("caseStudy").title("Case Studies"),
              S.documentTypeListItem("eventItem").title("Events"),
              S.documentTypeListItem("newsItem").title("News"),
            ]),
        ),
      S.listItem()
        .title("People & Brands")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("People & Brands")
            .items([
              S.documentTypeListItem("founder").title("Founders"),
              S.documentTypeListItem("partner").title("Partners"),
              S.documentTypeListItem("clientLogo").title("Client Logos"),
              S.documentTypeListItem("certificate").title("Certificates"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("SEO")
        .icon(SearchIcon)
        .child(S.documentTypeList("seoEntry").title("SEO Entries")),
    ]);
}

export default defineConfig({
  name: "midex",
  title: "Midex CMS",
  basePath: studioBasePath,
  projectId,
  dataset,
  icon: EarthGlobeIcon,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            (action) =>
              action.action &&
              ["publish", "discardChanges", "restore"].includes(action.action),
          )
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion, defaultDataset: dataset }),
  ],
});