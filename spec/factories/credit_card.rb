FactoryBot.define do

  factory :credit_card do
    user_id { 1 }
    customer_id { "String" }
    card_id { "String" }
  end
end