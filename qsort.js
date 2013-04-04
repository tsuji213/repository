var qsort = function(array,left,right){

	var i = left;
	var j = right;
	var pivot =array[Math.floor((left + right)/2)];
	
	var temp;

while(1){

while(array[i] < pivot) i++;
while(array[j] > pivot) j--;

if(i >= j) break;

	temp = array[i];
	array[i] = array[j];
	array[j] = temp;

        i++;
        j--;

}

if(i-1 > left) qsort(array,left,i-1);
if(j+1 < right) qsort(array,j+1,right);


return array;

}

var s = qsort([3,7,2,4,6,1,5,8,9],0,8);
console.log(s);
/*
for(var k=0;k<8;k++){

console.log(s[k]);
*/


