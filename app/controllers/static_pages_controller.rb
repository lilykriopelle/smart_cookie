class StaticPagesController < ApplicationController

  before_action :require_login

  def root
    render :root
  end

  def search
    render :search
  end

end
