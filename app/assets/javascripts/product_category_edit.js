
function appendOption(category) {
  let html = 
    `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
  return html;
}

function appendProductCategoryChildrenBox(insertHTML) {
  let productCategoryChildrenHtml = '';
  productCategoryChildrenHtml = 
    `<select class="putup__main__category__select-box" id="children_box" name="product[product_category_id]">
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
//編集時、親カテゴリが変更された時に、すでに存在していた子カテゴリ〜サイズのセレクトボックスを削除する。
$(document).on("change",".box--parent", function() {
  let productParentCategory =  $(".box--parent").val();

  if (!productParentCategory){
    $(".box--child").remove();
    $(".box--grand-child").remove();
    $(".putup__main__size").remove();
    $("#children_box").empty();
    $("#grandchildren_box").empty();
    $("#size_box").empty();
    return false;
  }

  if (productParentCategory != "") {
    $.ajax( {
      type: 'GET',
      url: 'get_product_category_children',
      data: { product_category_parent_name: productParentCategory },
      dataType: 'json'
    })
    .done(function(children) {
      $(".box--child").remove();
      $(".box--grand-child").remove();
      $(".putup__main__size").remove();
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
    $(".box--child").remove();
    $(".box--grand-child").remove();
    $(".putup__main__size").remove();
    $("#children_box").empty();
    $("#grandchildren_box").empty();
    $("#size_box").empty();
  }
});
//編集時、子カテゴリが変更された時に、すでに存在していた孫カテゴリ〜サイズのセレクトボックスを削除する。
$(document).on('change', '.box--child', function() {
  let child_id = $(this).val()

  if (!child_id){
    $(".box--grand-child").remove();
    $(".putup__main__size").remove();
    $("#grandchildren_box").empty();
    $("#size_box").empty();
    return false;
  }

  if (child_id != ""){
    $.ajax({
      url: 'get_product_category_grandchildren',
      type: 'GET',
      data: { product_category_child_id: child_id },
      datatype: 'json'
    })
    .done(function(grandchildren) {
      if (grandchildren.length != 0) {
        $(".box--grand-child").remove();
        $(".putup__main__size").remove();
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
    $(".box--grand-child").remove();
    $(".putup__main__size").remove();
    $("#grandchildren_box").empty();
    $("#size_box").empty();
  }
});

