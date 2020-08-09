require 'rails_helper'

describe User do
  describe '#create' do
  
#全項目の条件を満たした時はユーザー登録ができる
    it "全項目の条件を満たした場合はユーザー登録ができる" do
      user = build(:user)
      expect(user).to be_valid
    end

#文字が入力されているかチェックする
    it "first_nameが空欄の時はユーザー登録ができない" do
     user = build(:user, first_name: "")
     user.valid?
     expect(user.errors[:first_name]).to include("can't be blank")
    end

    it "last_nameが空欄の時はユーザー登録ができない" do
      user = build(:user, last_name: "")
      user.valid?
      expect(user.errors[:last_name]).to include("can't be blank")
    end

    it "first_name_kanaが空欄の時はユーザー登録ができない" do
      user = build(:user, first_name_kana: "")
      user.valid?
      expect(user.errors[:first_name_kana]).to include("can't be blank")
    end

    it "last_name_kanaが空欄の時はユーザー登録ができない" do
      user = build(:user, last_name_kana: "")
      user.valid?
      expect(user.errors[:last_name_kana]).to include("can't be blank")
    end

    it "emailが空欄の時はユーザー登録ができない" do
      user = build(:user, email: "")
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "passwordが空欄の時はユーザー登録ができない" do
      user = build(:user, password: "")
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "nicknameが空欄の時はユーザー登録ができない" do
      user = build(:user, nickname: "")
      user.valid?
      expect(user.errors[:nickname]).to include("can't be blank")
    end

    it "birthdayが空欄の時はユーザー登録ができない" do
      user = build(:user, birthday: "")
      user.valid?
      expect(user.errors[:birthday]).to include("can't be blank")
    end

#文字数に関するテストコード

    it "first_nameが35文字以下の時はユーザー登録できる" do
      user = build(:user, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(user).to be_valid
    end

    it "first_nameが36文字以上の時はユーザー登録ができない" do
      user = build(:user, first_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      user.valid?
      expect(user.errors[:first_name]).to include("is too long (maximum is 35 characters)")
    end

    it "last_nameが35文字以下の時はユーザー登録できる" do
      user = build(:user, last_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(user).to be_valid
    end

    it "last_nameが36文字以上の時はユーザー登録ができない" do
      user = build(:user, last_name: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      user.valid?
      expect(user.errors[:last_name]).to include("is too long (maximum is 35 characters)")
    end

    it "first_name_kanaが35文字以下の時はユーザー登録できる" do
      user = build(:user, first_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(user).to be_valid
    end

    it "first_name_kanaが36文字以上の時はユーザー登録ができない" do
      user = build(:user, first_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      user.valid?
      expect(user.errors[:first_name_kana]).to include("is too long (maximum is 35 characters)")
    end

    it "last_name_kanaが35文字以下の時はユーザー登録できる" do
      user = build(:user, last_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ") #35文字
      expect(user).to be_valid
    end

    it "last_name_kanaが36文字以上の時はユーザー登録ができない" do
      user = build(:user, last_name_kana: "アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオア") #36文字
      user.valid?
      expect(user.errors[:last_name_kana]).to include("is too long (maximum is 35 characters)")
    end

    it "nicknameが20文字の時はユーザー登録できる" do
      user = build(:user, nickname: "アイウエオカキクケコサシスセソタチツテト") #20文字
      expect(user).to be_valid
    end

    it "nicknameが21文字以上の時はユーザー登録できない" do
      user = build(:user, nickname: "アイウエオカキクケコサシスセソタチツテトナ") #21文字
      user.valid?
      expect(user.errors[:nickname]).to include("is too long (maximum is 20 characters)")
    end

    it "passwordが7文字の時はユーザー登録できる" do
      user = build(:user, password: "m234567") #7文字
      expect(user).to be_valid
    end

    it "passwordが6文字以下の時はユーザー登録できない" do
      user = build(:user, password: "123456") #6文字
      user.valid?
      expect(user.errors[:password]).to include("is too short (minimum is 7 characters)")
    end


#入力された文字種に関するテストコード

    it "first_name_kanaが全て全角カタカナの時はユーザー登録できる" do
      user = build(:user, first_name_kana: "アイウエオ")
      expect(user).to be_valid
    end

    it "first_name_kanaを半角カタカナのみで入力するとユーザー登録できない" do
      user = build(:user, first_name_kana: "ｱｲｳｴｵ")
      user.valid?
      expect(user.errors[:first_name_kana]).to include("は全角カタカナで入力して下さい")
    end

    it "first_name_kanaをひらがなで入力されるとユーザー登録ができない" do
      user = build(:user, first_name_kana: "あいうえお") 
      user.valid?
      expect(user.errors[:first_name_kana]).to include("は全角カタカナで入力して下さい")
    end


    it "last_name_kanaが全て全角カタカナの時はユーザー登録できる" do
      user = build(:user, last_name_kana: "アイウエオ")
      expect(user).to be_valid
    end

    it "last_name_kanaに半角カタカナで入力するとユーザー登録できない" do
      user = build(:user, last_name_kana: "ｱｲｳｴｵ")
      user.valid?
      expect(user.errors[:last_name_kana]).to include("は全角カタカナで入力して下さい")
    end

    it "last_name_kanaにひらがな入力するとユーザー登録ができない" do
      user = build(:user, last_name_kana: "あいうえお") 
      user.valid?
      expect(user.errors[:last_name_kana]).to include("は全角カタカナで入力して下さい")
    end

    it "emailに@がないとユーザー登録できない" do
      user = build(:user, email: "1234567") 
      user.valid?
      expect(user.errors[:email]).to include("is invalid")
    end

    it "passwordが数字のみの時はユーザー登録できない" do
      user = build(:user, password: "1234567") 
      user.valid?
      expect(user.errors[:password]).to include("is invalid")
    end

    it "passwordが英語のみの時はユーザー登録できない" do
      user = build(:user, password: "abcdefg") 
      user.valid?
      expect(user.errors[:password]).to include("is invalid")
    end


  end
end