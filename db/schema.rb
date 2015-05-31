# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150531205701) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotation_replies", force: :cascade do |t|
    t.integer  "annotation_id", null: false
    t.integer  "author_id",     null: false
    t.text     "body",          null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "annotation_replies", ["annotation_id"], name: "index_annotation_replies_on_annotation_id", using: :btree
  add_index "annotation_replies", ["author_id"], name: "index_annotation_replies_on_author_id", using: :btree

  create_table "annotations", force: :cascade do |t|
    t.integer  "annotatable_id",     null: false
    t.integer  "author_id",          null: false
    t.text     "body",               null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "annotatable_type"
    t.integer  "start_idx",          null: false
    t.integer  "end_idx",            null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "annotations", ["annotatable_id"], name: "index_annotations_on_annotatable_id", using: :btree
  add_index "annotations", ["author_id"], name: "index_annotations_on_author_id", using: :btree

  create_table "ingredients", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "menus", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "menus", ["author_id"], name: "index_menus_on_author_id", using: :btree

  create_table "menus_recipes", force: :cascade do |t|
    t.integer  "menu_id",    null: false
    t.integer  "recipe_id",  null: false
    t.integer  "ord",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "menus_recipes", ["menu_id"], name: "index_menus_recipes_on_menu_id", using: :btree
  add_index "menus_recipes", ["recipe_id"], name: "index_menus_recipes_on_recipe_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "recipes", force: :cascade do |t|
    t.integer  "author_id",          null: false
    t.string   "title",              null: false
    t.text     "instructions",       null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "primary_tag",        null: false
    t.integer  "servings"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "recipes", ["author_id"], name: "index_recipes_on_author_id", using: :btree

  create_table "recipes_ingredients", force: :cascade do |t|
    t.integer  "ingredient_id",                 null: false
    t.boolean  "optional",      default: false, null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.float    "quantity",                      null: false
    t.string   "unit",                          null: false
    t.integer  "recipe_id"
  end

  add_index "recipes_ingredients", ["ingredient_id"], name: "index_recipes_ingredients_on_ingredient_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token", null: false
    t.integer  "user_id",       null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name",            null: false
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "voteable_id",   null: false
    t.string   "voteable_type", null: false
    t.integer  "voter_id",      null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "votes", ["voteable_id"], name: "index_votes_on_voteable_id", using: :btree
  add_index "votes", ["voter_id", "voteable_id", "voteable_type"], name: "index_votes_on_voter_id_and_voteable_id_and_voteable_type", unique: true, using: :btree
  add_index "votes", ["voter_id"], name: "index_votes_on_voter_id", using: :btree

end
