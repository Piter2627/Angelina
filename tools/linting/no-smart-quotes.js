/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');

module.exports = rule('remark-lint:no-smart-quotes', noSmartQuotes);

/* eslint-disable-next-line */
const reason = 'No smart quotes or apostrophes. Use a straight quote or apostrophe instead.';

/**
 * Walk the AST for the markdown file and find any smart quotes or
 *   apostrophes in code blocks.
 * @param {*} tree An AST of the markdown file.
 * @param {*} file The markdown file.
 */
function noSmartQuotes(tree, file) {
  visit(tree, ['code', 'inlineCode'], visitor);

  /* eslint-disable require-jsdoc */
  function visitor(node) {
    if (node.value.match(/[‘’“”]/g)) {
      return file.message(reason, node);
    }
  }
}
