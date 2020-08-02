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
    // エラーをリセットするためすべてのcreditcard-errorを削除
    $('.destination-error').remove();

    // スクロール位置の設定
    let position = $('.destination-error').parent().offset().top;
    // スクロールさせる
    $('html,body').animate({
      scrollTop : position
    }, {
      queue : false
    });
    return true;
  }

  // Submitボタン押されたらエラーチェックを走らせる
  $('.destinations-form__index').submit(function(e){
    if(!formChecker()){
      e.preventDefault();
      alert('入力が完了していません');
      return false;
    }
  });

  $('destinations-form__index__submit-btn').addEventListener('click', (e) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault();
    if($(this).val().length == 0) {
      
    } else {
      document.commit.submit();
    }
  });

  //---- keyup & blur functions ----//
  // last-name keyup時のエラー処理
  $('#destinations_last_name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // last-name blur時のエラー処理
  $('#destinations_last_name').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-name').append(buildInputError('お名前を入力してください'));
      }
    }
  });
  // first-name keyup時のエラー処理
  $('#destinations_first_name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // first-name blur時のエラー処理
  $('#destinations_first_name').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-name').append(buildInputError('お名前を入力してください'));
      }
    }
  });
  // last-kana keyup時のエラー処理
  $('#destinations_last_name_kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // last-kana blur時のエラー処理
  $('#destinations_last_name_kana').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-kana').append(buildInputError('お名前（カナ）を入力してください'));
      }
    }
  });
  // first-kana keyup時のエラー処理
  $('#destinations_first_name_kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // first-kana blur時のエラー処理
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
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-postal-code').append(buildInputError('郵便番号を入力してください'));
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
    if($(this).val().length < 16){
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
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group-block').append(buildInputError('番地を入力してください'));
      }
    }
  });
});

