Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
  resources :users ,only: :new
  resources :logs ,only: :index
  resources :products, only: [:new, :show] do
    collection do
      get 'purchase'
    end
  end
  resources :credit_cards, only:[:index, :new, :create, :show]do
    collection do
      post 'pay', to: 'credit_cards#pay' # payjpでトークン化を行う
      post 'delete', to: 'credit_cards#delete'
      post 'show', to: 'credit_cards#show'
    end
  end
end
