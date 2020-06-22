function appendOption(category) {
  let html = 
    `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
  return html;
}

function appendProductCategoryChildrenBox(insertHTML) {
  let productCategoryChildrenHtml = '';
  productCategoryChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_children">
       <option value="">選択してください</option>
       ${insertHTML}</select>`;
  $('#children_box').append(productCategoryChildrenHtml);
}

function appendProductCategoryGrandchildrenBox(insertHTML) {
  let productCategoryGrandChildrenHtml = '';
  productCategoryGrandChildrenHtml = 
    `<select class="putup__main__category__select-box" id="product_category_grandchildren" name="item[category_id]">
       <option value="">選択してください</option>
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