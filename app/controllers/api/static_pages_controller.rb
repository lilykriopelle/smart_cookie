class Api::StaticPagesController < ApplicationController

  def search
    unless (params[:only_recipes])
      @search_results = PgSearch
        .multisearch(params[:query])
        .map(&:searchable)
        .concat(Recipe.ingredient_search(params[:query]))

      @search_results = Kaminari.paginate_array(@search_results)
        .page(params[:page])
        .per(5)
    else
      @search_results = Recipe.where('UPPER(title) ~ ?', params[:query].upcase)
        .page(params[:page])
        .per(5)
    end
  end

end
