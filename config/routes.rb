Rails.application.routes.draw do
  devise_for :users
  get 'mypage/index'
  root "mypage#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
