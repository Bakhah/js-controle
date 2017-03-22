var clear_warnings, display_results, display_results_description, empty_results_view, hide_loading, listen_submit, ready_document, reset_item_listeners, show_loading, warn_user_search_field_is_empty;

listen_submit = function() {
  var button;
  button = jQuery('input.btn');
  return jQuery('form').on('submit', function(e) {
    var search_field;
    e.preventDefault();
    clear_warnings();
    search_field = jQuery('[name="search"]');
    if (search_field.val()) {
      empty_results_view();
      show_loading();
      return $.getJSON('proxy.php', {
        search: search_field.val()
      }, function(json) {
        hide_loading();
        return display_results(json);
      });
    } else {
      return warn_user_search_field_is_empty();
    }
  });
};

display_results = function(json) {
  var i, len, result, result_items_view, search_results;
  search_results = json.query.search;
  result_items_view = jQuery(".results");
  if (search_results && search_results.length !== 0) {
    for (i = 0, len = search_results.length; i < len; i++) {
      result = search_results[i];
      result_items_view.append('<li class="list-group-item clearfix"> <a class="result_item" href="#" data-title="' + result.title + '"> <h3 class="list-group-item-heading">' + result.title + '</h3> <p class="list-group-item-text">' + result.snippet + '</p> </a> </li>');
    }
    return reset_item_listeners();
  } else {
    result_items_view.empty();
    return result_items_view.append('<h3>Aucun résultat</h3><h4>Essayez une autre recherche</h4>');
  }
};

display_results_description = function(json) {
  var item_content_view, item_title_view, results;
  results = json.query.pages;
  item_title_view = jQuery(".detailContainer h3");
  item_content_view = jQuery(".detailContainer p");
  return $.each(results, function(value) {
    item_title_view.html(results[value].title);
    return item_content_view.html(results[value].revisions["0"]["*"]);
  });
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

reset_item_listeners = function() {
  return jQuery('.result_item').click(function() {
    var item;
    item = jQuery(this);
    return $.getJSON('proxy.php', {
      title: item.data('title')
    }, function(json) {
      hide_loading();
      return display_results_description(json);
    });
  });
};

jQuery(document).ready(ready_document);

console.log('loaded: document');
