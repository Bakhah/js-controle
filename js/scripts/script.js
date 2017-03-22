var listen_submit, parse_results, ready_document;

listen_submit = function() {
  var button;
  button = jQuery('input.btn');
  return jQuery('form').on('submit', (function(_this) {
    return function(e) {
      e.preventDefault();
      button.prop('value', 'Chargement...');
      return $.getJSON('proxy.php', {
        search: "Lille"
      }, function(result) {
        parse_results(result);
        return button.prop('value', 'Lancer la recherche');
      });
    };
  })(this));
};

parse_results = function(result) {
  var i, len, results, search_results;
  search_results = result.query.search;
  results = [];
  for (i = 0, len = search_results.length; i < len; i++) {
    result = search_results[i];
    results.push(console.log(result));
  }
  return results;
};

ready_document = function() {
  listen_submit();
  return console.log('ready_document events bound');
};

jQuery(document).ready(ready_document);

console.log('loaded: document');
