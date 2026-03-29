import { type SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { gallery } from './gallery'
import { quoteSection } from './quoteSection'
import { philosophySection } from './philosophySection'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, gallery, quoteSection, philosophySection, siteSettings],
}
