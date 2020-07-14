require 'rails_helper'

describe ProductsController do

  let(:params) { { split_keywords: FactoryBot.define(:split_keywords) } }

  describe 'GET #index' do
    it "index.html.hamlに遷移すること" do
      get :index
      expect(response).to render_template :index
      
    end
  end

end