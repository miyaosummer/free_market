require 'rails_helper'

describe Destination do
  describe '#create' do
  
#全項目の条件を満たした時は住所登録ができる
    it "全項目の条件を満たした場合は住所登録ができる" do
      destination = build(:destination)
      expect(destination).to be_valid
    end

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

#文字数に関するテストコード

    it "first_nameが35文字以下の時は住所登録できる" do
      destination = build(:destination, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(destination).to be_valid
    end

    it "first_nameが36文字以上の時は住所登録ができない" do
      destination = build(:destination, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      destination.valid?
      expect(destination.errors[:first_name]).to include("is too long (maximum is 35 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "last_nameが35文字以下の時は住所登録できる" do
      destination = build(:destination, last_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(destination).to be_valid
    end

    it "last_nameが36文字以上の時は住所登録ができない" do
      destination = build(:destination, last_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      destination.valid?
      expect(destination.errors[:last_name]).to include("is too long (maximum is 35 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "first_name_kanaが35文字以下の時は住所登録できる" do
      destination = build(:destination, first_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(destination).to be_valid
    end

    it "first_name_kanaが36文字以上の時は住所登録ができない" do
      destination = build(:destination, first_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      destination.valid?
      expect(destination.errors[:first_name_kana]).to include("is too long (maximum is 35 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "last_name_kanaが35文字以下の時は住所登録できる" do
      destination = build(:destination, last_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(destination).to be_valid
    end

    it "last_name_kanaが36文字以上の時は住所登録ができない" do
      destination = build(:destination, last_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      destination.valid?
      expect(destination.errors[:last_name_kana]).to include("is too long (maximum is 35 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "postal_codeが7文字の時は住所登録できる" do
      destination = build(:destination, postal_code: "1234567") #7文字
      expect(destination).to be_valid
    end

    it "postal_codeが9文字以上の時は住所登録できない" do
      destination = build(:destination, postal_code: "123456789") #9文字
      destination.valid?
      expect(destination.errors[:postal_code]).to include("is the wrong length (should be 7 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "postal_codeが6文字以下の時は住所登録できない" do
      destination = build(:destination, postal_code: "123456") #6文字
      destination.valid?
      expect(destination.errors[:postal_code]).to include("is the wrong length (should be 7 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "prefecture_idが49未満の時は住所登録できる" do
      destination = build(:destination, prefecture_id: "48")
      expect(destination).to be_valid
    end

    it "prefecture_idが49以上の時は住所登録できない" do
      destination = build(:destination, prefecture_id: "49") 
      destination.valid?
      expect(destination.errors[:prefecture_id]).to include("must be less than 49")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

    it "cityが50文字以下の時は住所登録できる" do
      destination = build(:destination, city: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #50文字
      expect(destination).to be_valid
    end

    it "cityが51文字以上の時は住所登録ができない" do
      destination = build(:destination, city: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #51文字
      destination.valid?
      expect(destination.errors[:city]).to include("is too long (maximum is 50 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end


    it "blockが50文字以下の時は住所登録できる" do
      destination = build(:destination, block: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #50文字
      expect(destination).to be_valid
    end

    it "blockが51文字以上の時は住所登録ができない" do
      destination = build(:destination, block: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #51文字
      destination.valid?
      expect(destination.errors[:block]).to include("is too long (maximum is 50 characters)")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end

#入力された文字種に関するテストコード

    it "first_name_kanaが全て全角カタカナの時は住所登録できる" do
      destination = build(:destination, first_name_kana: "アイウエオ")
      expect(destination).to be_valid
    end

    it "first_name_kana内に半角カタカナが含まれていても住所登録ができる" do
      destination = build(:destination, first_name_kana: "アイウエｵ")
      expect(destination).to be_valid
    end

    it "first_name_kanaにひらがなが入っている時は住所登録ができない" do
      destination = build(:destination, first_name_kana: "アイウエお") 
      destination.valid?
      expect(destination.errors[:first_name_kana]).to include("はカタカナで入力して下さい")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end


    it "last_name_kanaが全てカタカナの時は住所登録できる" do
      destination = build(:destination, last_name_kana: "アイウエオ")
      expect(destination).to be_valid
    end

    it "first_name_kana内に半角カタカナが含まれていても住所登録ができる" do
      destination = build(:destination, last_name_kana: "アイウエｵ")
      expect(destination).to be_valid
    end

    it "last_name_kanaにひらがなが入っている時は住所登録ができない" do
      destination = build(:destination, last_name_kana: "アイウエお") 
      destination.valid?
      expect(destination.errors[:last_name_kana]).to include("はカタカナで入力して下さい")#JavaScriptでエラーメッセージを表示させる際にメッセージを修正する
    end


  end
end