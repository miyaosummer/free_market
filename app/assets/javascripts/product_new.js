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
      console.log('画像がありません');
      $('.putup__main__upload').append(buildInputError('画像がありません'));
      result = false;
    };
    // 商品名のエラー処理
    if($('.putup__main__name__text-box').val() == ""){
      $('.putup__main__name').append(buildInputError('商品名を入力してください'));
      result = false;
    };
    if($('.putup__main__name__text-box').val().length > 40){
      console.log($('.putup__main__name__text-box').val().length + "文字のためエラー");
      $('.putup__main__name').append(buildInputError('文字数が40字を超えています'));
      result = false;
    }
    // 商品の説明のエラー処理
    if($('.putup__main__description__text-box').val() == ""){
      $('.putup__main__description').append(buildInputError('商品の説明を入力してください'));
      result = false;
    }
    if($('.putup__main__description__text-box').val().length > 1000){
      console.log($('.putup__main__description__text-box').val().length + "文字のためエラー");
      $('.putup__main__description').append(buildInputError('文字数が1000字を超えています'));
      result = false;
    }
    // カテゴリーのエラー処理
    if($('#product_category_parent').val() == 0){
      console.log('親カテゴリー未選択');
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    if($('#product_category_parent').val() > 0 && $('#product_category_children').val() == 0){
      console.log('子カテゴリー未選択');
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    if($('#product_category_children').val() > 0 && $('#product_category_grandchildren').val() == 0){
      console.log('孫カテゴリー未選択');
      $('.putup__main__category').append(buildInputError('カテゴリーを選択してください'));
      result = false;
    }
    // 商品の状態のエラー処理
    if($('.putup__main__condition__select-box').val() == 0){
      console.log('商品の状態未選択');
      $('.putup__main__condition').append(buildInputError('商品の状態を選択してください'));
      result = false;
    }
    // 配送料負担のエラー処理
    if($('.putup__main__postage-way__select-box').val() == 0){
      console.log('配送料の負担未選択');
      $('.putup__main__postage-way').append(buildInputError('配送料の負担を選択してください'));
      result = false;
    }
    // 発送元の地域のエラー処理
    if($('.putup__main__prefecture__select-box').val() == 0){
      console.log('発送元の地域未選択');
      $('.putup__main__prefecture').append(buildInputError('発送元の地域を選択してください'));
      result = false;
    }
    // 発送までの日数のエラー処理
    if($('.putup__main__shipping-day__select-box').val() == 0){
      console.log('発送までの日数未選択');
      $('.putup__main__shipping-day').append(buildInputError('発送までの日数を選択してください'));
      result = false;
    }
    // 価格のエラー処理
    if($('.putup__main__price__contents__content__frame__input__number-box').val().length == 0){
      console.log('価格未入力');
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
  $('.putup__main__form').submit(function(e){
    if(!formChecker()){
      console.log('formChecker=false');
      e.preventDefault();
      return false;
    }
  });

  // --- keyup & blur functions ---//
  // 商品名 keyup時のエラー処理
  $('.putup__main__name__text-box').keyup(function(){
    if($(this).parent().find('.input-error').length > 0){
      $(this).parent().find('.input-error').remove();
    }
    if($(this).val().length > 40){
      console.log($('.putup__main__name__text-box').val().length + "文字のためエラー");
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
      console.log($('.putup__main__description__text-box').val().length + "文字のためエラー");
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
  // ---  end keyup & blur functions ---//
});
//--- end validate ---//

//--- putup images --//
$(function() {
  // 配列を用意
  var inputs = [];
  // プレビュー生成
  function buildImagePreview(ln) {
    const html = `
    <div data-index="${ln}" class="preview">
      <div data-index="${ln}" class="preview__product-image">
        <img src="" width="118px" height="118px">
      </div>
      <div class="preview__action">
        <i class="fa fa-trash preview__action__delete"></i>
      </div>
    </div>`;
    return html;
  }
  // Inputボックス生成（display: noneで隠れているため、ビューには見えません）
  function buildInputArea(index) {
    const html = `
      <input data-index="${index}" name="product[product_images_attributes][${index}][image]" id="upload-image[${index}]" class="upload-image" type="file">
    `;
    return html;
  }
  // プレビュー追加
  $(document).on('change', 'input[type="file"].upload-image', function(e){
    // inputを追加する
    let numInputs = $('.upload-image').length;
    $('.dropzone-box').append(buildInputArea(numInputs));
    // labelの向き先をinputの一番うしろにする
    $('.dropzone-box').attr('for', function(){
      return 'upload-image[' + numInputs + ']'
    });
    // previewを追加
    // 選択したフィアルをfileに格納
    let file = $(this).prop('files')[0];
    // fileReaderを起動
    let fileReader = new FileReader();
    // inputs配列にデータを格納
    inputs.push($(this));
    // inputs配列の長さを計る
    let inputsLen = inputs.length;
    // fileReaderがロードできたら、previewsにプレビューを追加する
    fileReader.onload = function(e) {
      let inputsIndex = inputsLen - 1;
      // preview追加
      $('.dropzone-area').before(buildImagePreview(inputsIndex));
      // previewにimageを追加
      $('[data-index="' + inputsIndex + '"]').children('img').attr({src: e.target.result});
      // input-errorを隠す ※error処理
      $('.putup__main__upload .input-error').css({
        'display': 'none'
      });
    }
    fileReader.readAsDataURL(file)
    // インプット領域の幅調整
    // 1段目の処理
    if(inputsLen < 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${inputsLen}))`
      })
    }
    // 2枚以降は、labelをカメラアイコンにする
    if(inputsLen == 1){
      $('.dropzone-area').find('p').replaceWith('<i class="fa fa-camera dropzone-box__icon"></i>')
    }
    // 0枚のときはアイコンからテキストに変える
    if(inputsLen == 0){
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>');
    }
    // 5枚以上のときは1段目boxを隠して、2段目を出現させる
    if(inputsLen >= 5) {
      $('.dropzone-area').css({
        'width': '100%'
      })
    }
    // 6枚目以降の処理
    if(inputsLen > 5) {
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${inputsLen -5 }))`
      })
    }
    // 10枚になったらdropzone-areaを隠す
    if(inputsLen == 10){
      $('.dropzone-area').css({
        'display': 'none'
      })
    }
  });
  // 削除機能
  $(document).on('click', '.preview__action__delete', function(){
    // 削除するプレビューの親要素を取得
    let targetPreview = $(this).parent().parent();
    // 削除するプレビューのインデックスを取得（inputファイルを消すためのインデックス）
    let targetDataIndex = $(targetPreview).data('index');
    // プレビューとインプットを削除
    $('[data-index="' + targetDataIndex + '"]').remove();
    // 隠していたinput-errorを出す
    $('.putup__main__upload .input-error').css({
      'display': 'block'
    });

    // labelの向き先をinputの一番うしろにする
    let numInputs = $('.upload-image').length - 1;
    $('.dropzone-box').attr('for', function(){
      return 'upload-image[' + numInputs + ']'
    });
    
    // inputs配列から削除
    inputs.splice(targetDataIndex, 1);

    // 各要素の連番を再設定
    // 各インプット要素のインデックス番号を整頓する
    $('.dropzone-box .upload-image').each(function(index){
      // upload-image達のインデックスを整頓
      $(this).attr({'name': `product[product_images_attributes][${index}][image]`});
      $(this).attr('data-index', index);
      $(this).attr('id', `upload-image[${index}]`);
    })
    // プレビュー要素のインデックス番号を整頓する
    $('.preview').each(function(index){
      $(this).attr('data-index', index);
      $(this).children('.preview__product-image').attr('data-index', index);
    })

    // インプット領域の幅調整
    // upload-imageの個数が4個以下なら
    if($('.upload-image').length - 1 < 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${$('.upload-image').length - 1}))`
      });
    }
    // 0のときはアイコンをテキストに変えてあげる
    if($('.upload-image').length -1 == 0){
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>');
    }
    // upload-imageの個数が5個以上なら
    if($('.upload-image').length - 1 >= 5){
      $('.dropzone-area').css({
        'width': `calc(100% - ( 121px * ${($('.upload-image').length - 1)-5}))`
      });
    }
    // 10個→9個になったときにインプット領域を復活させる
    if($('.upload-image').length -1 == 9){
      $('.dropzone-area').css({
        'display': 'block'
      })
    }
  })
});
//--- end putup images--//

function appendOption(category) {
  let html = 
    `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
  return html;
}

function appendProductCategoryChildrenBox(insertHTML) {
  let productCategoryChildrenHtml = '';
  productCategoryChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_children">
       <option value="" data-category="">選択してください</option>
       ${insertHTML}</select>`;
  $('#children_box').append(productCategoryChildrenHtml);
}

function appendProductCategoryGrandchildrenBox(insertHTML) {
  let productCategoryGrandChildrenHtml = '';
  productCategoryGrandChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_grandchildren" name="item[category_id]">
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