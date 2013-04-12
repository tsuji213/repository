var list = new Array();

var List = function(){
this.key = null;
this.value = null;
this.next = null;
}

for(var i=0;i<16;i++){
list[i] = new List();
}


var lisp = function(line){

	var Cons = (function() {
			function Cons(type,car,cdr) {
			this.type = type;
			this.car = car;
			this.cdr = cdr;
			}
			return Cons;
			})();


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
	//console.log(token.length);

	if(0<token.length && token.length<5){
		console.log("error");
		return;
	}else if(token.length==0){
		//	console.log(line);
		console.log(this.hash.get(line));
		return;
	}

	var count_car = 0;
	var count_cdr = 0;

	for(var i=0;token[i]!=null;i++){
		if(Number(token[i])) token[i] = Number(token[i]);

		if(token[i] == "(") count_car++;
		if(token[i] == ")") count_cdr++;
	}

	if(count_car != count_cdr){
		console.log("error");
		return;
	}
	/*
	   for(var i=0;token[i]!=null;i++){
	   console.log(token[i]);
	   }
	 */
	this.parse = function(i){
		switch(token[i]){
			case "(":
				return new Cons("car",parse(i+1),parse(move(i)+1));

			case ")":
				return null;

			default:
				if(token[i]==null){
					//	console.log("error");
					return;
				}
				return new Cons(typeof(token[i]),token[i],parse(i+1));
		}
	}

	this.move = function(i){
		for(i++;token[i]!=null;i++){
			if(token[i]==")") return i;
			if(token[i]=="(") i = move(i);
		}
	}

	var tree = parse(1);
	//console.log(tree);
	//console.log(tree.cdr.car.cdr.car);

		this.hash = function(){
/*		this.list = new Array();

		var List = function(){
		this.key = null;
		this.value = null;
		this.next = null;
		}

		for(var i=0;i<16;i++){
		this.list[i] = new List();
		}
*/
		this.set = function(key,value){

		var n = makehash(key);

		if(list[n].value == null){
		list[n].key = key;
		list[n].value = value;
		}else{
		var list_sub = new List();
		list_sub.key = key;
		list_sub.value = value;
		list_sub.next = this.list[n].next;
		list[n].next = list_sub;
		}

		}

		this.get = function(key){

		var n = makehash(key);

		if(list[n].key == key){
		return list[n].value;
		}
		var list_sub = list[n].next;

		if(list_sub==null){
		return key + " is not define";
		}

		while(list_sub.key != null){
		if(list_sub.key = key) return list_sub.value;

		list_sub = list_sub.next;
		}
		}

		var makehash = function(key){

		var temp = 0;

		for(var i=0;i<key.length;i++){

		var c = key.charCodeAt(i);
		temp =+ c;

		}	

		return temp % 16;
		}
		}
	 
		this.hash = new hash();

	this.eval = function(temp){
		if(typeof(temp) == "string") return temp;

		if(temp.cdr.type == "car"){
			var n1=eval(temp.cdr.car);
		}else{
			var n1=temp.cdr.car;
		}
		if(temp.cdr.cdr.type == "car"){
			var n2=eval(temp.cdr.cdr.car);
		}else{
			var n2=temp.cdr.cdr.car;
		}

		switch(temp.car){
			case "+":
				return n1 + n2;
			case "-":
				return n1 - n2;
			case "*":
				return n1 * n2;
			case "/":
				return n1 / n2;
			case "<":
				if(n1 < n2){
					return "T";
				}else{
					return "Nil"
				}
			case "=":
				if(n1 == n2){
					return "T";
				}else{
					return "Nil"
				}
			case ">":
				if(n1 > n2){
					return "T";
				}else{
					return "Nil"
				}
			case "if":
				if(eval(temp.cdr.car) == "T"){
					return eval(temp.cdr.cdr.car);
				}else if(eval(temp.cdr.car) == "Nil"){
					return eval(temp.cdr.cdr.cdr.car);
				}
			case "setq":
				hash.set(temp.cdr.car,temp.cdr.cdr.car);
				return 0;

			default:






		}




	}

	var log = eval(tree);
	if(log == 0) return;
	console.log(log);


	/*
	   this.tree = new Array();

	   for(i=1;token[i]!=null;i++){
	   tree.push(parse(i));
	   i = move(i);
	   }
	   for(var i=0;i<tree.length;i++){
	   var temp = tree[0];
	   console.log(temp.cdr);
	   console.log(temp.cdr);
	   }
	 */
}


var readline = require("readline");

var repl = readline.createInterface(process.stdin, process.stdout);
//プロンプトの形を設定
repl.setPrompt(">>> ");

//プロンプトを出す
repl.prompt();

// mainループ
repl.on("line", function(line) {
  //変数lineにシェルに入力した文字列が入るので、これを解析すれば良い。
    lisp(line);
    repl.prompt();
});

// 終了時に呼ぶ
repl.on("close", function() {
    console.log("bye!");
});


