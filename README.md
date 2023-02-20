[![forthebadge](./readme-assets/html5-badge.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](./readme-assets/sass-badge.svg)](https://forthebadge.com)

<br/>

<div id="header" align="left">
  <img src="./readme-assets/logo.png" width="50"/>
</div>

# Project Les petits plats

After publishing cookbooks for several years, "Les petits plats" decided to embark on a new project: create its own site of cooking recipes like Marmiton or 750g.

For this project, I am responsible for implementing the front interface of the next site using the figma models and mock data provided to me. The search bar must be operational.

# Technologies :

1. HTML5
2. CSS3
3. Javascript
4. SASS
5. Algorithm

# Search algorithm :

All the difficulty of the project was oriented in the research and the implementation of the search algorithm for the site.
Indeed, the search for a recipe on the site must be able to be done both using a main search bar, and also using keyword sorting filters.

- Main search bar :
  The user must be able to type different words which must be present in the recipes displayed.
  Search filtering is active after user has entered at least 2 characters and recipes filtered display must be updated instantly (event input).

- Keywords filters :
  There is 3 categories in witch are listed search keywords. For each category, a searchbar can help user to find a keyword to select. User can select as many words as he wants and search result must contain all these keyword, no matter the category. Recipes filtered displya must be updated instantly.

Of course, both types of research method are inter-connected. At any time, the user must be able to choose to refine his search by one or other of the methods.

In order to optimize the search performance, 2 versions of algorithm have been implemented. One with the native approach and one with the functionnal approach. You can consult them in the differents branch created for this project.

Tests have been realized to choose the most pertinent approach in order to optimize performance research.

# Tests :

For the tests, tool [jsbench.me](https://jsbench.me/) have been used.
Final results determined that the functional algorithm performed best. So it has been the final choice implemented.

# Extra documentation :

An investigation sheet have been written to explain the 2 algorithms approachs and justify the final choice.
This document in pdf can be consulted [here](./readme-assets/Investigation%20sheet.pdf).
