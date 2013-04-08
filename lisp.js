var readline = require("readline");

var repl = readline.createInterface(process.stdin, process.stdout);
//プロンプトの形を設定
repl.setPrompt(">>> ");

//プロンプトを出す
repl.prompt();

// mainループ
repl.on("line", function(line) {
    console.log(line); //変数lineにシェルに入力した文字列が入るので、これを解析すれば良い。
    lisp(line);
    repl.prompt();
});

// 終了時に呼ぶ
repl.on("close", function() {
    console.log("bye!");
});


var lisp = function(line){

var Cons = function(type,car,cdr) {
    this.type = type;
    this.car = car;
    this.cdr = cdr;
};

var token = new Array();

	for(var i=0;i<line.length;i++){
		switch(line.CharAt(i)){
			
			case "(":


}
