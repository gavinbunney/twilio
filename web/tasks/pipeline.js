module.exports.banner = ['/*!',
                         ' * <%= pkg.name %> - v<%= pkg.version %>',
                         ' * <%= grunt.template.today("yyyy-mm-dd") %>',
                         ' */\n\n'
                         ].join('\n');

module.exports.javascriptFiles = [
  'components/jquery/dist/jquery.min.js',
  'components/handlebars/handlebars.runtime.min.js',
  'components/twilio-common/dist/twilio-common.js',
  'components/twilio-conversations/dist/twilio-conversations.js',

  'dist/js/templates.js',

  'src/js/plugins/*.js',
  'src/js/services/*.js',
  'src/js/views/*.js'
];