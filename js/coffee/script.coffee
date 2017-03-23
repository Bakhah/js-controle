search_field = undefined
items_search_view = undefined
item_title_view = undefined
item_content_view = undefined
main_form = undefined
main_title = undefined

initialize_globals = ->
  search_field = jQuery('[name="search"]')
  items_search_view = jQuery(".results")
  item_title_view = jQuery(".detailContainer h3")
  item_content_view = jQuery(".detailContainer p")
  main_form = jQuery('form')
  main_title = jQuery('form h1')

listen_submit = ->
  main_form.on 'submit', (e) ->
    e.preventDefault()
    clear_warnings()
    if search_field.val()
      empty_results_view()
      show_loading()
      $.getJSON 'proxy.php', {search: search_field.val()}, (json) ->
        hide_loading()
        display_search_results(json)
    else
      warn_user_search_field_is_empty()

display_search_results = (json) ->
  json_search_results = json.query.search
  if json_search_results && json_search_results.length != 0
    for item in json_search_results
      items_search_view.append('<li class="list-group-item clearfix">
                                <a class="result_item" href="#" data-title="' + item.title + '">
                                  <h3 class="list-group-item-heading">' + item.title + '</h3>
                                  <p class="list-group-item-text">' + item.snippet + '</p>
                                </a>
                              </li>')
    reset_item_listeners()
  else
    items_search_view.empty()
    items_search_view.append('<h3>Aucun résultat</h3><h4>Essayez une autre recherche</h4>')

display_results_description = (json) ->
  item_infos = json.parse

  item_title_view.html(item_infos.title)
  item_content_view.html(item_infos.text["*"])

reset_item_listeners = ->
  jQuery('.result_item').click ->
    show_loading()
    $.getJSON 'proxy.php', {title: jQuery(this).data('title')}, (json) ->
      hide_loading()
      display_results_description(json)



empty_results_view = ->
  items_search_view.empty()

show_loading = ->
  hide_loading()
  main_title.append('<img id="loading" src="assets/animations/spin.svg"></img>')

hide_loading = ->
  jQuery('#loading').remove()

warn_user_search_field_is_empty = ->
  search_field.css('border-color', 'red')
  jQuery('form').append('<div id="warning"><strong>Le champ est vide</strong> Entrez au moins un caractère</div>')

clear_warnings = ->
  search_field.css('border-color', '#ccc')
  jQuery('#warning').remove()

ready_document = ->
  initialize_globals()
  listen_submit()
  console.log 'ready_document events bound'

jQuery(document).ready(ready_document);

console.log 'loaded: document'
