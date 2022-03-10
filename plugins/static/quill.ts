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