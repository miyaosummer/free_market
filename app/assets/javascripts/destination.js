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
      return false;
    }
  });

  //---- keyup & blur functions ----//
  // last-name keyup時のエラー処理
  $('.destinations-form__index__group__last-name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // last-name blur時のエラー処理
  $('.destinations-form__index__group__last-name').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__last-name').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // first-name keyup時のエラー処理
  $('.destinations-form__index__group__first-name').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // first-name blur時のエラー処理
  $('.destinations-form__index__group__first-name').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__first-name').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // last-kana keyup時のエラー処理
  $('.destinations-form__index__group__last-kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // last-kana blur時のエラー処理
  $('.destinations-form__index__group__last-kana').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__last-kana').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // first-kana keyup時のエラー処理
  $('.destinations-form__index__group__first-kana').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // first-kana blur時のエラー処理
  $('.destinations-form__index__group__first-kana').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__first-kana').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // 郵便番号 keyup時のエラー処理
  $('.destinations-form__index__group__postal-code__field').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 郵便番号 blur時のエラー処理
  $('.destinations-form__index__group__postal-code__field').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__postal-code__field').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // 市区町村 keyup時のエラー処理
  $('.destinations-form__index__group__city__field').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 市区町村 blur時のエラー処理
  $('.destinations-form__index__group__city__field').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__city__field').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
  // 番地 keyup時のエラー処理
  $('.destinations-form__index__group__block__field').keyup(function(){
    if($(this).parent().find('.destination-error').length > 0){
      $(this).parent().find('.destination-error').remove();
    }
  });
  // 番地 blur時のエラー処理
  $('.destinations-form__index__group__block__field').blur(function(){
    if($(this).val().length < 16){
      if($(this).parent().find('.destination-error').length == 0){
        $('.destinations-form__index__group__block__field').append(buildInputError('カード番号 (半角数字16桁) を入力してください'));
      }
    }
  });
});