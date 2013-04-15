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

	this.hash = function(){
		this.set = function(key,value){
			var n = makehash(key);

			if(list[n].value == null){
				list[n].key = key;
				list[n].value = value;
			}else if(list[n].key == key){
				list[n].value = value;
			}else{
				var list_sub = new List();
				list_sub.key = key;
				list_sub.value = value;
				list_sub.next = list[n].next;
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
				return key + " is not define\n";
			}

			while(list_sub.key != null){
				if(list_sub.key = key){
					return list_sub.value;
				}
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

	if(0<token.length && token.length<5){
		if(typeof(hash.get(token[1])) != "object"){
			console.log("error");
			return;
		}
	}else if(token.length==0){
		if(isNaN(Number(line))){
			console.log(hash.get(line));
		}else{
			console.log(line);
		}
		return;
	}

	var count_car = 0;
	var count_cdr = 0;

	for(var i=0;token[i]!=null;i++){
		if(isNaN(Number(token[i]))==false){
			token[i] = Number(token[i]);
		}
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
				if(token[i]==null) return;
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

	var next = function(temp){
		return temp.cdr;
	}

	this.eval = function(temp){

		if(typeof(temp) == "number"){
			return temp;
		}else if(typeof(temp) == "string"){
			if(typeof(hash.get(temp)) == "number"){
				return hash.get(temp);
			}else{
				return temp;
			}
		}


		if(temp.car != "defun" && typeof(hash.get(temp.car)) != "object"){

			var nlist = new Array();
			for(var n = next(temp);n != null;n = next(n)){
				if(n.type == "car"){
					nlist.push(eval(n.car));
				}else if(typeof(n.car)=="number"){
					nlist.push(n.car);
				}else if(typeof(n.car)=="string"){
					nlist.push(hash.get(n.car));
				}
			}	
		}

		switch(temp.car){
			case "+":
				var res = nlist[0];
				for(var i=1;nlist[i]!=null;i++){
					res = res + nlist[i];
				}
				return res;
			case "-":
				var res = nlist[0];
				for(var i=1;nlist[i]!=null;i++){
					res = res - nlist[i];
				}
				return res;
			case "*":
				var res = nlist[0];
				for(var i=1;nlist[i]!=null;i++){
					res = res * nlist[i];
				}
				return res;
			case "/":
				var res = nilst[0];
				for(var i=1;nlist[i]!=null;i++){
					res = res / nlist[i];
				}
				return res;
			case "<":
				if(nlist[0] < nlist[1]){
					return "T";
				}else{
					return "Nil"
				}
			case "=":
				if(nlist[0] == nlist[1]){
					return "T";
				}else{
					return "Nil"
				}
			case ">":
				if(nlist[0] > nlist[1]){
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
			case "defun":
				hash.set(temp.cdr.car,temp.cdr.cdr);
				return 0;

			default:
				if(typeof(hash.get(temp.car))=="object"){
					var arg_1 = new Array();
					var arg_2 = new Array();
					for(var n = hash.get(temp.car).car;n != null;n = next(n)){
						arg_1.push(n.car);
					}
					for(var n = temp.cdr;n != null;n = next(n)){
						if(n.type == "car"){
							arg_2.push(eval(n.car));
						}else{
							arg_2.push(n.car);
						}
					}
					if(arg_1.length != arg_2.length){
						console.log("error");
						return 0;
					}
					for(var i=0;arg_1[i] != null;i++){
						hash.set(arg_1[i],arg_2[i]);
					}
					return eval(hash.get(temp.car).cdr.car);
					}

				console.log("error");
				return 0;
		}
	}
	var log = eval(tree);
	if(log == 0) return;
	console.log(log);

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


