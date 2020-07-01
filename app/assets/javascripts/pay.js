document.addEventListener(
  "DOMContentLoaded", e => {

    // token_submitというidがnullの場合、下記コードを実行しない(!)
    if (document.getElementById("token_submit") != null) {

      // ここに公開鍵を直書き
      Payjp.setPublicKey("pk_test_6778f79bdf344cf5a6a8c5db");
      // IDがtoken_submitの場合に取得される
      let btn = document.getElementById("token_submit");

      // ボタンが押されたときに作動
      btn.addEventListener("click", e => {
        
        // ボタンを一旦 無効化
        e.preventDefault();
        // 入力されたデータを取得
        
        let card = {
          number: document.getElementById("card_number").value,
          cvc: document.getElementById("cvc").value,
          exp_month: document.getElementById("exp_month").value,
          exp_year: document.getElementById("exp_year").value
        };

        Payjp.createToken(card, (status, response) => {
          // 成功した場合
          if (status === 200) {
            $("#card_number").removeAttr("name");
            $("#cvc").removeAttr("name");
            $("#exp_month").removeAttr("name");
            // データを自サーバにpostしないように削除
            $("#exp_year").removeAttr("name");
            // 取得したトークンを送信できる状態にする
            $("#card_token").append(
              $('<input type="hidden" name="payjp-token">').val(response.id)
            );
            // inputFormのsubmitを発動
            document.inputForm.submit();
            alert("登録が完了しました");
          } else {
            alert("カード情報が正しくありません");
          }

        });

      });

    }

  },

  false

);