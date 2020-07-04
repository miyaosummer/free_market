class ApplicationController < ActionController::Base

  before_action :basic_auth, if: :production?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_header_category_parent
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    logs_path
  end

    # 親カテゴリーに紐づく子カテゴリーの配列を取得
    def get_header_category_children
      @product_category_children = ProductCategory.find(params[:parent_id]).children
    end
  
    # 子カテゴリーに紐づく孫カテゴリーの配列を取得
    def get_header_category_grandchildren
      @product_category_grandchildren = ProductCategory.find(params[:child_id]).children
    end
    

  
  private

  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end

  # 親カテゴリーの配列を取得
  def set_header_category_parent  
      @parents = ProductCategory.where(ancestry: nil)
  end

  protected

  def configure_permitted_parameters
    added_attrs = [:nickname, :email, :password, :last_name, :first_name, :last_name_kana, :first_name_kana, :birthday]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
  end

end
