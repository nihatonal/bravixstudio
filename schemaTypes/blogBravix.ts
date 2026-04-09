import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogBravix = defineType({
  name: 'blog_bravix',
  title: 'Bravix Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'translationGroup',
      title: 'Translation Group',
      type: 'string',
      description: 'Same value for all language versions of the same blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lang',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Russian', value: 'ru'},
          {title: 'Turkish', value: 'tr'},
        ],
        layout: 'radio', // istersen "dropdown" da olur
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (SEO)',
      type: 'text',
      description: 'Short SEO description for article. Max 170 chars.',
      validation: (Rule: any) => Rule.max(170).warning('Excerpt should be under 170 characters'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO)',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Blog Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Blog tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'tags'}],
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(2).max(4).error('You can select between 1 and 4 tags.'),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'isLatest',
      title: 'Latest Blog',
      type: 'boolean',
      description: 'Toggle to Latest on or off',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Blog',
      type: 'boolean',
      description: 'Toggle to Featured on or off',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'views',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'If disabled, this blog post will not appear on the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'categories.title',
      readingTime: 'readingTime',
      views: 'views',
    },
    prepare(selection) {
      const {title, media, category, views} = selection

      return {
        title,
        media,
        subtitle: `${category} • ${views ?? 0} views`,
      }
    },
  },
})
