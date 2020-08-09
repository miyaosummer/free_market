$(function(){
  // 最初の画像のみ半透明解除
  $(".sub-image").first().css('opacity', '1');
  // マウスオーバーの処理
  $(".sub-image").mouseover(function(e){
    let mainDataIndex = $(this).parent().attr('data-index')
    $(".sub-image").each(function(){
      let subDataIndex = $(this).parent().attr('data-index');
      if (subDataIndex == mainDataIndex){
        $(this).css('opacity', '1');
      } else {
        $(this).css('opacity', '0.5');
      };
    });
    $(".show__main__product__content__information__image__top--list__item").each(function(index){
      if(index == mainDataIndex){
        $(this).css('z-index', 10);
      } else {
        $(this).css('z-index', -1);
      };
    });
  });
});