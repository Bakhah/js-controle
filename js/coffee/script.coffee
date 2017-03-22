listen_submit = ->
  button = jQuery('input.btn')
  jQuery('form').on 'submit', (e) =>
    e.preventDefault()
    button.prop('value', 'Chargement...')
    $.getJSON 'proxy.php', {search: "Lille"}, (json) ->
      display_results(json)
      button.prop('value', 'Lancer la recherche')

display_results = (json) ->
  results_view = jQuery(".results")
  search_results = json.query.search

  display_results = jQuery(".results")
  display_results.empty()

  for result in search_results
    display_results.append('<li class="list-group-item clearfix">
                              <a href="#">
                                <h3 class="list-group-item-heading">' + result.title + '</h3>
                                <p class="list-group-item-text">' + result.snippet + '</p>
                              </a>
                            </li>')

ready_document = ->
  listen_submit()
  console.log 'ready_document events bound'

jQuery(document).ready(ready_document);

console.log 'loaded: document'
