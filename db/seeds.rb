#######################################
# カテゴリーテーブルへのデータ登録
#######################################

# レディースの子カテゴリー
ladies_child = ["トップス","ジャケット/アウター","パンツ","スカート","ワンピース","靴","ルームウェア/パジャマ","レッグウェア","帽子","バッグ","アクセサリー","ヘアアクセサリー","小物","時計"]
#レディースの孫カテゴリー
ladies_grand_children = [
  # トップス
  ["Tシャツ/カットソー(半袖/袖なし)","Tシャツ/カットソー(七分/長袖)","シャツ/ブラウス(半袖/袖なし)","シャツ/ブラウス(七分/長袖)","ポロシャツ","キャミソール","タンクトップ","ホルターネック","ニット/セーター","チュニック","カーディガン/ボレロ","アンサンブル","ベスト/ジレ","パーカー"],
  # ジャケット/アウター
  ["テーラードジャケット","ノーカラージャケット","Gジャン/デニムジャケット","レザージャケット","ダウンジャケット","ライダースジャケット","ミリタリージャケット","ダウンベスト","ジャンパー/ブルゾン","ポンチョ","ロングコート","トレンチコート","ダッフルコート","ピーコート"],
  # パンツ
  ["デニム/ジーンズ","ショートパンツ","カジュアルパンツ","ハーフパンツ","チノパン","ワーク/パンツ/カーゴパンツ","クロップドパンツ","サロペット/オーバーオール","オールインワン","サルエルパンツ","ガウチョパンツ","その他"],
  # スカート
  ["ミニスカート","ひざ丈スカート","ロングスカート","キュロット","その他"],
  # ワンピース
  ["ミニワンピース","ひざ丈ワンピース","ロングワンピース","その他"],
  # 靴
  ["ハイヒール/パンプス","ブーツ","サンダル","スニーカー","ミュール","モカシン","ローファー/革靴","フラットシューズ/バレエシューズ","長靴/レインシューズ","その他"],
  # ルームウェア/パジャマ
  ["パジャマ","ルームウェア"],
  # レッグウェア
  ["ソックス","スパッツ/レギンス","ストッキング/タイツ","レッグウォーマー","その他"],
  # 帽子
  ["ニットキャップ/ビーニー","ハット","ハンチング/ベレー帽","キャップ","キャスケット","麦わら帽子","その他"],
  # バッグ
  ["ハンドバッグ","トートバッグ","エコバッグ","リュック/バックパック","ボストンバッグ","スポーツバッグ","ショルダーバッグ","クラッチバッグ","ポーチ/バニティ","ボディバッグ/ウェストバッグ","マザーズバッグ","メッセンジャーバッグ","ビジネスバッグ","旅行用バッグ/キャリーバッグ"],
  # アクセサリー
  ["ネックレス","ブレスレット","バングル/リストバンド","リング","ピアス(片耳用)","ピアス(両耳用)","イヤリング","アンクレット","ブローチ/コサージュ","チャーム","その他"],
  # ヘアアクセサリー
  ["ヘアゴム/シュシュ","ヘアバンド/カチューシャ","ヘアピン","その他"],
  # 小物
  ["長財布","折り財布","コインケース/小銭入れ","名刺入れ/定期入れ","キーケース","キーホルダー","手袋/アームカバー","ハンカチ","ベルト","マフラー/ショール","ストール/スヌード","バンダナ/スカーフ","ネックウォーマー","サスペンダー"],
  # 時計
  ["腕時計(アナログ)","腕時計(デジタル)","ラバーベルト","レザーベルト","金属ベルト","その他"]
]

# メンズの子カテゴリー
mens_child = ["トップス","ジャケット/アウター","パンツ","靴","バッグ","スーツ","帽子","アクセサリー","小物","時計","水着","レッグウェア","アンダーウェア","その他"]
# メンズの孫カテゴリー
mens_grand_children = [
  #メンズの孫カテゴリー
  # トップス
  ["Tシャツ/カットソー(半袖/袖なし)","Tシャツ/カットソー(七分/長袖)","シャツ","ポロシャツ","タンクトップ","ニット/セーター","パーカー","カーディガン","スウェット","ジャージ","ベスト","その他"],
  # ジャケット/アウター
  ["テーラードジャケット","ノーカラージャケット","Gジャン/デニムジャケット","レザージャケット","ダウンジャケット","ライダースジャケット","ミリタリージャケット","ナイロンジャケット","フライトジャケット","ダッフルコート","ピーコート","ステンカラーコート","トレンチコート","モッズコート"],
  # パンツ
  ["デニム/ジーンズ","ワーク/パンツ/カーゴパンツ","スラックス","チノパン","ショートパンツ","ペインターパンツ","サルエルパンツ","オーバーオール","その他"],
  # 靴
  ["スニーカー","サンダル","ブーツ","モカシン","ドレス/ビジネス","長靴/レインシューズ","デッキシューズ","その他"],
  # バッグ
  ["ショルダーバッグ","トートバッグ","ボストンバッグ","リュック/バックパック","ウエストポーチ","ボディーバッグ","ドラムバッグ","ビジネスバッグ","トラベルバッグ","メッセンジャーバッグ","エコバッグ","その他"],
  # スーツ
  ["スーツジャケット","スーツベスト","スラックス","セットアップ","その他"],
  # 帽子
  ["キャップ","ハット","ニットキャップ/ビーニー","ハンチング/ベレー帽","キャスケット","サンバイザー","その他"],
  # アクセサリー
  ["ネックレス","ブレスレット","バングル/リストバンド","リング","ピアス(片耳用)","ピアス(両耳用)","アンクレット","その他"],
  # 小物
  ["長財布","折り財布","マネークリップ","コインケース/小銭入れ","名刺入れ/定期入れ","キーケース","キーホルダー","ネクタイ","手袋","ハンカチ","ベルト","マフラー","ストール","バンダナ"],
  # 時計
  ["腕時計(アナログ)","腕時計(デジタル)","ラバーベルト","レザーベルト","金属ベルト","その他"],
  # 水着
  ["一般水着","スポーツ用","アクセサリー","その他"],
  # レッグウェア
  ["ソックス","レギンス/スパッツ","レッグウォーマー","その他"],
  # アンダーウェア
  ["トランクス","ボクサーパンツ","その他"],
  # その他
  []
]

# ベビー・キッズの子カテゴリー
babies_child = ["ベビー服(女の子用) 〜95cm","ベビー服(男の子用) 〜95cm","ベビー服(男女兼用) 〜95cm","キッズ服(女の子用) 100cm〜","キッズ服(男の子用) 100cm〜","キッズ服(男女兼用) 100cm〜","キッズ靴","子ども用ファッション小物","おむつ/トイレ/バス","外出/移動用品","授乳/食事","ベビー家具/寝具/室内用品","おもちゃ","行事/記念品"]
# インテリア・住まい・小物の子カテゴリー
interior_child = ["キッチン/食器","ベッド/マットレス","ソファ/ソファベッド","椅子/チェア","机/テーブル","収納家具","ラグ/カーペット/マット","カーテン/ブラインド","ライト/照明","寝具","インテリア小物","季節/年中行事","その他"]
# 本・音楽・ゲームの子カテゴリー
books_child = ["本","漫画","雑誌","CD","DVD/ブルーレイ","レコード","テレビゲーム"]
# おもちゃ・ホビー・グッズの子カテゴリー
toys_child = ["おもちゃ","タレントグッズ","コミック/アニメグッズ","トレーディングカード","フィギュア","楽器/器材","コレクション","ミリタリー","美術品","アート用品","その他"]
# コスメ・香水・美容の子カテゴリー
fragrance_child = ["ベースメイク","メイクアップ","ネイルケア","香水","スキンケア/基礎化粧品","ヘアケア","ボディケア","オーラルケア","リラクゼーション","ダイエット","その他"]
# 家電・スマホ・カメラの子カテゴリー
appliances_child = ["スマートフォン/携帯電話","スマホ/アクセサリー","PC/タブレット","カメラ","テレビ/映像機器","オーディオ機器","美容/健康","冷暖房/空調","生活家電","その他"]
# スポーツ・レジャーの子カテゴリー
sports_child = ["ゴルフ","フィッシング","自転車","トレーニング/エクササイズ","野球","サッカー/フットサル","テニス","スノーボード","スキー","その他スポーツ","アウトドア","その他"]
# ハンドメイドの子カテゴリー
handmade_child = ["アクセサリー(女性用)","ファッション/小物","アクセサリー/時計","日用品/インテリア","趣味/おもちゃ","キッズ/ベビー","素材/材料","二次創作物","その他"]
# チケットの子カテゴリー
tickets_child = ["音楽","スポーツ","演劇/芸能","イベント","映画","施設利用券","優待券/割引券","その他"]
# 自動車・オートバイの子カテゴリー
autos_child = ["自動車本体","自動車タイヤ/ホイール","自動車パーツ","自動車アクセサリー","オートバイ車体","オートバイパーツ","オートバイアクセサリー"]
# その他の子カテゴリー
others_child = ["まとめ売り","ペット用品","食品","飲料/酒","日用品/生活雑貨/旅行","アンティーク/コレクション","文房具/事務用品","事務/店舗用品","その他"]


######################################################################
# 登録処理
ladies     = ProductCategory.create(name: 'レディース')
mens       = ProductCategory.create(name: 'メンズ')
babies     = ProductCategory.create(name: 'ベビー・キッズ')
interior   = ProductCategory.create(name: 'インテリア・住まい・小物')
books      = ProductCategory.create(name: '本・音楽・ゲーム')
toys       = ProductCategory.create(name: 'おもちゃ・ホビー・グッズ')
fragrance  = ProductCategory.create(name: 'コスメ・香水・美容')
appliances = ProductCategory.create(name: '家電・スマホ・カメラ')
sports     = ProductCategory.create(name: 'スポーツ・レジャー')
handmade   = ProductCategory.create(name: 'ハンドメイド')
tickets    = ProductCategory.create(name: 'チケット')
autos      = ProductCategory.create(name: '自動車・オートバイ')
others     = ProductCategory.create(name: 'その他')


# レディースの子・孫カテゴリー
ladies_child.each_with_index do |child, i|
  child = ladies.children.create(name: child)
  ladies_grand_children[i].each do |grandchild|
    child.children.create(name: grandchild)
  end
end

# メンズの子・孫カテゴリー
mens_child.each_with_index do |child, i|
  child = mens.children.create(name: child)
  mens_grand_children[i].each do |grandchild|
    child.children.create(name: grandchild)
  end
end


# ベビー・キッズの子カテゴリー
 babies_child.each_with_index do |child, i|
  child = babies.children.create(name: child)
end

# インテリア・住まい・小物の子カテゴリー
interior_child.each_with_index do |child, i|
  child = interior.children.create(name: child)
end

# 本・音楽・ゲームの子カテゴリー
books_child.each_with_index do |child, i|
  child = books.children.create(name: child)
end

# おもちゃ・ホビー・グッズの子カテゴリー
toys_child.each_with_index do |child, i|
  child = toys.children.create(name: child)
end

# コスメ・香水・美容の子カテゴリー
fragrance_child.each_with_index do |child, i|
  child = fragrance.children.create(name: child)
end

# 家電・スマホ・カメラの子カテゴリー
appliances_child.each_with_index do |child, i|
  child = appliances.children.create(name: child)
end

# スポーツ・レジャーの子カテゴリー
sports_child.each_with_index do |child, i|
  child = sports.children.create(name: child)
end

# ハンドメイドの子カテゴリー
handmade_child.each_with_index do |child, i|
  child = handmade.children.create(name: child)
end

# チケットの子カテゴリー
tickets_child.each_with_index do |child, i|
  child = tickets.children.create(name: child)
end

# 自動車・オートバイの子カテゴリー
autos_child.each_with_index do |child, i|
  child = autos.children.create(name: child)
end

# その他の子カテゴリー
others_child.each_with_index do |child, i|
  child = others.children.create(name: child)
end



#######################################
# ユーザーテーブルへのデータ登録
#######################################
p "create Users"
User.create!(
  nickname: 'taro',
  email: 'suzuki_taro@gmail.com',
  password: 'Suzuki2000',
  last_name: '鈴木',
  first_name: '太郎',
  last_name_kana: 'スズキ',
  first_name_kana: 'タロウ',
  birthday: '2000/4/1'
)
User.create!(
  nickname: 'HANAKO',
  email: 'yamada_hanako@yahoo.co.jp',
  password: 'Yamada1995',
  last_name: '山田',
  first_name: '花子',
  last_name_kana: 'ヤマダ',
  first_name_kana: 'ハナコ',
  birthday: '1995/1/1'
)

#######################################
# 送付先情報テーブルへのデータ登録
#######################################
p "create Destinations"
Destination.create!(
last_name: '鈴木',
first_name: '太郎',
last_name_kana: 'スズキ',
first_name_kana: 'タロウ',
postal_code: '1500043',
prefecture_id: '東京都',
city: '渋谷区道玄坂',
block: '2-23-12',
building: 'フォンティスビル7階',
phone_number: '01234567890',
user_id: '1'
)
Destination.create!(
last_name: '山田',
first_name: '花子',
last_name_kana: 'ヤマダ',
first_name_kana: 'ハナコ',
postal_code: '5420076',
prefecture_id: '大阪府',
city: '大阪市中央区難波',
block: '5丁目1−60',
building: 'なんばスカイオ15F',
phone_number: '09876543210',
user_id: '2'
)

# #######################################
# # ブランドテーブルへのデータ登録
# #######################################
p "create product_brands"
ProductBrand.create!(
  brand_name: 'EDIFICE'
)
ProductBrand.create!(
  brand_name: 'A.P.C'
)

#######################################
# 商品テーブルへのデータ登録
#######################################
p "create Products"
Product.create!(
  name: 'テーラードジャケット',
  description: 'テーラードジャケット サイズSです。手触りは柔らかいです。素材はポリエステルです。', 
  price: '5000',
  seller_id: '1',
  product_category_id: '164',
  product_condition_id: '目立った傷や汚れなし',
  postage_way_id: '送料込み(出品者負担)',
  shipping_day_id: '2〜3日で発送',
  product_size_id: '3',
  prefecture_id: '東京都',
  public_flag: '1'
)
Product.create!(
  name: 'EDIFICE ストライプシャツ',
  description: 'EDIFICEのストライプシャツです。サイズMです。胸ポケットがない仕様です。', 
  price: '10000',
  seller_id: '1',
  product_category_id: '153',
  product_condition_id: '目立った傷や汚れなし',
  postage_way_id: '着払い(購入者負担)',
  shipping_day_id: '1〜2日で発送',
  product_brand_id: '1',
  product_size_id: '4',
  prefecture_id: '東京都',
  public_flag: '1'
)
Product.create!(
  name: '【A.P.C】グレー Tシャツ',
  description: 'A.P.Cのコットン100%のTシャツです。A.P.Cに多いロゴは記載されていない仕様です。', 
  price: '7700',
  seller_id: '2',
  product_category_id: '151',
  product_condition_id: 'やや傷や汚れあり',
  postage_way_id: '送料込み(出品者負担)',
  shipping_day_id: '4〜7日で発送',
  product_brand_id: '2',
  product_size_id: '4',
  prefecture_id: '大阪府',
  public_flag: '1'
)
Product.create!(
  name: '画像ありの下書き商品',
  description: '現在鋭意編集中', 
  price: '',
  seller_id: '1',
  product_category_id: '164',
  product_condition_id: '目立った傷や汚れなし',
  postage_way_id: '送料込み(出品者負担)',
  shipping_day_id: '1〜2日で発送',
  product_size_id: '4',
  prefecture_id: '東京都',
  public_flag: '0'
)
Product.create!(
  name: '画像なしの下書き商品',
  description: '現在鋭意編集中', 
  price: '',
  seller_id: '1',
  product_category_id: '',
  product_condition_id: '目立った傷や汚れなし',
  postage_way_id: '送料込み(出品者負担)',
  shipping_day_id: '1〜2日で発送',
  product_size_id: '',
  prefecture_id: '東京都',
  public_flag: '0'
)
# #######################################
# # 商品写真テーブルへのデータ登録
# #######################################
p "create product_images"
ProductImage.create!(
  image: File.open("#{Rails.root}/db/fixtures/product1.jpeg"),
  product_id:'1'
)
ProductImage.create!(
  image: File.open("#{Rails.root}/db/fixtures/product2.jpeg"),
  product_id:'2'
)
ProductImage.create!(
  image: File.open("#{Rails.root}/db/fixtures/product3.jpeg"),
  product_id:'3'
)
ProductImage.create!(
  image: File.open("#{Rails.root}/db/fixtures/product1.jpeg"),
  product_id:'4'
)
# #######################################
# # コメントテーブルへのデータ登録
# #######################################
p "create comments"
Comment.create!(
  comment: 'はじめまして。こちらを検討させていただいております。色味について確認なのですが、黒ではなく、ネイビーであっていますでしょうか？',
  user_id: '2',
  product_id: '1'
)



