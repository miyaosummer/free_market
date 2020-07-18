FactoryBot.define do
  factory :user do
    id                    {"10"}
    nickname              {"TESTARO"}
    email                 {"factorybot@test.com"}
    password              {"Passw0rd"}
    encrypted_password    {"Passw0rd"}
    last_name             {"富士"}
    first_name            {"太郎"}
    last_name_kana        {"フジ"}
    first_name_kana       {"タロウ"}
    birthday              {"1992-01-01"}
  end

  factory :product_category do
    id                    {"999"}
    name                  {"テストカテゴリー"}
  end

  factory :product do
    id                    {"1"}
    name                  {"テストの名前"}
    description           {"テストの説明分"}
    price                 {20000} 
    seller_id             {"10"}
    product_category_id   {"999"}
    product_condition_id  {"新品、未使用"} 
    postage_way_id        {"着払い(購入者負担)"}
    shipping_day_id       {"1~2日で発送"} 
    product_size_id       {"M"}
    prefecture_id         {"青森県"}
    after(:build) do |product|
      product.product_images<<build(:product_image, product: product)
    end
  end

  factory :product_has_11_images, class: Product do
    id                    {"1"}
    name                  {"テストの名前"}
    description           {"テストの説明分"}
    price                 {20000} 
    seller_id             {"10"}
    product_category_id   {"999"}
    product_condition_id  {"新品、未使用"} 
    postage_way_id        {"着払い(購入者負担)"}
    shipping_day_id       {"1~2日で発送"} 
    product_size_id       {"M"}
    prefecture_id         {"青森県"}
    11.times do
      after(:build) do |product|
        product.product_images<<build(:product_image, product: product)
      end
    end
  end

  factory :product_has_10_images, class: Product do
    id                    {"1"}
    name                  {"テストの名前"}
    description           {"テストの説明分"}
    price                 {20000} 
    seller_id             {"10"}
    product_category_id   {"999"}
    product_condition_id  {"新品、未使用"} 
    postage_way_id        {"着払い(購入者負担)"}
    shipping_day_id       {"1~2日で発送"} 
    product_size_id       {"M"}
    prefecture_id         {"青森県"}
    10.times do
      after(:build) do |product|
        product.product_images<<build(:product_image, product: product)
      end
    end
  end

end