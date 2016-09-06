/* global N1 */
// Underscore Templates

N1.Templates['template-structures-item'] =
  '<td class="structure-name">' +
  '  <div class="structure-title structure-view"><%= title %></div>' +
  '  <div><h6>One Time!!</h6></div>' +
  '</td>' +
  '<td class="structure-action">' +
  '  <div class="btn-group btn-group-default pull-right">' +
  '    <button class="btn btn-default structure-edit">' +
  '      <span class="glyphicon glyphicon-pencil"></span>' +
  '    </button>' +
  '    <button class="btn btn-default structure-delete">' +
  '      <span class="glyphicon glyphicon-trash"></span>' +
  '    </button>' +
  '  </div>' +
  '<div><h6>Two Time!!</h6></div>' +
  '</td>'

N1.Templates['template-structure'] =
  '<div id="structure-pane-view" class="pane">' +
  '  <div id="structure-pane-view-content"></div>' +
  '</div>' +
  '<div id="structure-pane-edit" class="pane">' +
  '  <form id="structure-form-edit" role="form">' +
  '    <div class="form-group">' +
  '      <input id="input-title" class="form-control"' +
  '             type="text" placeholder="title"' +
  '             value="<%= title %>">' +
  '    </div>' +
  '    <div class="form-group">' +
  '      <textarea id="input-text" class="form-control"' +
  '                rows="15"><%= text %></textarea>' +
  '    </div>' +
  '  </form>' +
  '</div>' +
  '<div><h1>Hello Again 1!!</h1></div>'
N1.Templates['template-structure-view'] =
  '<div class="well well-small">' +
  '  <h2 id="pane-title"><%= title %></h2>' +
  '</div>' +
  '<div id="pane-text"><%= text %></div>' +
  '<div><h1>Hi There!!</h1></div>'
