//--- validate ---//
$(function(){
  // エラーメッセージ生成
  function buildInputError(text){
    const html = `
    <div class="input-error">${text}</div>
    `;
    return html;
  }
  // エラーチェック関数 ※submitボタンが押されたときの処理
  function formChecker(){
    // エラーをリセットするためすべてのinput-errorを削除
    $('.input-error').remove();
    // resultのデフォルト値をtrueに切り替え
    let result = true;
    // 画像のエラー処理
    if($('.preview__product-image').length == 0){
      $('.putup__main__upload').append(buildInputError('画像がありません'));
      result = false;
    };
    // 商品名のエラー処理
    if($('.putup__main__name__text-box').val() == ""){
      $('.putup__main__name').append(buildInputError('商品名を入力してください'));
      result = false;
    };
    if($('.putup__main__name__text-box').val().length > 40){
      $('.putup__main__name').append(buildInputError('文字数が40字を超えています'));
      result = false;
    }
    // 商品の説明のエラー処理
    if($('.putup__main__description__text-box').val() == ""){
      $('.putup__main__description').append(buildInputError('商品の説明を入力してください'));
      result = false;
    }
    if($('.putup__main__description__text-box').val().length > 1000){
      $('.putup__main__description').append(buildInputError('文字数が1000字を超えています'));
      result = false;
    }
    // カテゴリーのエラー処理
    if($('#product_category_parent').val() == 0){
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    if($('#product_category_parent').val() > 0 && $('#product_category_children').val() == 0){
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    if($('#product_category_children').val() > 0 && $('#product_category_grandchildren').val() == 0){
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    //サイズのエラー処理
    if($('#product_size').val() == 0){
      $('.putup__main__size').append(buildInputError('サイズを選択してください'));
      result = false;
    }
    // 商品の状態のエラー処理
    if($('.putup__main__condition__select-box').val() == 0){
      $('.putup__main__condition').append(buildInputError('商品の状態を選択してください'));
      result = false;
    }
    // 配送料負担のエラー処理
    if($('.putup__main__postage-way__select-box').val() == 0){
      $('.putup__main__postage-way').append(buildInputError('配送料の負担を選択してください'));
      result = false;
    }
    // 発送元の地域のエラー処理
    if($('.putup__main__prefecture__select-box').val() == 0){
      $('.putup__main__prefecture').append(buildInputError('発送元の地域を選択してください'));
      result = false;
    }
    // 発送までの日数のエラー処理
    if($('.putup__main__shipping-day__select-box').val() == 0){
      $('.putup__main__shipping-day').append(buildInputError('発送までの日数を選択してください'));
      result = false;
    }
    // 価格のエラー処理
    if($('.putup__main__price__contents__content__frame__input__number-box').val().length == 0){
      $('.putup__main__price__contents__content').append(buildInputError('価格を入力してください'));
      result = false;
    }

    // スクロール位置の設定
    let position = $('.input-error').parent().offset().top;
    // スクロールさせる
    $('html,body').animate({
      scrollTop : position
    }, {
      queue : false
    });
    return result;
  }

  // Submitボタン押されたらエラーチェックを走らせる
  $(document).on('click', '.putup__main__form input[type=submit]', function(e) {
    if ($(this).val() == '出品する' || $(this).val() == '変更を適用する'){
      if(!formChecker()){
        e.preventDefault();
        return false;
      }
    }
  });
  
  // --- keyup & blur functions ---//
  // 商品名 keyup時のエラー処理
  $('.putup__main__name__text-box').keyup(function(){
    if($(this).parent().find('.input-error').length > 0){
      $(this).parent().find('.input-error').remove();
    }
    if($(this).val().length > 40){
      $('.putup__main__name').append(buildInputError('文字数が40字を超えています'));
    }
  });
  // 商品名 blur時のエラー処理
  $('.putup__main__name__text-box').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__name').append(buildInputError('商品名を入力してください'));
      }
    }
  });
  // 商品の説明 keyup時のエラー処理
  $('.putup__main__description__text-box').keyup(function(){
    if($(this).parent().find('.input-error').length > 0){
      $(this).parent().find('.input-error').remove();
    }
    if($(this).val().length > 1000){
      $('.putup__main__description').append(buildInputError('文字数が1000字を超えています'));
    }
  });
  // 商品の説明 blur時のエラー処理
  $('.putup__main__description__text-box').blur(function(){
    if($(this).val().length == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__description').append(buildInputError('商品に説明を入力してください'));
      }
    }
  });
  // 親カテゴリー blur時のエラー処理
  $(document).on('blur', '#product_category_parent',function(){
    if($(this).val() == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      }
    }
  });
  // 親カテゴリー エラー解決処理
  $(document).on('change', '#product_category_parent', function(){
    if($(this).val() > 0){
      $(this).parent().find('.input-error').remove();
    }
  });
  // 子カテゴリー blur時のエラー処理
  $(document).on('blur', '#product_category_children',function(){
    if($(this).val() == 0){
      if($(this).parent().parent().find('.input-error').length == 0){
        $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      }
    }
  });
  // 子カテゴリー エラー解決処理
  $(document).on('change', '#product_category_children', function(){
    if($(this).val() > 0){
      $(this).parent().parent().find('.input-error').remove();
    }
  });
  // 孫カテゴリー blur時のエラー処理
  $(document).on('blur', '#product_category_grandchildren',function(){
    if($(this).val() == 0){
      if($(this).parent().parent().parent().find('.input-error').length == 0){
        $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      }
    }
  });
  // 孫カテゴリー エラー解決処理
  $(document).on('change', '#product_category_grandchildren', function(){
    if($(this).val() > 0){
      $(this).parent().parent().parent().find('.input-error').remove();
    }
  });
  // 商品の状態 blur時のエラー処理
  $('#product_condition').blur(function(){
    if($(this).val() == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__condition').append(buildInputError('商品の状態を選択してください'));
      }
    }
  });
  // 商品の状態 エラー解決処理
  $('#product_condition').change(function(){
    if($(this).val().length > 0){
      $(this).parent().find('.input-error').remove();
    }
  });
  // 配送料の負担 blur時のエラー処理
  $('#postage_way').blur(function(){
    if($(this).val() == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__postage-way').append(buildInputError('商品の状態を選択してください'));
      }
    }
  });
  // 配送料の負担 エラー解決処理
  $('#postage_way').change(function(){
    if($(this).val().length > 0){
      $(this).parent().find('.input-error').remove();
    }
  });

  // 配送元の地域 blur時のエラー処理
  $('#prefecture').blur(function(){
    if($(this).val() == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__prefecture').append(buildInputError('商品の状態を選択してください'));
      }
    }
  });
  // 配送元の地域 エラー解決処理
  $('#prefecture').change(function(){
    if($(this).val().length > 0){
      $(this).parent().find('.input-error').remove();
    }
  });

  // 配送までの日数 blur時のエラー処理
  $('#shipping_day').blur(function(){
    if($(this).val() == 0){
      if($(this).parent().find('.input-error').length == 0){
        $('.putup__main__shipping-day').append(buildInputError('商品の状態を選択してください'));
      }
    }
  });
  // 配送までの日数 エラー解決処理
  $('#shipping_day').change(function(){
    if($(this).val().length > 0){
      $(this).parent().find('.input-error').remove();
    }
  });
  // 販売価格 keyup時のエラー処理
  $('#price').on('change keyup', function(){
    if(299 < $(this).val() && $(this).val() < 10000000){
      if($(this).parents('.putup__main__price__contents__content').find('.input-error').length > 0){
        $(this).parents('.putup__main__price__contents__content').find('.input-error').remove();
      }
      // 販売手数料、販売利益の処理
      let price = $(this).val();
      let fee = Math.floor(price * 0.1);
      let profit = price - fee;
      let display_fee = fee.toLocaleString();
      let display_profit = profit.toLocaleString();
      $('.putup__main__commission__contents__content__frame__input__calc-result').text('¥' + display_fee);
      $('.putup__main__profit__contents__content__frame__input__calc-result').text('¥' + display_profit);
    } else {
      $('.putup__main__commission__contents__content__frame__input__calc-result').text('ー');
      $('.putup__main__profit__contents__content__frame__input__calc-result').text('ー');
    }
  });
  // 販売価格 blur時のエラー処理
  $('#price').blur(function(){
    if($(this).val().length == 0){
      if($(this).parents('.putup__main__price__contents__content').find('.input-error').length == 0){
        $('.putup__main__price__contents__content').append(buildInputError('販売価格を入力してください'));
      }
    }
  });
  // サイズ エラー解決処理
  $(document).on('change', '#product_size', function() {
    if($(this).val().length > 0){
      $(this).parent().find('.input-error').remove();
    }
  });
  // サイズ blur時のエラー処理
  $(document).on('blur', '#product_size', function() {
    if($(this).val() == 0){
      if($(this).parents('.putup__main__size__select-box').find('.input-error').length == 0){
        $('.putup__main__size').append(buildInputError('サイズを選択してください'));
      }
    }
  });
  // ---  end keyup & blur functions ---//
});
//--- end validate ---//

//--- putup images --//
$(function() {
  function buildImagePreview(ln) {
    const html = `
    <div class="preview" data-index="${ln}">
      <div class="preview__product-image" data-index="${ln}">
        <img src="" width="118px" height="118px">
      </div>
      <div class="preview__action">
        <i class="fa fa-trash preview__action__delete"></i>
      </div>
    </div>`;
    return html;
  }
  function buildInputArea(index) {
    const html = `
      <input data-index="${index}" name="product[product_images_attributes][${index}][image]" id="upload-image[${index}]" class="upload-image" accept="image/*" type="file">
    `;
    return html;
  }
  // dropzone-areaの縮小処理
  function reductionDropzoneArea(previewLen) {
    // 1段目の処理
    if(previewLen < 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${previewLen}))`
      })
    }
    // 2枚以降 labelをカメラアイコンにする
    if(previewLen == 1){
      $('.dropzone-area').find('p').replaceWith('<i class="fa fa-camera dropzone-box__icon"></i>')
    }
    // 0枚のとき アイコンからテキストに変える
    if(previewLen == 0){
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>');
    }
    // 5枚以上のとき 1段目boxを隠し、2段目を出現させる
    if(previewLen >= 5) {
      $('.dropzone-area').css({
        'width': '100%'
      })
    }
    // 6枚目以降の処理
    if(previewLen > 5) {
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${previewLen -5 }))`
      })
    }
    // 10枚になったらdropzone-areaを隠す
    if(previewLen == 10){
      $('.dropzone-area').css({
        'display': 'none'
      })
    }
  }
  // dropzone-areaの拡大処理
  function expansionDropzoneArea(uploadimageLen){
    // upload-imageの個数が4個以下なら
    if(uploadimageLen < 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${uploadimageLen}))`
      });
    }
    // 0のときはアイコンをテキストに変えてあげる
    if(uploadimageLen == 0){
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>');
    }
    // upload-imageの個数が5個以上なら
    if(uploadimageLen >= 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${uploadimageLen-5}))`
      });
    }
    // 10個→9個になったときにインプット領域を復活させる
    if(uploadimageLen == 9){
      $('.dropzone-area').css({
        'display': 'block'
      })
    }
  }
  // 編集画面遷移時
  // 登録済み画像の処理
  if ($('.hidden-destroy').length > 0){
    let registeredLen = $('.hidden-destroy').length
    let previewLen = $('.preview').length;
    reductionDropzoneArea(previewLen);
    $('.dropzone-area').find('p').replaceWith('<i class="fa fa-camera dropzone-box__icon"></i>');
    // inputbox追加
    $('.dropzone-area__inputs').append(buildInputArea(registeredLen));
    // labelの向き先をinputの一番うしろにする
    $('.dropzone-box').attr('for', function(){
      return 'upload-image[' + registeredLen + ']'
    });
    // 販売手数料、販売利益の処理
    let price = $('#price').val();
    if (price > 0){
      let fee = Math.floor(price * 0.1);
      let profit = price - fee;
      let display_fee = fee.toLocaleString();
      let display_profit = profit.toLocaleString();
      $('.putup__main__commission__contents__content__frame__input__calc-result').text('¥' + display_fee);
      $('.putup__main__profit__contents__content__frame__input__calc-result').text('¥' + display_profit);
    }
  }
  // プレビュー追加
  $(document).on('change', 'input[type="file"].upload-image', function(e){
    // inputを追加する
    let numInputs = $('.upload-image').length;
    $('.dropzone-area__inputs').append(buildInputArea(numInputs));
    // labelの向き先をinputの一番うしろにする
    $('.dropzone-box').attr('for', function(){
      return 'upload-image[' + numInputs + ']'
    });
    // previewを追加
    // 選択した画像ファイルをfile配列に格納、fileReaderでプレビューを作成
    let file = $(this).prop('files')[0];
    let fileReader = new FileReader(); // fileReaderを起動
    let inputDataIndex = $(this).data('index');
    // fileReaderがロードできたら、previewsにプレビューを追加する
    fileReader.onload = function(e) {
      // preview追加
      $('.dropzone-area').before(buildImagePreview(inputDataIndex));
      // previewにimageを追加
      $('[data-index="' + inputDataIndex + '"]').children('img').attr({src: e.target.result});
      // input-errorを隠す ※error処理
      $('.putup__main__upload .input-error').css({
        'display': 'none'
      });
    }
    fileReader.readAsDataURL(file)
    let previewLen = $('.preview').length;
    reductionDropzoneArea(previewLen + 1);
  });
  
  // 削除機能
  $(document).on('click', '.preview__action__delete', function(){
    // 登録済み画像の削除チェックボックスの個数を取得
    let registeredLen = $('.hidden-destroy').length;
    // 削除するプレビューの親要素を取得
    let targetPreview = $(this).parent().parent();
    // 削除するプレビューのindex番号を取得
    let targetDataIndex = $(targetPreview).attr('data-index');
    // チェックボックスを取得（登録済み画像）
    const hiddenCheck = $(`input[data-index="${targetDataIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    // previewとinputを削除
    if (targetDataIndex > 99){
      // 登録済み画像はpreviewだけ削除
      targetPreview.remove();
    } else {
      // 新規画像はinputとpreviewを両方とも削除
      $('[data-index="' + targetDataIndex + '"]').remove();
    };
    // previewが0枚になったら隠していたinput-errorを出す
    if($('.preview').length == 0){
      $('.putup__main__upload .input-error').css({
        'display': 'block'
      });
    };
    // labelの向き先をinputの一番うしろにする
    let numInputs = $('.upload-image').length - 1;
    $('.dropzone-box').attr('for', function(){
      return 'upload-image[' + numInputs + ']'
    });
    // 各インプット要素のインデックス番号を整頓する
    if($('.hidden-destroy').length > 0){
    // 編集画面時の処理(EDIT)
      // upload-imageのindex番号を整頓
      $('.dropzone-area__inputs .upload-image').each(function(index){
        if(index < registeredLen){
        } else {
        // upload-image達のインデックスを整頓
        $(this).attr({'name': `product[product_images_attributes][${index}][image]`});
        $(this).attr('data-index', index);
        $(this).attr('id', `upload-image[${index}]`);
        };
      });
      // preview要素のindex番号を整頓
      $('.preview').each(function(index){
        // hidden_destroyでチェックされている数をカウント
        let checkCnt = $('.dropzone-area__inputs input:checkbox:checked').length;
        if($(this).data('index') > 99){
        } else {
          $(this).attr('data-index', index + checkCnt);
          $(this).children('.preview__product-image').attr('data-index', index+checkCnt);
        };
      })
    } else {
    // 新規投稿時の処理(NEW)
      // upload-imageのindex番号を整頓
      $('.dropzone-area__inputs .upload-image').each(function(index){
        $(this).attr({'name': `product[product_images_attributes][${index}][image]`});
        $(this).attr('data-index', index);
        $(this).attr('id', `upload-image[${index}]`);
      });
      // previewのindex番号を整頓
      $('.preview').each(function(index){
        $(this).attr('data-index', index);
        $(this).children('.preview__product-image').attr('data-index', index);
      })
    };
    let previewLen = $('.preview').length;
    expansionDropzoneArea(previewLen);
  })
});
//--- end putup images--//

//--- category function ---//
function appendOption(category) {
  let html = 
    `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
  return html;
}

function appendProductCategoryChildrenBox(insertHTML) {
  let productCategoryChildrenHtml = '';
  productCategoryChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_children" name="product[product_category_id]">
       <option value="" data-category="">選択してください</option>
       ${insertHTML}</select>`;
  $('#children_box').append(productCategoryChildrenHtml);
}

function appendProductCategoryGrandchildrenBox(insertHTML) {
  let productCategoryGrandChildrenHtml = '';
  productCategoryGrandChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_grandchildren" name="product[product_category_id]">
       <option value="" data-category="">選択してください</option>
       ${insertHTML}</select>`;
  $('#grandchildren_box').append(productCategoryGrandChildrenHtml);
}

function appendProductSizeBox(insertHTML) {
  let productSizeHtml = '';
  productSizeHtml = 
    `<div class='putup__main__size'>
     <p class='putup__main__size__title'>
     サイズ
     <span class='putup__main__size__title__imperative'>
     必須
     </span>
     </p>
     <select class="putup__main__size__select-box" id="product_size" name="product[product_size_id]">
     <option value="">選択してください</option>${insertHTML}</select>
     </div>`;
  $('#size_box').append(productSizeHtml);
}

$(document).on("change","#product_category_parent", function() {
  let productParentCategory =  $("#product_category_parent").val();
  if (productParentCategory != "") {
    $.ajax( {
      type: 'GET',
      url: 'get_product_category_children',
      data: { product_category_parent_name: productParentCategory },
      dataType: 'json'
    })
    .done(function(children) {
      $("#children_box").empty();
      $("#grandchildren_box").empty();
      $("#size_box").empty();
      let insertHTML = '';
      children.forEach(function(child) {
        insertHTML += appendOption(child);
      });
      appendProductCategoryChildrenBox(insertHTML);
    })
    .fail(function() {
      alert('商品子カテゴリーの取得に失敗');
    })
  }else{
    $("#children_box").empty();
    $("#grandchildren_box").empty();
    $("#size_box").empty();
  }
});
$(document).on('change', '#children_box', function() {
  let child_id = $('#product_category_children option:selected').data('category');
  if (child_id != ""){
    $.ajax({
      url: 'get_product_category_grandchildren',
      type: 'GET',
      data: { product_category_child_id: child_id },
      datatype: 'json'
    })
    .done(function(grandchildren) {
      if (grandchildren.length != 0) {
        $("#grandchildren_box").empty();
        $("#size_box").empty();
        let insertHTML = '';
        grandchildren.forEach(function(grandchild) {
          insertHTML += appendOption(grandchild);
        });
        appendProductCategoryGrandchildrenBox(insertHTML);
      }
    })
    .fail(function() {
      alert('商品孫カテゴリーの取得に失敗');
    })
  }else{
    $("#grandchildren_box").empty();
    $("#size_box").empty();
  }
});

$(document).on('change', '#grandchildren_box', function() {
  let child_id = $('#product_category_children option:selected').data('category');
  let grandchildId = $('#product_category_grandchildren option:selected').data('category');

  if(clothesShoeJudgement(child_id, grandchildId) != ""){
    $.ajax({
      url: 'get_product_size',
      type: 'GET',
      data: { product_size_id: clothes_shoe_judgement_val },
      datatype: 'json'
    })
    .done(function(sizes) {
      $("#size_box").empty();
      let insertHTML = '';
      sizes.forEach(function(size) {
        insertHTML += appendOption(size);
      });
      appendProductSizeBox(insertHTML);
  })
  .fail(function() {
    alert('商品サイズの取得に失敗');
  })
  }else{
    $("#size_box").empty();
  }
});

function clothesShoeJudgement(child, grandchild) {
  clothes_size_array     = [14, 29, 44, 57, 63, 79, 150, 163, 178, 210, 255];
  Ladies_shoe_size_array = [68, 82];
  Mens_shoe_size_array   = [188, 260];
  if (clothes_size_array.includes(child) || clothes_size_array.includes(grandchild)){
    return clothes_shoe_judgement_val = 1;
  }else if(Ladies_shoe_size_array.includes(child) || Ladies_shoe_size_array.includes(grandchild)){
    return clothes_shoe_judgement_val = 2;
  }else if(Mens_shoe_size_array.includes(child) || Mens_shoe_size_array.includes(grandchild)){
    return clothes_shoe_judgement_val = 3;
  }else{
    return clothes_shoe_judgement_val = "";
  }
}
//--- end category function ---//