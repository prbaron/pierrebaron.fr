const markdownIt = require('markdown-it');
const escapeHtml = markdownIt().utils.escapeHtml;

function createContainer(type) {
  return {
    validate: function (params) {
      const regex = new RegExp(`^${type}\\s*(.*)$`);

      return params.trim().match(regex);
    },

    render: function (tokens, idx) {
      const regex = new RegExp(`^${type}\\s+(.*)$`);
      const m = tokens[idx].info.trim().match(regex);

      // opening tag
      if (tokens[idx].nesting === 1) {
        const content = m !== null
          ? `<p class="alert__title">${escapeHtml(m[1])}</p>`
          : '';

        return `<div class="alert alert--${type}">${content}`;
      }

      // closing tag
      return '</div>';
    }
  };
}

module.exports = {
  createContainer,
};