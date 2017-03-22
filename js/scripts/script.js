var display_results, listen_submit, ready_document;

listen_submit = function() {
  var button;
  button = jQuery('input.btn');
  return jQuery('form').on('submit', (function(_this) {
    return function(e) {
      e.preventDefault();
      button.prop('value', 'Chargement...');
      return $.getJSON('proxy.php', {
        search: "Lille"
      }, function(json) {
        display_results(json);
        return button.prop('value', 'Lancer la recherche');
      });
    };
  })(this));
};

display_results = function(json) {
  var i, len, result, results, results_view, search_results;
  results_view = jQuery(".results");
  search_results = json.query.search;
  display_results = jQuery(".results");
  display_results.empty();
  results = [];
  for (i = 0, len = search_results.length; i < len; i++) {
    result = search_results[i];
    results.push(display_results.append('<li class="list-group-item clearfix"> <a href="#"> <h3 class="list-group-item-heading">' + result.title + '</h3> <p class="list-group-item-text">' + result.snippet + '</p> </a> </li>'));
  }
  return results;
};

ready_document = function() {
  listen_submit();
  return console.log('ready_document events bound');
};

jQuery(document).ready(ready_document);

console.log('loaded: document');
