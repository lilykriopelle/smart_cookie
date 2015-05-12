class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :sign_in!, :current_user, :logged_in?, :log_out!

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

end
