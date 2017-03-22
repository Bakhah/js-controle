listen_submit = ->
  button = jQuery('input.btn')
  jQuery('form').on 'submit', (e) ->
    e.preventDefault()
    clear_warnings()
    search_field = jQuery('[name="search"]')
    if search_field.val()
      empty_results_view()
      show_loading()
      $.getJSON 'proxy.php', {search: search_field.val()}, (json) ->
        hide_loading()
        display_results(json)
    else
      warn_user_search_field_is_empty()

display_results = (json) ->
  search_results = json.query.search
  result_items_view = jQuery(".results")
  if search_results && search_results.length != 0
    for result in search_results
      result_items_view.append('<li class="list-group-item clearfix">
                                <a class="result_item" href="#" data-title="' + result.title + '">
                                  <h3 class="list-group-item-heading">' + result.title + '</h3>
                                  <p class="list-group-item-text">' + result.snippet + '</p>
                                </a>
                              </li>')
    reset_item_listeners()
  else
    result_items_view.empty()
    result_items_view.append('<h3>Aucun résultat</h3><h4>Essayez une autre recherche</h4>')

display_results_description = (json) ->
  results = json.query.pages
  item_title_view = jQuery(".detailContainer h3")
  item_content_view = jQuery(".detailContainer p")

  $.each results, (value) ->
    item_title_view.html(results[value].title)
    item_content_view.html(results[value].revisions["0"]["*"])

empty_results_view = ->
  jQuery(".results").empty()

show_loading = ->
  jQuery('.results').append('<div id="loading">
                              <center>
                                <h1>Chargement en cours...</h1>
                                <img src="assets/animations/spin.svg"></img>
                              <center>
                            </div>')

hide_loading = ->
  jQuery('#loading').remove()

ready_document = ->
  listen_submit()
  console.log 'ready_document events bound'

warn_user_search_field_is_empty = ->
  search_field = jQuery('[name="search"]')
  search_field.css('border-color', 'red')
  jQuery('form').append('<div id="warning"><strong>Le champ est vide</strong> Entrez au moins un caractère</div>')

clear_warnings = ->
  search_field = jQuery('[name="search"]')
  search_field.css('border-color', '#ccc')
  jQuery('#warning').remove()

reset_item_listeners = ->
  jQuery('.result_item').click ->
    item = jQuery(this)
    $.getJSON 'proxy.php', {title: item.data('title')}, (json) ->
      hide_loading()
      display_results_description(json)

jQuery(document).ready(ready_document);

console.log 'loaded: document'
