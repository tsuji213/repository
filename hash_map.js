var hash = function(){
	this.list = new Array();

	var List = function(){
		this.key = null;
		this.value = null;
                this.next = null;
	}

        for(var i=0;i<8;i++){
		this.list[i] = new List();
	}

	this.set = function(key,value){

		var n = makehash(key);

		if(this.list[n].value == null){
		this.list[n].key = key;
		this.list[n].value = value;
		}else{
		var list_sub = new List();
		list_sub.key = key;
		list_sub.value = value;
		list_sub.next = this.list[n].next;
		this.list[n].next = list_sub;
		}

	}

	this.get = function(key){

		var n = makehash(key);

		if(this.list[n].key == key){
		return this.list[n].value;
		}
		var list_sub = this.list[n].next;

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

		return temp % 8;
}

}

var hash = new hash(); 

hash.set("ABC",2);
hash.set("hello",4);
hash.set("HI",8);
hash.set("a",3);
hash.set("b",5);
hash.set("r",7);
hash.set("s",9);
hash.set("t",6);

console.log(hash.get("hello"));
console.log(hash.get("HI"));
console.log(hash.get("aafd"));
console.log(hash.get("a"));
console.log(hash.get("b"));
console.log(hash.get("r"));
console.log(hash.get("s"));
console.log(hash.get("t"));


