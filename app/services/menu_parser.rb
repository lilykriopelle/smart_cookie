class MenuParser

  def parse(params)
    @menu = Menu.new({
      title: params[:title]
    })

    params[:recipes].values.each do |recipe|
      @menu.menus_recipes.new(recipe)
    end

    @menu
  end

end
