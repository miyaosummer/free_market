$(function(){
  function buildHTML(comment){

    var HTML_nickname = 
      `<li class="show__main__product__content__comment__text__list">
        <div class= "show__main__product__content__comment__text__list__name">
          ${comment.user_nickname}`

    var HTML_sellerMark = 
            `<p class="show__main__product__content__comment__text__list__name--seller">
              出品者
            </p>`

    var HTML_deleteBtn = 
            `<ul class="show__main__product__content__comment__text__list__btn">
              <li>
                <a rel="nofollow" data-method=delete href="/products/${comment.product_id}/comments/${comment.id}", class: "show__main__product__content__comment__text__list__btn--delete">コメントを削除する</a>
              </li>
            </ul>`
    
    var HTML_nicknameEnd =
        `</div>`

    var HTML_content =
        `<div class="show__main__product__content__comment__text__list__sentence">
          ${comment.comment}
        </div>`

    var HTML_end = 
      `</li>`

    if (comment.user_id == comment.product_seller.id){
      // 出品者とコメントしたユーザーが同一の場合
      var html = HTML_nickname + HTML_sellerMark + HTML_deleteBtn + HTML_nicknameEnd + HTML_content + HTML_end
    }else{
      // 出品者とコメントしたユーザーが異なる場合
      var html = HTML_nickname + HTML_deleteBtn + HTML_nicknameEnd + HTML_content + HTML_end
    }

    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.show__main__product__content__comment__text').append(html);
      $('.show__main__product__content__comment__form__textbox').val('');
      $('.show__main__product__content__comment__form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('コメントの送信に失敗しました');
      $('.show__main__product__content__comment__form__submit').prop('disabled', false);
    })
  })
})
