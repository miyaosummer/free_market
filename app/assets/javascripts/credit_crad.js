//---- validates ----//
$(function(){
  // エラーメッセージ生成
  function buildInputError(text) {
    const html = `
    <div class="creditcard-error">${text}</div>
    `;
    return html;
  }
  // エラーチェック関数 ※submitボタンが押されたときの処理
  function formChecker() {
    // エラーをリセットするためすべてのcreditcard-errorを削除
    $('.creditcard-error').remove();
    // resultのデフォルト値をtrueに切り替え
    let result = true;
    // カード番号のエラー処理
    if($('#card_number').val() == ""){
      $('.mypage-card__main__container__register-form__number').append(buildInputError('カード番号を入力してください'));
      result = false;
    };

    // スクロール位置の設定
    let position = $('.creditcard-error').parent().offset().top;
    // スクロールさせる
    $('html,body').animate({
      scrollTop : position
    }, {
      queue : false
    });

    return result;
  }

  // Submitボタン押されたらエラーチェックを走らせる
  $('.form-wrapper').submit(function(e){
    if(!formChecker()){
      e.preventDefault();
      return false;
    }
  });

  //---- keyup & blur functions ----//
  // カード番号 blur時のエラー処理
  $('#card_number').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.creditcard-error').length == 0){
        $('.mypage-card__main__container__register-form__number').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // セキュリティコード blur時のエラー処理
  $('#cvc').blur(function(){
    if($(this).val().length <= 2){
      if($(this).parent().find('.creditcard-error').length == 0){
        $('.mypage-card__main__container__register-form__security').append(buildInputError('セキュリティコードを入力してください'));
      }
    }
  });

});