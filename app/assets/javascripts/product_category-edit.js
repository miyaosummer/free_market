
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
$(document).on('change', '.box--child', function() {
  // let child_id = $('#product_category_children').data('category');
  let child_id = $(this).val()
  // console.log($(this))
  // console.log(child_id)

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

$(document).on('change', '.putup__main__category__select-box--grandchildren', function() {
  let child_id = $('.box--child').val()
  let grandchildId = $('.box--grand-child').val();
  // console.log("うんこ")
  console.log(child_id)
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
