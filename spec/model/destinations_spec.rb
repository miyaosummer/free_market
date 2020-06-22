require 'rails_helper'
describe Destination do
  describe '#create' do
    it "first_nameの記述がなければ登録できないこと" do
     destination = build(:destination)
     expect(destination.errors[:first_name]).to include("can't be blank")
    end
  end
end