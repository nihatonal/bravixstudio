import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
export const categoryBravix = defineType({
  name: 'category',
  title: 'Bravix Category',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
