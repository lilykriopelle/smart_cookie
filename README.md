# SmartCookie
SmartCookie is a collaborative recipe development platform.  Users can add recipes, and can annotate each other's recipes with text and photos.  Users can also reply to annotations, browse all recipes, filter recipes by primary tag, or search for particular title, ingredient, or author name.

SmartCookie is made up of a Rails back end that serves up a RESTful JSON API to a Backbone front end.  Other technologies include jQuery, Rangy, Paperclip, PGSearch, and Kaminari.

[Check it out!](http://www.smart-cookie.co/)
(Note: For now, SmartCookie is best experienced in Chrome or Safari.  Achieving full compatibility with other browsers is an ongoing project.)

## Some Implementation Details
### Annotations
First off, annotations belong to a polymorphic annotatable object - this allows me to treat recipes and their ingredients interchangeably, and will eventually extend to recipes once I get those up and running.

I use [rangy](https://github.com/timdown/rangy) to get the indices of the user's selection relative to the beginning of the selection's parent element.  Annotation models store their start and end indices; I use these indices to wrap sections of text in links on the front end.  Because inserting html into the plain text of the recipe changes the number of characters in the text, I store the annotations in backwards start index order, so that I can render each annotation onto the page without updating the indices of the other annotations.

I also support nested and overlapping annotations.  This requires some processing on the back end, as overlapping or nested a tags are not allowed.  I convert overlapping intervals (each corresponding to one annotation) to a hash whose keys are the corresponding elementary intervals, and whose values are arrays of the annotation id(s) that the elementary intervals point to.  On the front end, each annotation link stores this array of ids.  When a user hovers over a link, I use jQuery to parse that array from the html, and Backbone to fetch the relevant annotation models.

## Future To Dos
Short Term
- [ ] Firefox/IE browser compatibility
- [ ] User avatar uploads
- [ ] User followings
- [ ] Recipe taggings

Long Term
- [ ] Organize recipes into menus - side by side recipes search results drag and droppable into a new menu view.
