if @user
  json.partial! 'api/users/user', user: @user
else
  {}
end
