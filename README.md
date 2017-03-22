# Contrôle - JavaScript

## Objectifs
L'objectif de ce contrôle est de développer une SPA (Single Page App) permettant de rechercher des pages dans la base de données du site WikiPedia. La recherche se fait en AJAX via l'API WikiPedia. Le fichier proxy.php fourni permettra de contourner la same-origin-policy : votre code JavaScript appellera proxy.php qui lui même interrogera l'API WikiPedia pour retourner au JS les données renvoyées par WikiPedia.

## Préparatifs
- récupérer les fichiers du dossier "demarrage" et les placer dans un dossier de votre serveur apache (si besoin installer XAMPP : https://www.apachefriends.org/index.html)
- s'assurer que le php.ini de votre serveur apache autorise bien les appels CURL : dans le php.ini s'assurer que la ligne `extension=php_curl.dll` est bien décommentée (c'est à dire sans caractère ";" en début de ligne). Ouvrir l'URL du fichier proxy (http://localhost/{chemin-vers-votre-dossier}/proxy.php) et s'assurer qu'un objet JSON est bien retourné.
- consulter le contenu du fichier proxy.php pour identifier les 2 paramètres GET qui peuvent être envoyées à ce fichier et tester dans le navigateur que ces paramètres fonctionnent correctement et ne génèrent pas d'erreur : (http://localhost/{chemin-vers-votre-dossier}/proxy.php?{parametre1}=test)

## Instructions
- Lors de la soumission du formulaire de recherche appeler le fichier proxy.php avec la chaine de caractère saisie par l'utilisateur dans le champ de recherche.
- Afficher les résultats dans la partie gauche de la page (colonne "Résultats"). NB: Le code HTML à générer peut être basé sur la suggestion de formattage présente dans le fichier index.html (lignes 23 à 29).
- Afficher un message de chargement en cours lorsqu'un appel webservice est fait et le masquer une fois l'appel terminé.
- Afficher un message d'erreur dans la page si la valeur saisie par l'utilisateur est vide
- Bonus : Au clic sur un des résultats, lancer un nouvel appel à proxy.php pour cette fois récupérer et afficher le détail de la page sur laquelle on a cliqué. L'affichage se fait dans la partie de droite "Détail". Les informations à afficher sont le titre et le contenu de la page retournés par l'API.

NB : le code du fichier index.html ne peut être modifié que pour ajouter du code JavaScript, la structure HTML en elle même ne peut pas être modifiée (pas d'ajout de balises, d'id ou de classe CSS notamment).

## Point de vigilance
- propreté et lisibilité du code (indentation, nommage des variables, commentaires, ...)
- penser à utiliser les outils de développement et notamment les onglets Sources (points d'arrêts) et Network (inspection des appels réseaux) pour vous aider dans la réalisation de cet exercice.