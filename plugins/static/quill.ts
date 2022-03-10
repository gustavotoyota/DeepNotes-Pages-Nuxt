export const quillOptions = {
  theme: 'bubble',

  placeholder: '',

  modules: {
    syntax: true,

    cursors: true,

    keyboard: {
      bindings: {
        'indent code-block': null,
        'outdent code-block': null,
      },
    },

    toolbar: [
      [
        'bold',
        'italic',
        'underline',
        'strike',
        { 'header': 1 },
        { 'header': 2 },
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      [
        { 'indent': '-1' },
        { 'indent': '+1' },
        { 'script': 'sub' },
        { 'script': 'super' },
        'blockquote',
        'code-block',
        'link',
        'image',
        'formula',
        'clean',
      ],
    ],
  },
}