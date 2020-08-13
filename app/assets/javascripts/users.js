$(function(){
  //--メールアドレス重複時の処理 --//
  function buildEmailDupliError(){
    const html = `
    <div class="signup-input-error signup-input-error__email-duplication">入力されたメールアドレスは既に登録されています。</div>
    `;
    return html;
  }
  if($('#error_explanation').find('Email has already been taken') && location.pathname == '/users/sign_up'){
    $('#error_explanation').before(buildEmailDupliError());
  };

  function buildInputError(text){
    const html = `
    <div class="signup-input-error">${text}</div>
    `;
    return html;
  }
  function changeErrorBox(target){
    $(target).css('border-color','red');
  }
  //-- formChecker function --//
  function formChecker(){
    // エラーに関する情報をリセット
    $('.signup-input-error').remove();
    $('input').css('border-color', '');
    $('select').css('border-color', '');
    let result = true;

    // ニックネーム
    if($('#user_nickname').val().length == 0){
      $('#user_nickname').parent().append(buildInputError('ニックネームを入力してください'));
      changeErrorBox('#user_nickname');
      result = false;
    };
    // メールアドレス
    if(!$('#user_email').val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) || $('#user_email').val().length == 0){
      $('#user_email').parent().append(buildInputError('メールアドレスを入力してください'));
      changeErrorBox('#user_email');
      result = false;
    };
    // パスワード
    if($('.input-password').val().length == 0){
      $('.input-password').parent().append(buildInputError('パスワードを入力してください'));
      changeErrorBox('.input-password');
      result = false;
    };
    if($('.input-password').val().length > 0){
      if(!$('.input-password').val().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/i)){
        $('.input-password').parent().append(buildInputError('7文字以上、英字と数字の両方を含めてください'));
        changeErrorBox('.input-password');
        result = false;
      };
    };
    // パスワード確認
    if($('.input-password-confirm').val().length == 0){
      $('.input-password-confirm').parent().append(buildInputError('パスワードの確認を入力してください'));
      changeErrorBox('.input-password-confirm');
      result = false;
    };
    let pass1 = $('.input-password').val();
    let pass2 = $('.input-password-confirm').val();
    if(pass1 == pass2){
    } else {
      $('.input-password-confirm').parent().append(buildInputError('パスワードが一致しません'));
      changeErrorBox('.input-password-confirm');
      result = false;
    };
    // お名前（全角のみ）
    if($('#user_last_name').val().length > 0){
      if(!$('#user_last_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        $('.input-name-error__last').append(buildInputError('姓を全角で入力してください'));
        changeErrorBox('#user_last_name');
        result = false;
      };
    } else {
      $('.input-name-error__last').append(buildInputError('姓を入力してください'));
      changeErrorBox('#user_last_name');
      result = false;
    };
    if($('#user_first_name').val().length > 0){
      if(!$('#user_first_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        $('.input-name-error__first').append(buildInputError('名を全角で入力してください'));
        changeErrorBox('#user_first_name');
        result = false;
      };
    } else {
      $('.input-name-error__first').append(buildInputError('名を入力してください'));
      changeErrorBox('#user_first_name');
      result = false;
    };
    // お名前カナ（カナのみ）
    if($('#user_last_name_kana').val().length > 0){
      if(!$('#user_last_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        $('.input-name_kana-error__last').append(buildInputError('姓カナをカナで入力してください'));
        changeErrorBox('#user_last_name_kana');
        result = false;
      };
    } else {
      $('.input-name_kana-error__last').append(buildInputError('姓カナを入力してください'));
      changeErrorBox('#user_last_name_kana');
      result = false;
    };
    if($('#user_first_name_kana').val().length > 0){
      if(!$('#user_first_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        $('.input-name_kana-error__first').append(buildInputError('名カナをカナで入力してください'));
        changeErrorBox('#user_first_name_kana');
        result = false;
      };
    } else {
      $('.input-name_kana-error__first').append(buildInputError('名カナを入力してください'));
      changeErrorBox('#user_first_name_kana');
      result = false;
    };
    // 生年月日
    if($('#user_birthday_1i').val().length == 0 || $('#user_birthday_2i').val().length == 0 || $('#user_birthday_3i').val().length == 0){
      $('.input-birthday-error').append(buildInputError('生年月日を入力してください'));
      if($('#user_birthday_1i').val().length == 0){
        changeErrorBox('#user_birthday_1i');
        result = false;
      };
      if($('#user_birthday_2i').val().length == 0){
          changeErrorBox('#user_birthday_2i');
        result = false;
      };
      if($('#user_birthday_3i').val().length == 0){
          changeErrorBox('#user_birthday_3i');
        result = false;
      };
    };

    // スクロール位置の設定
    let signupErrorLen = $('.signup-input-error').length;
    if(signupErrorLen > 0){
      let position = $('.signup-input-error').parent().offset().top;
      // スクロールさせる
      $('html,body').animate({
        scrollTop : position
      }, {
        queue : false
      });
    };
    return result;
  }
  //-- end formChecker function --//

  // Submitボタン押されたらエラーチェックを走らせる
  $(document).on('click', '#new_user input[type=submit]', function(e) {
    if(!formChecker()){
      e.preventDefault();
      return false;
    }
  });

  // --- keyup & blur functions ---//
  // ニックネーム keyup & blur
  $('#user_nickname').keyup(function(){
    if($(this).parent().find('.signup-input-error').length > 0){
      $(this).parent().find('.signup-input-error').remove();
      $(this).css('border-color', '');
    };
  });
  $('#user_nickname').blur(function(){
    if($(this).val().length == 0 && $(this).parent().find('.signup-input-error').length == 0){
      $('#user_nickname').parent().append(buildInputError('ニックネームを入力してください'));
      changeErrorBox('#user_nickname');
    }
  });
  // メールアドレス keyup & blur
  $('#user_email').keyup(function(){
    if($('#user_email').val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
      $(this).parent().find('.signup-input-error').remove();
      $(this).css('border-color', '');
    };
  });
  $('#user_email').blur(function(){
    if((!$('#user_email').val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/) || $('#user_email').val().length == 0) && $(this).parent().find('.signup-input-error').length == 0){
      $('#user_email').parent().append(buildInputError('メールアドレスを入力してください'));
      changeErrorBox('#user_email');
    };
  });
  // パスワード keyup & blur
  $('.input-password').keyup(function(){
    if($('.input-password').val().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/i)){
      $(this).parent().find('.signup-input-error').remove();
      $(this).css('border-color', '');
    };
  });
  $('.input-password').blur(function(){
    if((!$('.input-password').val().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/i)) && $(this).parent().find('.signup-input-error').length == 0){
      $('.input-password').parent().append(buildInputError('7文字以上、英字と数字の両方を含めてください'));
      changeErrorBox('.input-password');
    };
  });
  // パスワード確認 keyup & blur
  $('.input-password-confirm').keyup(function(){
    if($('.input-password-confirm').val().length > 0){
      $(this).parent().find('.signup-input-error').remove();
      $(this).css('border-color', '');
    };
  });
  $('.input-password-confirm').blur(function(){
    let pass1 = $('.input-password').val();
    let pass2 = $('.input-password-confirm').val();
    if(pass1 == pass2){
    } else {
      $('.input-password-confirm').parent().append(buildInputError('パスワードが一致しません'));
      changeErrorBox('.input-password-confirm');
    };
  });
  // お名前（全角） keyup & blur
  $('#user_last_name').keyup(function(){
    if($('#user_last_name').val().length > 0){
      if($('#user_last_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        $('.input-name-error__last').find('.signup-input-error').remove();
        $(this).css('border-color', '');
      };
    };
  });
  $('#user_first_name').keyup(function(){
    if($('#user_first_name').val().length > 0){
      if($('#user_first_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        $('.input-name-error__first').find('.signup-input-error').remove();
        $(this).css('border-color', '');
      };
    };
  });
  $('#user_last_name').blur(function(){
    if($('#user_last_name').val().length > 0){
      if(!$('#user_last_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        if($('.input-name-error__last').find('.signup-input-error').length > 0){
          $('.input-name-error__last').find('.signup-input-error').remove();
        };
        $('.input-name-error__last').append(buildInputError('姓を全角で入力してください'));
        changeErrorBox('#user_last_name');
      };
    } else if($('.input-name-error__last').find('.signup-input-error').length == 0) {
      $('.input-name-error__last').append(buildInputError('姓を入力してください'));
      changeErrorBox('#user_last_name');
    };
  });
  $('#user_first_name').blur(function(){
    if($('#user_first_name').val().length > 0){
      if(!$('#user_first_name').val().match(/^[ぁ-んァ-ヶー一-龠 \r\n\t]+$/)){
        if($('.input-name-error__first').find('.signup-input-error').length > 0){
          $('.input-name-error__first').find('.signup-input-error').remove();
        };
        $('.input-name-error__first').append(buildInputError('名を全角で入力してください'));
        changeErrorBox('#user_first_name');
      };
    } else if($('.input-name-error__first').find('.signup-input-error').length == 0){
      $('.input-name-error__first').append(buildInputError('名を入力してください'));
      changeErrorBox('#user_first_name');
    };
  });
  // お名前カナ（全角） keyup & blur
  $('#user_last_name_kana').keyup(function(){
    if($('#user_last_name_kana').val().length > 0){
      if($('#user_last_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        $('.input-name_kana-error__last').find('.signup-input-error').remove();
        $(this).css('border-color', '');
      };
    };
  });
  $('#user_first_name_kana').keyup(function(){
    if($('#user_first_name_kana').val().length > 0){
      if($('#user_first_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        $('.input-name_kana-error__first').find('.signup-input-error').remove();
        $(this).css('border-color', '');
      };
    };
  });
  $('#user_last_name_kana').blur(function(){
    if($('#user_last_name_kana').val().length > 0){
      if(!$('#user_last_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        if($('.input-name_kana-error__last').find('.signup-input-error').length > 0){
          $('.input-name_kana-error__last').find('.signup-input-error').remove();
        };
        $('.input-name_kana-error__last').append(buildInputError('姓カナをカナで入力してください'));
        changeErrorBox('#user_last_name_kana');
      };
    } else if($('.input-name_kana-error__last').find('.signup-input-error').length == 0) {
      $('.input-name_kana-error__last').append(buildInputError('姓カナを入力してください'));
      changeErrorBox('#user_last_name_kana');
    };
  });
  $('#user_first_name_kana').blur(function(){
    if($('#user_first_name_kana').val().length > 0){
      if(!$('#user_first_name_kana').val().match(/^[ァ-ロワヲンー \r\n\t]*$/)){
        if($('.input-name_kana-error__first').find('.signup-input-error').length > 0){
          $('.input-name_kana-error__first').find('.signup-input-error').remove();
        };
        $('.input-name_kana-error__first').append(buildInputError('名カナをカナで入力してください'));
        changeErrorBox('#user_first_name_kana');
      };
    } else if($('.input-name_kana-error__first').find('.signup-input-error').length == 0){
      $('.input-name_kana-error__first').append(buildInputError('名カナを入力してください'));
      changeErrorBox('#user_first_name_kana');
    };
  });
  // 生年月日 change
  $('#user_birthday_1i').change(function(){
    if($('#user_birthday_1i').val().length > 0){
      $(this).css('border-color', '');
    };
    if($('#user_birthday_1i').val().length > 0 && $('#user_birthday_2i').val().length > 0 && $('#user_birthday_3i').val().length > 0){
      $('.input-birthday-error').find('.signup-input-error').remove();
    };
  });
  $('#user_birthday_2i').change(function(){
    if($('#user_birthday_2i').val().length > 0){
      $(this).css('border-color', '');
    };
    if($('#user_birthday_1i').val().length > 0 && $('#user_birthday_2i').val().length > 0 && $('#user_birthday_3i').val().length > 0){
      $('.input-birthday-error').find('.signup-input-error').remove();
    };
  });
  $('#user_birthday_3i').change(function(){
    if($('#user_birthday_3i').val().length > 0){
      $(this).css('border-color', '');
    };
    if($('#user_birthday_1i').val().length > 0 && $('#user_birthday_2i').val().length > 0 && $('#user_birthday_3i').val().length > 0){
      $('.input-birthday-error').find('.signup-input-error').remove();
    };
  });
  // 生年月日 blur
  $('#user_birthday_1i').blur(function(){
    if($('#user_birthday_1i').val().length == 0){
      if($('.input-birthday-error').find('.signup-input-error').length == 0){
        $('.input-birthday-error').append(buildInputError('生年月日を入力してください'));
      }; 
      changeErrorBox('#user_birthday_1i');
    };
  });
  $('#user_birthday_2i').blur(function(){
    if($('#user_birthday_2i').val().length == 0){
      if($('.input-birthday-error').find('.signup-input-error').length == 0){
        $('.input-birthday-error').append(buildInputError('生年月日を入力してください'));
      }; 
      changeErrorBox('#user_birthday_2i');
    };
  });
  $('#user_birthday_3i').blur(function(){
    if($('#user_birthday_3i').val().length == 0){
      if($('.input-birthday-error').find('.signup-input-error').length == 0){
        $('.input-birthday-error').append(buildInputError('生年月日を入力してください'));
      }; 
      changeErrorBox('#user_birthday_3i');
    };
  });
});