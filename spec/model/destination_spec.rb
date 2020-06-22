require 'rails_helper'

describe Destination do
  describe '#create' do
#全項目の条件を満たした時は住所登録ができる
    # it "全項目の条件を満たした場合は住所登録ができる" do
    #   destination = build(:destination, user_id:"1")
    #   expect(destination).to be_valid
    # end

#文字が入力されているかチェックする
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

#入力された文字が各項目の条件を満たしているか
    # it "first_nameが35文字以下の時は住所登録できる" do
    #   destination = build(:destination, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
    #   # destination.valid?
    #   expect(destination).to be_valid
    # end
    it "first_nameが36文字以上の時は住所登録ができない" do
      destination = build(:destination, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      destination.valid?
      expect(destination.errors[:first_name]).to include("is too long (maximum is 35 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end
  end
end