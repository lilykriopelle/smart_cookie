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

  after_initialize :ensure_session_token

  validates :name, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :email, uniqueness: true

  has_many :authored_recipes, class_name: "Recipe", foreign_key: :author_id
  has_many :votes, as: :voteable, dependent: :destroy

  multisearchable against: :name

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

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.session_token
  end

  def correct_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

end
