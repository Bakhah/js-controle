var clear_warnings, display_results, empty_results_view, hide_loading, listen_submit, ready_document, show_loading, warn_user_search_field_is_empty;

listen_submit = function() {
  var button;
  button = jQuery('input.btn');
  return jQuery('form').on('submit', (function(_this) {
    return function(e) {
      var search_field;
      e.preventDefault();
      clear_warnings();
      search_field = jQuery('[name="search"]');
      console.log(search_field);
      if (search_field.val()) {
        empty_results_view();
        show_loading();
        return $.getJSON('proxy.php', {
          search: search_field.val()
        }, function(json) {
          display_results(json);
          return hide_loading();
        });
      } else {
        return warn_user_search_field_is_empty();
      }
    };
  })(this));
};

display_results = function(json) {
  var i, len, result, result_items_view, results, search_results;
  search_results = json.query.search;
  result_items_view = jQuery(".results");
  console.log(search_results);
  if (search_results.length !== 0) {
    results = [];
    for (i = 0, len = search_results.length; i < len; i++) {
      result = search_results[i];
      results.push(result_items_view.append('<li class="list-group-item clearfix"> <a href="#"> <h3 class="list-group-item-heading">' + result.title + '</h3> <p class="list-group-item-text">' + result.snippet + '</p> </a> </li>'));
    }
    return results;
  } else {
    result_items_view.empty();
    return result_items_view.append('<h3>Aucun résultat</h3><h4>Essayez une autre recherche</h4>');
  }
};

empty_results_view = function() {
  return jQuery(".results").empty();
};

show_loading = function() {
  return jQuery('.results').append('<div id="loading"> <center> <h1>Chargement en cours...</h1> <img src="assets/animations/spin.svg"></img> <center> </div>');
};

hide_loading = function() {
  return jQuery('#loading').remove();
};

ready_document = function() {
  listen_submit();
  return console.log('ready_document events bound');
};

warn_user_search_field_is_empty = function() {
  var search_field;
  search_field = jQuery('[name="search"]');
  search_field.css('border-color', 'red');
  return jQuery('form').append('<div id="warning"><strong>Le champ est vide</strong> Entrez au moins un caractère</div>');
};

clear_warnings = function() {
  var search_field;
  search_field = jQuery('[name="search"]');
  search_field.css('border-color', '#ccc');
  return jQuery('#warning').remove();
};

jQuery(document).ready(ready_document);

console.log('loaded: document');
