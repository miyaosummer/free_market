FactoryBot.define do

  factory :destination do
    first_name          {"山田"}
    last_name           {"彩"}
    first_name_kana     {"ヤマダ"} 
    last_name_kana      {"アヤ"}
    postal_code         {"1234567"} 
    prefecture_id       {1}
    city                {"新宿区"} 
    block               {"青山"}
    building            {"野原ビル"} 
    phone_number        {"080-3344-3348"} 
    user                {1}
  end

end