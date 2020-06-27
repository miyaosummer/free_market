Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
    resources :users ,only: [:index,:new, :show] do
      resources :destinations ,only: [:index, :new, :create, :edit, :update]
    end
  resources :logs ,only: :index
  resources :products do
    collection do
      get 'purchase'
    end
    # :idなし
    collection do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
    end
    # :idあり
    member do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
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
