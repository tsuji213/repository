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

		this.list[n].key = key;
		this.list[n].value = value;

	}

	this.get = function(key){

		var n = makehash(key);

		return this.list[n].value;

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

console.log(hash.get("hello"));
console.log(hash.get("HI"));
