listen_submit = ->
  button = jQuery('input.btn')
  jQuery('form').on 'submit', (e) =>
    e.preventDefault()
    button.prop('value', 'Chargement...')
    $.getJSON 'proxy.php', {search: "Lille"}, (result) ->
      parse_results(result)
      button.prop('value', 'Lancer la recherche')

parse_results = (result) ->
  search_results = result.query.search
  for result in search_results
    console.log result

ready_document = ->
  listen_submit()
  console.log 'ready_document events bound'

jQuery(document).ready(ready_document);

console.log 'loaded: document'
