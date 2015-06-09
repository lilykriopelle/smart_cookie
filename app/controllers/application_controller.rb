class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :sign_in!, :current_user, :logged_in?, :log_out!, :require_login

  def sign_in!(user)
    session[:session_token] = Session.generate_session_token
    user.sessions.create!({ session_token: session[:session_token] })
  end

  def log_out!(user)
    @session = Session.find_by({ session_token: session[:session_token] })
    @session.destroy
  end

  def current_user
    current_session = Session.find_by({ session_token: session[:session_token] })
    current_session ? current_session.user : nil
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
