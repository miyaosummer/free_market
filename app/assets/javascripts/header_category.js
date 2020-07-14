$(function() {
  // 子カテゴリーを追加する
    function buildChildHTML(child){
      var html =`<a class="child_category" id="${child.id}" 
                  href="#">${child.name}</a>`;
      return html;
    }
  
    $(".parent_category").on("mouseover", function() {
      var id = this.id//どのリンクにマウスが乗ってるか
      $(".child_category").remove();//一度子カテゴリを
      $(".grand_child_category").remove();//孫カテゴリも
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_children',
        data: {parent_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {//帰ってきた子カテゴリー（配列）
          var html = buildChildHTML(child);//HTMLにして
          $(".children_list").append(html);//リストに追加します
        })
      });
    });
    
    // 孫カテゴリを追加する。子要素と同じ動き
    function buildGrandChildHTML(child){
      var html =`<a class="grand_child_category" id="${child.id}"
                 href="#">${child.name}</a>`;
      return html;
    }
  
    $(document).on("mouseover", ".child_category", function () {//子カテゴリーのリストは動的に追加されたHTMLである
      var id = this.id
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_grandchildren',
        data: {child_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {
          var html = buildGrandChildHTML(child);
          $(".grand_children_list").append(html);
        })
        $(document).on("mouseover", ".child_category", function () {
          $(".grand_child_category").remove();
        });
      });
    });  
  });