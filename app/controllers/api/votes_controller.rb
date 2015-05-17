class Api::VotesController < ApplicationController

  def create
    @vote = Vote.new(vote_params)
    if @vote.save!
      render json: @vote
    else
      render json: @vote.errors.full_messages
    end
  end

  def destroy
    @vote = Vote.find(params[:id])
    render json: @vote.destroy!
  end

  private
    def vote_params
      params.require(:vote).permit(:voteable_id, :voteable_type, :voter_id)
    end
end
