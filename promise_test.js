// const axios = require("axios") // при подключении штмл такая фигня почему-то не работает.
const getPosts = (id) => `https://jsonplaceholder.typicode.com/posts/${id}` //сюда будем делать запрос

const req = () => {
    const reqAmount = Number(document.getElementById('user-data').value) //получаем из текстового поля количество элемнтов для запроса
    const array = new Array(reqAmount).fill(null).map((_, index) => index + 1) //заполняем массив с заданным пользователем кол-вом элементов
    console.log(`количество запросов = ${reqAmount} array = ${array}`)
    Promise.all(array
        .map(it => axios
            .get(getPosts(it)))) //заполняем каждый элемент массива результатами запроса
        .then(results => results
            .map(it => it.data) //оставляем в массиве только данные, которые содержатся в поле data. Это особенность работы
            //библиотеки аксиос. Все нужные данные она складывает в data
        ).then(res => document.querySelector('#res').innerText = JSON.stringify(res, null, ' ')) //выводим в хтмл результат запроса. Чтобы результат был
        //читабельным, надо применять JSON.stringify, которые преобразует данные в string
        .catch(err => document.querySelector('#res').innerText = err) //ловим ошибки если будут
        .then(res => JSON.parse(res)) //конвертим данные из стринга обратно в объект, чтобы можно было делать выборки
        .then(res => res.map(it => console.log(it.title))) //в консоли выводим только содержимое ключа title
    try { //блок отлова ошибок. В приницпе тут он нафиг не нужен
        console.log(`количество запросов = ${reqAmount} array = ${array}`)
    }
    catch (err) {
        console.log(err)
    }
}

document.querySelector('#req').addEventListener('click', req) //вещаем листенер на кнопку в штмл