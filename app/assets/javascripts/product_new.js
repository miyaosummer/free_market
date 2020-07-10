//--- putup images --//
$(function() {
  // 配列を用意
  var inputs = [];

  // プレビューのhtml生成
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
  // Inputボックスの生成（display: noneで隠れているため、ビューには見えません）
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
      // 配列は0からなので、length-1する
      let inputsIndex = inputsLen - 1;
      // #image-boxの先頭にpreviewを追加
      $('.dropzone-area').before(buildImagePreview(inputsIndex));
      // previewにimageを追加 ※セレクタに変数を使いたい場合は↓のようにする
      $('[data-index="' + inputsIndex + '"]').children('img').attr({src: e.target.result});
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
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>')
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
      // ***upload-image達のインデックスを整頓
      $(this).attr({'name': `product[product_images_attributes][${index}][image]`});
      // ↓これはキャッシュの内容を変えるっぽい attrで変えよう
      // $(this).data('index', `'${index}'`);
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
      $('.dropzone-area').find('i').replaceWith('<p class="dropzone-box__text">ここをクリックして画像を追加してください</p>')
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
  }
});