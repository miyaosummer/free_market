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
end
