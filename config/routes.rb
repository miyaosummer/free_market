Rails.application.routes.draw do
  devis: users
  get 'mypage/index'
  root "mypage#index"
end
