var readline = require("readline");

var repl = readline.createInterface(process.stdin, process.stdout);
//プロンプトの形を設定
repl.setPrompt(">>> ");

//プロンプトを出す
repl.prompt();

// mainループ
repl.on("line", function(line) {
    console.log(line); //変数lineにシェルに入力した文字列が入るので、これを解析すれば良い。
    repl.prompt();
});

// 終了時に呼ぶ
repl.on("close", function() {
    console.log("bye!");
});




var Cons = (function() {
  function Cons(type,car,cdr) {
    this.type = type;
    this.car = car;
    this.cdr = cdr;
  }
  return Cons;
})();
