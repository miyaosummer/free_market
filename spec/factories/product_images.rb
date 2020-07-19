FactoryBot.define do
  factory :product_image do
    id                  {"1"}
    image               {File.open("#{Rails.root}/app/assets/images/hoge.png")}
    product
  end
end