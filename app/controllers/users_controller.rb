class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:error] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:authored_recipes).find(params[:id])
    render :show
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :name)
    end

end
