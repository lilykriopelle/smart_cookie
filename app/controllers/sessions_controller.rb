class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    email, password = params[:user][:email], params[:user][:password]
    @user = User.find_by_credentials(email, password)

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:error] = ["Invalid Credentials"]
      render :new
    end
  end

  def destroy
    log_out!(current_user)
    redirect_to root_url
  end

  def demo
    user = User.find_by_credentials("demo@email.com", "password")
    sign_in!(user)
    redirect_to root_url
  end

  def omniauth
    user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in!(user)
    redirect_to root_url
  end

  protected
    def auth_hash
      request.env['omniauth.auth']
    end

end
