
var search_field = undefined;
var items_search_view = undefined;
var item_title_view = undefined;
var item_content_view = undefined;
var main_form = undefined;
var main_title = undefined;

var initialize_globals = function() {
  search_field = jQuery('[name="search"]');
  items_search_view = jQuery(".results");
  item_title_view = jQuery(".detailContainer h3");
  item_content_view = jQuery(".detailContainer p");
  main_form = jQuery('form');
  main_title = jQuery('form h1');
};

var listen_submit = function() {
  return main_form.on('submit', function(e) {
    e.preventDefault();
    clear_warnings();
    if (search_field.val()) {
      empty_results_view();
      show_loading();
      return $.getJSON('proxy.php', {
        search: search_field.val()
      }, function(json) {
        hide_loading();
        return display_search_results(json);
      });
    } else {
      return warn_user_search_field_is_empty();
    }
  });
};

var display_search_results = function(json) {
  var i, item, json_search_results, len;
  json_search_results = json.query.search;
  if (json_search_results && json_search_results.length !== 0) {
    for (i = 0, len = json_search_results.length; i < len; i++) {
      item = json_search_results[i];
      items_search_view.append('<li class="list-group-item clearfix"> <a class="result_item" href="#" data-title="' + item.title + '"> <h3 class="list-group-item-heading">' + item.title + '</h3> <p class="list-group-item-text">' + item.snippet + '</p> </a> </li>');
    }
    return reset_item_listeners();
  } else {
    items_search_view.empty();
    return items_search_view.append('<h3>Aucun résultat</h3><h4>Essayez une autre recherche</h4>');
  }
};

var display_results_description = function(json) {
  var item_infos;
  item_infos = json.parse;
  item_title_view.html(item_infos.title);
  item_content_view.html(item_infos.text["*"]);
};

var reset_item_listeners = function() {
  return jQuery('.result_item').click(function() {
    show_loading();
    return $.getJSON('proxy.php', {
      title: jQuery(this).data('title')
    }, function(json) {
      hide_loading();
      return display_results_description(json);
    });
  });
};

var empty_results_view = function() {
  return items_search_view.empty();
};

var show_loading = function() {
  hide_loading();
  return main_title.append('<img id="loading" src="assets/animations/spin.svg"></img>');
};

var hide_loading = function() {
  return jQuery('#loading').remove();
};

var warn_user_search_field_is_empty = function() {
  search_field.css('border-color', 'red');
  return jQuery('form').append('<div id="warning"><strong>Le champ est vide</strong> Entrez au moins un caractère</div>');
};

var clear_warnings = function() {
  search_field.css('border-color', '#ccc');
  return jQuery('#warning').remove();
};

var ready_document = function() {
  initialize_globals();
  listen_submit();
  console.log('ready_document events bound');
};

jQuery(document).ready(ready_document);

console.log('loaded: document');
