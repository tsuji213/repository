var stack = function() {
    this.value = null;
    this.next = null;
}

var push = function(){
    var node = new stack();

    node.next = stack.next;
    stack.next = node;

}

var pop = function pop(value){
       var node = stack.next;
       var rtn;
    
       stack.next = node.next
       rtn = node.value;
       
       return rtn;
}
     

var main = function(){


}         
