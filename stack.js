var stack = function() {
    this.value = null;
    this.next = null;


this.push = function(value){
    var temp = new stack();
    temp.value = value;
    temp.next = this.next;
    this.next = temp;
}

this.pop = function(){
       var temp = this.next;
       this.next = temp.next
       return temp.value;
}
}
     
var s = new stack();
s.push(1);
s.push(2);

console.log(s.pop());
console.log(s.pop());

