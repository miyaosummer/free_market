Rails.application.routes.draw do
  get 'mypage/index'
  root "mypage#index"
end
