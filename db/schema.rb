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

ActiveRecord::Schema.define(version: 20150514150512) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.integer  "annotatable_id",   null: false
    t.integer  "author_id",        null: false
    t.integer  "start_idx",        null: false
    t.integer  "end_idx",          null: false
    t.text     "body",             null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "annotatable_type"
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

  create_table "recipes", force: :cascade do |t|
    t.integer  "author_id",    null: false
    t.string   "title",        null: false
    t.text     "instructions", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "primary_tag",  null: false
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

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name",            null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
