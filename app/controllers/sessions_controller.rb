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
    redirect_to new_session_url
  end

end
