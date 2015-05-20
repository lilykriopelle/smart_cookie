class Api::StaticPagesController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
      .per(10)
  end

end
