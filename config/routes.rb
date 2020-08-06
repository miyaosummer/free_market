Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
  resources :users, only: [:index, :new, :show] do
    member do
      get 'credit_new', to:'users#credit_new'
      post 'credit_create', to:'users#credit_create'
      get 'credit_show', to:'users#credit_show'
      delete 'credit_destroy', to:'users#credit_destroy'
      get 'logout'
    end
    resources :destinations, only: [:index, :new, :create, :edit, :update] 
  end
  resources :logs, only: [:index] do
    collection do
      get 'login'
    end
  end
  resources :products ,only: [:new, :create, :show, :edit, :update, :index, :destroy] do
    resources :comments, only: [:create, :destroy]
    member do
      get 'credit_new', to:'products#credit_new'
      post 'credit_create', to:'products#credit_create'
      delete 'credit_destroy', to:'products#credit_destroy'
      get 'purchase'
    end
    collection do
      post 'pay'
      get 'purchased'
    end
    # :idなし
    collection do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
      get 'get_product_size', defaults: { format: 'json' }
    end
    # :idあり
    member do
      get 'get_product_category_children', defaults: { format: 'json' }
      get 'get_product_category_grandchildren', defaults: { format: 'json' }
      get 'get_product_size', defaults: { format: 'json' }
    end
  end
  resources :tops, only: [:index, :new] do
    #Ajaxで動くアクションのルートを作成
    collection do
      get 'get_header_category_children', defaults: { format: 'json' }
      get 'get_header_category_grandchildren', defaults: { format: 'json' }
    end
    member do
      get 'get_header_category_children', defaults: { format: 'json' }
      get 'get_header_category_grandchildren', defaults: { format: 'json' }
    end
  end
end