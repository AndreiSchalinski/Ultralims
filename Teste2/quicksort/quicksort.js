function quicksort(array) {
    
    if(array.length === 0){
        return [];
    }

    if(array.length === 1){
        return array;
    }

    var pivo = array[0];

    var menores = array.filter(n => n < pivo);
    var igual = array.filter(n => n === pivo);
    var maiores = array.filter(n => n > pivo);

    return quicksort(menores).concat(igual).concat(quicksort(maiores))

}

var lista = [12,5,34,2,6,78,1,9,45,3,8];

console.log(quicksort(lista))