Rails.application.routes.draw do
  devise_for :users
  get 'mypage/index'
  root "mypage#index"
end
