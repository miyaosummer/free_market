require 'rails_helper'

describe Destination do
  describe '#create' do

    it "first_nameが空欄の時は住所登録ができない" do
     destination = build(:destination, first_name: "")
     destination.valid?
     expect(destination.errors[:first_name]).to include("can't be blank")
    end

    it "last_nameが空欄の時は住所登録ができない" do
      destination = build(:destination, last_name: "")
      destination.valid?
      expect(destination.errors[:last_name]).to include("can't be blank")
    end

    it "first_name_kanaが空欄の時は住所登録ができない" do
      destination = build(:destination, first_name_kana: "")
      destination.valid?
      expect(destination.errors[:first_name_kana]).to include("can't be blank")
    end

    it "last_name_kanaが空欄の時は住所登録ができない" do
      destination = build(:destination, last_name_kana: "")
      destination.valid?
      expect(destination.errors[:last_name_kana]).to include("can't be blank")
    end

    it "postal_codeが空欄の時は住所登録ができない" do
      destination = build(:destination, postal_code: "")
      destination.valid?
      expect(destination.errors[:postal_code]).to include("can't be blank")
    end

    it "prefecture_idが空欄の時は住所登録ができない" do
      destination = build(:destination, prefecture_id: "")
      destination.valid?
      expect(destination.errors[:prefecture_id]).to include("can't be blank")
    end

    it "cityが空欄の時は住所登録ができない" do
      destination = build(:destination, city: "")
      destination.valid?
      expect(destination.errors[:city]).to include("can't be blank")
    end

    it "blockが空欄の時は住所登録ができない" do
      destination = build(:destination, block: "")
      destination.valid?
      expect(destination.errors[:block]).to include("can't be blank")
    end

  end
end