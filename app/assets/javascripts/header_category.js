$(function() {

    // 子カテゴリーを追加する
    function buildChildHTML(child){
      var html =`<a class="child_category" id="${child.id}" 
                  href="#">${child.name}</a>`;
      return html;
    }

    // 孫カテゴリを追加する。子要素と同じ動きをさせる
    function buildGrandChildHTML(child){
      var html =`<a class="grand_child_category" id="${child.id}"
                 href="#">${child.name}</a>`;
      return html;
    }

  //「カテゴリー」テキストにマウスが乗った時の処理
    $(".nav__left__category__title").on("mouseover", function() {
      $('.nav__left__category__title').css('font-weight','bold')
      $(".selected-parent").removeClass("selected-parent")//背景色をつけるために設定済みのクラスを配置する。まずは初期化をする。
      $(".child_category").remove();//一度子カテゴリを削除することで「カテゴリー」テキストにマウスが乗るたびに親カテゴリのみ表示されるようにする。
      $(".grand_child_category").remove();//孫カテゴリも削除する。理由は同上
    });
    $(".nav__left__category__title").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });
  //

    $(".parent_category").on("mouseover", function() {
      var id = this.id//マウスが乗っているリンクのid番号を取得する
      $(".selected-parent").removeClass("selected-parent")//背景色をつけるために設定済みのクラスを配置する。まずは初期化をする。
      $('#' + id).addClass("selected-parent");//選択したカテゴリーに色を付けるクラスを付与する。
      $(".child_category").remove();//子カテゴリを削除する。これをしないと親カテゴリ内で移動した時に、表示させた子カテゴリが消えず縦に並んでしまう。
      $(".grand_child_category").remove();//孫カテゴリも削除する。
      $('.nav__left__category__title').css('font-weight','bold')//「カテゴリ」テキストを太字のままにしておく
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_children',
        data: {parent_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {//帰ってきた子カテゴリー（配列）
          var html = buildChildHTML(child);//HTMLにして
          $(".nav__left__category__list__children").append(html);//リストに追加する
        })
      });
    });

    $(".nav__left__category__list").on("mouseover", function() {//「テキスト」の文字を太字にする。カテゴリリストからマウスが離れた時に元の太さに戻す。
      $('.nav__left__category__title').css('font-weight','bold')
    });
    $(".nav__left__category__list").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });

  
    $(document).on("mouseover", ".child_category", function () {//動的に追加されたHTML
      var id = this.id
      $(".selected-child").removeClass("selected-child")//親カテゴリ同様背景色をつけるために設定済みのクラスを配置する。まずは初期化をさせる。
      $('#' + id).addClass("selected-child");//選択したカテゴリーに色を付けるクラスを付与する。
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_grandchildren',
        data: {child_id: id},
        dataType: 'json'
      }).done(function(children) {
        children.forEach(function (child) {
          var html = buildGrandChildHTML(child);
          $(".nav__left__category__list__grand-children").append(html);
        })
        $(document).on("mouseover", ".child_category", function () {
          $(".grand_child_category").remove();
        });
      });
    });  
  });