Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
  resources :users ,only: [:index,:new, :show]
  resources :destinations ,only: [:index, :new, :create, :edit, :update]
  resources :logs ,only: :index
  resources :products ,only: [:new, :show] do
    collection do
      get 'purchase'
    end
  end
end
