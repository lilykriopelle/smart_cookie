# Cooking Genius

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
Cooking Genius is a Genius clone geared toward annotating recipes and menus built on Rails and Backbone.  Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [ ] Create recipes
- [ ] Organize recipes into menus
- [ ] Create annotations
- [ ] View menus/recipes and their annotations
- [ ] Reply to annotations
- [ ] Upvote/Downvote annotations
- [ ] Search/Filter recipes and menus

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Recipe/Menu Creation (~1 day)
Implement basic Auth. By the end of this phase, users will be able to create recipes using a simple text form in a Rails view. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing Recipes and Menus (~1 days)
First things first, I need to sort out saving ingredients and recipes_ingredients table entries when I save recipes.  I will then add API routes to serve menu and recipe data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to create menus and view both menus and recipes. I'd also like to add the ability for users to upload photos to attach to their recipes/menus, which will involve choosing and integrating a photo uploading library.

[Details][phase-two]

### Phase 3: Annotations and Replies (~3 days)
I'll implement Genius' main feature, annotations.  On the Rails side, this will involve polymorphic associations, since users can annotate recipes and menus. On the front end, I'll write Backbone views for new annotations and to display existing ones.  I'll spend a little time styling here.

[Details][phase-three]

### Phase 4: Search/Filter/Browse Recipes and Menus (~3 days)
I'll add the ability for users to search recipes and menus, and also the ability to filter by certain characteristics (course, main ingredients, dietary restrictions) and browse.  I'll add search routes to the recipes and menus controllers.  I'll add a Backbone composite view that displays search results by fetching the collections returned by searching.  I'll also add filter routes to the recipes and menu controllers and a composite view for displaying filter results.

[Details][phase-four]

### Phase 5: Style/Polish/Contingency (~2 days)
I'll make sure everything is styled well, and polish all the front-end stuff.  I think at this point in the project, I'll have a sense of where UI could be snappier and I'd like to reserve this time to make the snappy happen.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Follow other users
- [ ] Multiple sessions/session management
- [ ] User avatars

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
