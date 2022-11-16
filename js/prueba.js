let data = [
    {
        id : 1,
        precio : 10
    },
    {
        id : 2,
        precio : 20
    },
    {
        id : 3,
        precio : 30
    },
    {
        id : 4,
        precio : 40
    },
    {
        id : 5,
        precio : 50
    },
    {
        id : 6,
        precio : 60
    },
    {
        id : 7,
        precio : 70
    }
]

console.log(parseInt(Math.random()*(data.length)));

// 0<4x<4

// let random;
// do{
//     random = parseInt(Math.random()*(data.length))
//     console.log(random);
// }while(random != 2);

// id = 3
let nueva_data  = data.filter( e => e.id != 3);
let data_aleatoria = nueva_data.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,3)
console.log(data_aleatoria);