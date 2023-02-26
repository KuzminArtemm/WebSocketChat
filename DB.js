const db ={
    chat: [
/* {
    personId: 1,
    text: 'message',
    date: Date.now(),
}, */
    ],
    people: [
/* {
    id: 1,
    name: 'Name Name',
    avatar: 'https://avatars.mds.yandex.net/i?id=27153a3ba0ec301422bdb2550820095632af5007-8242815-images-thumbs&n=13&exp=1'
} */
    ]
    
}


module.exports = {
    db
}

/*message = {
    id,
    data,
    text,
    name
    
} */


/* let deepArr = [1, 2, ['a', 'b', 'c']];
let deepArrClone = deepArr  //JSON.parse(JSON.stringify(deepArr));

// Добавление элемента во вложенный массив
deepArr[2].push('d');

// Изменения затрагивают и оригинальный массив
let arr = ['hello', 'world'];
let obj = {
    greeting: 'hi',
    name: 'universe'
};

let arrClone = Array.from(arr);
arrClone.push('1')
let objClone = Object.assign({}, obj); 
console.log(arr);  */

/* function repeatNum(arr) {
   return arr.find((el, index, ar) => ar.indexOf(el) !== ar.lastIndexOf(el))
}
console.log(repeatNum([ 5, 3, 4, 2, 3, 7, 5, 6 ])) */
/* const arr = [ 5, 3, 3, 4, 2, 3, 7, 5, 6 ];
 
function findDuplicates(arr) {
    const filtered = arr.filter((item, index) => arr.indexOf(item) !== index);
    return [...new Set(filtered)]
}
 
//const arr = [ 5, 3, 4, 2, 3, 7, 5, 6 ];
const duplicates = findDuplicates(arr);
console.log(duplicates); */
/* const arr = [ 5, 3, 4, 2, 3, 7, 5, 6 ];
let distinct = new Set(arr)
distinct.delete(3)
console.log(distinct) */
 