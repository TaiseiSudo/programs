// htmlのtextareaを取得
const textarea = document.getElementById("entry");

// textareaの情報が書き換えられたときfunctionを実行
// 変更時の情報が括弧内のeに入っている
textarea.addEventListener("change", function(e){
  // 変更時の文字列をtextという変数に代入
  const text = e.target.value;

  // 正規表現というものを使って.test()関数を使うとその文字列に平・片・漢のどれが含まれているかをtrue/falseで返してくれる
  const regexp_hira = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
  const regexp_hira_only = /^[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]+$/mu;
  const regexp_kata = /[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu;
  const regexp_kata_only = /^[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]+$/mu;
  const regexp_kanji = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
  const regexp_kanji_only = /^([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)+$/mu;

  // if文で文字列の種類を分類しそれにあった文章を出す＊ここの処理を書き換えれば好きな動作をさせることが出来る
  if(regexp_hira_only.test(text)){
    console.log("ひらがなのみの文章です");
  } else if(regexp_kata_only.test(text)){
    console.log("かたかなのみの文章です");
  } else if(regexp_kanji_only.test(text)){
    console.log("かんじのみの文章です");
  } else if(regexp_hira.test(text)){
    console.log("ひらがなの含まれる文章です");
  } else if(regexp_kata.test(text)){
    console.log("かたかなの含まれる文章です");
  } else if(regexp_kanji.test(text)){
    console.log("かんじのふくまれる文章です");
  } else {
    console.log("分類不能",text);
  }
});