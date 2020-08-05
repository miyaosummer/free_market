// animate()とは、オブジェクトの移動や透過率などを変更するアニメーションを実装するためのメソッド
// append()は、html要素を動的に追加することができるメソッド
// blur()とは、フォーム要素などでフォーカスが外れたタイミングで処理を実行できるメソッド
// keyup()とは、キーボードのキーを離した際に処理を実行できるメソッド
// offset()とは、画面上(document内)に配置したHTML要素の表示位置を座標で取得できるメソッド
// parent()メソッドとは、1つ上の階層である「親要素」を取得することができるメソッド
// val()とは、HTMLタグ内に記述されているvalue属性を取得したり変更することができるメソッド

//---- validates ----//
$(function(){
  // エラーメッセージ生成
  function buildInputError(text) {
    const html = `
    <div class="destination-error">${text}</div>
    `;
    return html;
  }
  // エラーチェック関数 ※submitボタンが押されたときの処理
  function formChecker() {
    // エラーをリセットするためすべてのdestination-errorを削除
    $('.destination-error').remove();
    // resultのデフォルト値をtrueに切り替え
    let result = true;
    // LastNameのエラー処理
    if($('#destinations_last_name').val() == ""){
      $('.destinations-form__index__group-name').append(buildInputError('お名前（姓）を入力してください'));
      result = false;
    };
    // FirstNameのエラー処理
    if($('#destinations_first_name').val() == ""){
      $('.destinations-form__index__group-name').append(buildInputError('お名前（名）を入力してください'));
      result = false;
    };
    // LastKanaのエラー処理
    if($('#destinations_last_name_kana').val() == ""){
      $('.destinations-form__index__group-kana').append(buildInputError('お名前（姓カナ）を入力してください'));
      result = false;
    };
    // FirstKanaのエラー処理
    if($('#destinations_first_name_kana').val() == ""){
      $('.destinations-form__index__group-kana').append(buildInputError('お名前（名カナ）を入力してください'));
      result = false;
    };
    // 郵便番号のエラー処理
    if($('#destination_postal_code').val() == ""){
      $('.destinations-form__index__group-postal-code').append(buildInputError('郵便番号を入力してください'));
      result = false;
    };
    // 都道府県のエラー処理
    if($('#destination_prefecture_id').val() == ""){
      $('.destinations-form__index__group-prefectures').append(buildInputError('都道府県を選択してください'));
      result = false;
    };
    // 市区町村のエラー処理
    if($('#destination_city').val() == ""){
      $('.destinations-form__index__group-city').append(buildInputError('市区町村を入力してください'));
      result = false;
    };
    // 市区町村のエラー処理
    if($('#destination_block').val() == ""){
      $('.destinations-form__index__group-block').append(buildInputError('番地を入力してください'));
      result = false;
    };

    // スクロール位置の設定
    let position = $('.destination-error').parent().offset().top;
    // スクロールさせる
    $('html,body').animate({
      scrollTop : position
    }, {
      queue : false // 読み方: キュー
    });
    return result;
  }

  // Submitボタン押されたらエラーチェックを走らせる
  $('.destinations-forms').submit(function(e){
    e.preventDefault();
    if(!formChecker()){
      return false;
    } else {
      $('.destinations-forms')[0].submit()
    }
  });

  //---- keyup & blur functions ----//
  // LastName keyup時のエラー処理
  $('#destinations_last_name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // LastName blur時のエラー処理
  $('#destinations_last_name').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-name').append(buildInputError('お名前を入力してください'));
      }
    }
  });
  // FirstName keyup時のエラー処理
  $('#destinations_first_name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // FirstName blur時のエラー処理
  $('#destinations_first_name').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-name').append(buildInputError('お名前を入力してください'));
      }
    }
  });
  // LastKana keyup時のエラー処理
  $('#destinations_last_name_kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // LastKana blur時のエラー処理
  $('#destinations_last_name_kana').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-kana').append(buildInputError('お名前（カナ）を入力してください'));
      }
    }
  });
  // FirstKana keyup時のエラー処理
  $('#destinations_first_name_kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // FirstKana blur時のエラー処理
  $('#destinations_first_name_kana').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-kana').append(buildInputError('お名前（カナ）を入力してください'));
      }
    }
  });
  // 郵便番号 keyup時のエラー処理
  $('#destination_postal_code').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 郵便番号 blur時のエラー処理
  $('#destination_postal_code').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-postal-code').append(buildInputError('郵便番号を入力してください'));
      }
    }
  });
  // 都道府県 keyup時のエラー処理
  $('#destination_prefecture_id').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 都道府県 blur時のエラー処理
  $('#destination_prefecture_id').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__prefectures').append(buildInputError('都道府県を選択してください'));
      }
    }
  });
  // 市区町村 keyup時のエラー処理
  $('#destination_city').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 市区町村 blur時のエラー処理
  $('#destination_city').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-city').append(buildInputError('市区町村を入力してください'));
      }
    }
  });
  // 番地 keyup時のエラー処理
  $('#destination_block').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 番地 blur時のエラー処理
  $('#destination_block').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-block').append(buildInputError('番地を入力してください'));
      }
    }
  });
});

