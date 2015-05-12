class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :sign_in!, :current_user, :logged_in?, :log_out!, :require_login

  def sign_in!(user)
    session[:session_token] = user.reset_session_token!
    user.save
  end

  def log_out!(user)
    session[:session_token] = nil
    user.reset_session_token!
  end

  def current_user
    User.find_by({session_token: session[:session_token]});
  end

  def logged_in?
    !!current_user
  end

  def require_login
    unless logged_in?
      redirect_to new_session_url
    end
  end

end
