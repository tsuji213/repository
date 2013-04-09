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

var Cons = (function() {
  function Cons(type,car,cdr) {
    this.type = type;
    this.car = car;
    this.cdr = cdr;
  }
  return Cons;
})();
/*
this.Cons = function(type,car,cdr) {
    this.type = type;
    this.car = car;
    this.cdr = cdr;
};
*/
this.token = new Array();
var p = 0;
	for(var i=0;i<line.length;i++){
		switch(line.charAt(i)){
			
			case "(":
				 token.push(line.charAt(i));
				 break;
			case ")":
                                 if(p!=0){
					 token.push(line.substr(i-p,p));
					 p = 0;
					 };
				 token.push(line.charAt(i));
 				 break;
			case " ":
				 if(p!=0){
					 token.push(line.substr(i-p,p));
					 p = 0;
					 };
				 break;

			default:
				p++;
				break;		

		}
	}

for(var i=0;token[i]!=null;i++){
console.log(token[i]);
}

//再帰必要
this.count = function(i){
var c = 0;
	if(i!=0){
	for(i;token[i]!=")";i++) c++;
	}
return c;
}

this.parse = function(i){
	switch(token[i]){
		case "(":
			return Cons("car",parse(i+1),parse(count(i)+i+1));
	 
		case ")":
			return null;
			
		default:
			if(token[i]!=null){
			return Cons(typeof(token[i]),token[i],parse(i+1));
			}else break;
			
	}
}

this.tree = new Array();

	for(i=0;token[i]!=null;i++){
		tree.push(parse(i));
	}

for(var i=0;tree[i]!=null;i++){
console.log(tree[i].car);
}

}



