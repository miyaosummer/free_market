Rails.application.routes.draw do
  devise_for :users
  get 'mypage/index'
  root "mypage#index"
  root "tops#index"
  resources :users ,only: :new
  resources :logs ,only: :index
  resources :products ,only: [:new, :show] do
    collection do
      get 'purchase'
    end
  end
end
