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
      //背景色をつけるために設定済みのクラスを配置する。まずは初期化をする。
      $(".selected-parent").removeClass("selected-parent")
      //一度子カテゴリを削除することで「カテゴリー」テキストにマウスが乗るたびに親カテゴリのみ表示されるようにする。
      $(".child_category").remove();
      //孫カテゴリも削除する。理由は同上
      $(".grand_child_category").remove();
    });
    $(".nav__left__category__title").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });

    $(".parent_category").on("mouseover", function() {
      //マウスが乗っているリンクのid番号を取得する
      var id = this.id
      //背景色をつけるために設定済みのクラスを配置する。まずは初期化をする。
      $(".selected-parent").removeClass("selected-parent")
      //選択したカテゴリーに色を付けるクラスを付与する。
      $('#' + id).addClass("selected-parent");
      //子カテゴリを削除する。これをしないと親カテゴリ内で移動した時に、表示させた子カテゴリが消えず縦に並んでしまう。
      $(".child_category").remove();
      //孫カテゴリも削除する。
      $(".grand_child_category").remove();
      //「カテゴリ」テキストを太字のままにしておく
      $('.nav__left__category__title').css('font-weight','bold')
      $.ajax({
        type: 'GET',
        url: '/tops/get_header_category_children',
        data: {parent_id: id},
        dataType: 'json'
      }).done(function(children) {
        //帰ってきた子カテゴリー（配列）
        children.forEach(function (child) {
          //HTMLにして
          var html = buildChildHTML(child);
          //リストに追加する
          $(".nav__left__category__list__children").append(html);
        })
      });
    });

    //「テキスト」の文字を太字にする。カテゴリリストからマウスが離れた時に元の太さに戻す。
    $(".nav__left__category__list").on("mouseover", function() {
      $('.nav__left__category__title').css('font-weight','bold')
    });
    $(".nav__left__category__list").on("mouseout", function() {
      $('.nav__left__category__title').css('font-weight','normal')
    });

    //動的に追加されたHTML
    $(document).on("mouseover", ".child_category", function () {
      var id = this.id
      //親カテゴリ同様背景色をつけるために設定済みのクラスを配置する。まずは初期化をさせる。
      $(".selected-child").removeClass("selected-child")
      //選択したカテゴリーに色を付けるクラスを付与する。
      $('#' + id).addClass("selected-child");
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