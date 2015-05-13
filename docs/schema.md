# Schema Information

## recipes
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
author_id    | integer   | not null, foreign key (references users)
title        | string    | not null
instructions | text      | not null
primary_tag  | text      | not null

## ingredients
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
name         | string    | not null

## recipes_ingredients
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
ingredient_id | integer   | not null, foreign key (references ingredients)
recipe_id     | integer   | not null, foreign key (references recipes)
quantity      | float     | not null
unit          | string    | not null
optional      | boolean   | not null, default false

## dietary_attributes
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null

## recipes_dietary_attributes
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
attribute_id  | integer   | not null, foreign key (references dietary_attributes)
recipe_id     | integer   | not null, foreign key (references recipes)

## menus
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null

## menus_recipes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
menu_id     | integer   | not null, foreign key (references menus)
recipe_id   | integer   | not null, foreign key (references recipes)
ord         | integer   | not null

## annotations
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
annotatable_id | integer   | not null, foreign key (references menus/recipes)
author_id      | integer   | not null, foreign key (references users)
start_idx      | integer   | not null
end_idx        | integer   | not null
body           | string    | not null

## votes
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
voteable_id    | integer   | not null, foreign key (references menus/recipes/annotations)
voter_id       | integer   | not null, foreign key (references users)
vote_value     | integer   | not null, (+- 1)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references blogs)
follower_id | integer   | not null, foreign key (references users)
