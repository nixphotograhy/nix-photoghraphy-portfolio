'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

// Define the singleton types
const singletonTypes = new Set(['homePage', 'siteSettings', 'quoteSection', 'philosophySection'])

// Define the actions allowed for singletons
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'wwvm5i0d' , // Updated from placeholder
  dataset: dataset || 'production',
  schema: {
    types: schema.types,
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, only allow specified actions
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Home Page
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Singleton: Quote Section
            S.listItem()
              .title('Quote Section')
              .id('quoteSection')
              .child(
                S.document()
                  .schemaType('quoteSection')
                  .documentId('quoteSection')
              ),
            // Singleton: Philosophy
            S.listItem()
              .title('Philosophy')
              .id('philosophySection')
              .child(
                S.document()
                  .schemaType('philosophySection')
                  .documentId('philosophySection')
              ),
            S.divider(),
            // Regular Collection: Galleries
            S.documentTypeListItem('gallery').title('Galleries'),
            S.divider(),
            // The rest of the document types, if any
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || '') && listItem.getId() !== 'gallery'
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
