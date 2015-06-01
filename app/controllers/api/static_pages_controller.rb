class Api::StaticPagesController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .map(&:searchable)
      .concat(Recipe.ingredient_search(params[:query]))

    @search_results = Kaminari.paginate_array(@search_results)
      .page(params[:page])
      .per(5)
  end

end
