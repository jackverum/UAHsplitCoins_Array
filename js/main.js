let userCash = document.querySelector('.user_cash'),
    bills = document.querySelector('.bills'),
    coin = document.querySelector('.coin'),
    btnGetMoneyResult = document.querySelector('button'),
    convertationElem = document.querySelector('h5 span');

let url = 'http://api.bitcoincharts.com/v1/markets.json';
let response = fetch(url);

let commits = response 
    .then(response => response.json())
    .then(commits => {
        let uah = commits.find(cache => cache.currency == 'UAH');
        // return uah
        document.querySelector('h4 span').innerHTML = uah['latest_trade'];
        return console.log(uah['latest_trade']);

    })

// console.log(uah['latest_trade']);


document.querySelector('button').addEventListener('click', () => {
    console.log(userCash.value);
    let str = userCash.value.includes('.');
    if (str) {
        let inpArray = userCash.value.split('.');
        moneySeparate(inpArray)
    }  else {
        let inpArray = userCash.value.split(',');
        moneySeparate(inpArray)
        
    }
    function moneySeparate(inpArray) {

        // Проверка грн
        if (inpArray[0] < 10) {
            bills.innerHTML = '0' + inpArray[0];
        } else {
            bills.innerHTML = inpArray[0];
        }
        let inpArrayNum =  +inpArray[1];
        console.log('копейки:', inpArrayNum);

        // Проверка монет
        if (inpArray[1] == undefined ) {
            coin.innerHTML = '00';
        } else {
            if (inpArray[1].length == 1) {
                coin.innerHTML = +inpArray[1] + '0';
            } else if(+inpArray[1] < 10) {
                coin.innerHTML = '0' + +inpArray[1];
            } else if (inpArray[1].length >= 3) {
                let arrCoin = inpArray[1].split('')
                let newCoin = arrCoin.slice(0, 2);
                coin.innerHTML = newCoin.join('');
                console.log(arrCoin);
                alert(`Вы ввели неправильное значение копеек! Может Вы хотели ввести "${newCoin.join('')} коп.?"`);
            }
            else {
                coin.innerHTML = inpArray[1];
            }
        }
        function calcBitcoin(params) {
            // let sum = 1 / +(moneySeparate(inpArray)) * 10;
            // console.log(sum);
            // convertationElem.innerHTML = sum;
            
        }

    }
})



