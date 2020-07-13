require 'rails_helper'

describe ProductsController do
  let(:products){ FactoryBot.create(:product) }
  describe 'GET #index' do
    it "index.html.hamlに遷移すること" do
      get :index
      expect(response).to render_template :index
    end
  end

end