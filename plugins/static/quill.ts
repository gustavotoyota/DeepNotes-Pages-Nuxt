export const quillOptions = {
  theme: 'bubble',

  placeholder: '',

  formats: [
    'bold',
    'code',
    'italic',
    'link',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'formula',
    'image',
    'video',
  ],

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
        'link',
        'image',
      ],
      [
        { 'align': '' },
        { 'align': 'center' },
        { 'align': 'right' },
        { 'align': 'justify' },
        { 'list': 'ordered'},
        { 'list': 'bullet' },
        { 'indent': '-1' },
        { 'indent': '+1' },
      ],
      [
        'blockquote',
        'code-block',
        { 'script': 'sub' },
        { 'script': 'super' },
        'formula',
        'clean',
      ],
    ],
  },
}