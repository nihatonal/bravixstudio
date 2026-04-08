import {defineType, defineField} from 'sanity'

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'javascript',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'JSON', value: 'json'},
          {title: 'Bash', value: 'bash'},
        ],
      },
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (Rule) => Rule.required(),
    }),
  ],
})