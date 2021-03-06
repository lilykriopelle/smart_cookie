# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :string           not null
#

class User < ActiveRecord::Base
  include Voteable, PgSearch
  attr_reader :password

  validates :name, :email, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  has_many :sessions
  has_many :menus, class_name: "Menu", foreign_key: :author_id
  has_many :authored_recipes, class_name: "Recipe", foreign_key: :author_id
  has_many :votes, as: :voteable, dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by({email: email});
    user.try(:correct_password?, password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            name: auth_hash[:info][:name].split.first,
            email: auth_hash[:info][:nickname],
            password: SecureRandom::urlsafe_base64)
    end

    user
  end

  def correct_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

end
