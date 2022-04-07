document.getElementById('menu').addEventListener("click", () => {
    alert(`Для реализации всего функионала сайта потребовалось знание HTML, CSS и Java Script.`);
});

//1
function isEmpty(str) {
    if (str.trim() == '') return true;  
    return false;
}

function setName() {
    var userName = document.getElementById('name').value;
    if (isEmpty(userName)) return false;
    alert(`Здравствуйте, ${userName}!`);
    localStorage.setItem('usernameSave', `Здравствуйте, ${userName}!`);
    document.getElementById('usernameOutput').innerHTML = `Здравствуйте, ${userName}!`;
}

document.getElementById('setNameButton').onclick = setName;
document.getElementById('usernameOutput').innerHTML = localStorage.getItem('usernameSave');

//2
function onlyDigits() {
    this.value = this.value.replace(/[^\d\.]/g, "");
    if (this.value.match(/\./g).length > 1) {
        this.value = this.value.substr(0, this.value.lastIndexOf("."));
    }
}

function notZero() {
    if (this.value == '0') this.value = '';
}

function triangleSquareCalc() {
    var base = document.getElementById('base').value;
    var height = document.getElementById('height').value;
    if (base == '' || height == '') {
        document.getElementById('squareOutput').value = 'Пожалуйста, заполните строки';
        return false;
    }   
    var square = 1/2 * base * height;
    document.getElementById('squareOutput').value = square;
}

document.getElementById('base').onkeyup = onlyDigits;
document.getElementById('height').onkeyup = onlyDigits;
document.getElementById('base').onchange = notZero;
document.getElementById('height').onchange = notZero;
document.getElementById('squareCalcButton').onclick = triangleSquareCalc;

//3
function stringComparator() {
    var firstString = document.getElementById('firstString').value;
    var secondString = document.getElementById('secondString').value;
    if (firstString == '' && secondString == '') {
        document.getElementById('getCompare').value = 'Пожалуйста, заполните строки';
        return false;
    }
    if (firstString == secondString) {
        document.getElementById('getCompare').value = 'Одинаковые';
    }
    else {
        document.getElementById('getCompare').value = 'Разные';
    }
}
document.getElementById('compare').onclick = stringComparator;

//4
function arrrayMinMax() {
    var numbers = [];
    numbers.push(document.getElementById('firstElement').value);
    numbers.push(document.getElementById('secondElement').value);
    numbers.push(document.getElementById('thirdElement').value);
    numbers.push(document.getElementById('fourthElement').value);
    numbers.push(document.getElementById('fifthElement').value);
    for (var i = 0; i < numbers.length; i++) {
        if (isEmpty(numbers[i])) {
            alert(`Пожалуйста, введите все 5 элементов массива`);
            return false;
        }
    }
    alert(`Минимальный элемент массива: ${Math.min.apply(null, numbers)}`);
    alert(`Максимальный элемент массива: ${Math.max.apply(null, numbers)}`);
}
document.getElementById('arrayButton').onclick = arrrayMinMax;

//5
/*
var h2 = document.getElementsByTagName('time')[0];
var start = document.getElementById('startCountingButton');
var stop = document.getElementById('stopCountingButton');
var reset = document.getElementById('resetCountingButton');
var difference = document.getElementById('startFinishDifferenceButton');
var prevSec = 0;
var prevMin = 0;
var prevHrs = 0;
var sec = 2;
var min = 1;
var hrs = 0;
var t;

function tick(){
    sec--;
    if (sec == 0) {
        min--;
        sec = 60;
        if (min == 0) {
            hrs--;
            min = 60;
        }
    }
}

function add() {
    tick();
    h2.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

start.onclick = function(){
    prevSec = sec;
    prevMin = min;
    prevHrs = hrs;
    timer();
}

stop.onclick = function() {
    clearTimeout(t);
}

reset.onclick = function() {
    h2.textContent = "00:00:00";
    sec = 0; min = 0; hrs = 0;
}

difference.onclick = function() {
    alert (`Разница между стартом и финишем: ${hrs - prevHrs} часов, ${min - prevMin} минут, ${sec - prevSec} секунд`);
}
*/
//6
var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } 
    else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } 
    else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } 
    else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } 
    else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

document.getElementById('userScreen').addEventListener("click", () => {
    openFullscreen();
    document.getElementsByClassName('md-modal')[0].classList.add("md-show");;
});

document.getElementById('md-close').addEventListener("click", () => {
    closeFullscreen();
    document.getElementsByClassName('md-modal')[0].classList.remove("md-show");;
});
    
/* (если число меньше десяти, перед числом добавляем ноль) */
function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

/* функция получения текущей даты и времени */
function date()
{
    var current_date = new Date();
    var day = zero_first_format(current_date.getDate());
    var month = zero_first_format(current_date.getMonth()+1);
    var year = current_date.getFullYear();

    return day+"."+month+"."+year;
}

/* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
document.getElementById('current_date_time_block').innerHTML = date();
document.getElementById('usernameScreenOutput').innerHTML = localStorage.getItem('usernameSave');


var start = document.getElementById('startCountingButton');
var stop = document.getElementById('stopCountingButton');
var difference = document.getElementById('startFinishDifferenceButton');
var timerId = null;
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var $days = document.querySelector('.timer__days');
var $hours = document.querySelector('.timer__hours');
var $minutes = document.querySelector('.timer__minutes');
var $seconds = document.querySelector('.timer__seconds');
var prevSec = 0;
var prevMin = 0;
var prevHrs = 0;
var prevDays = 0;
const deadline = new Date(2022, 06, 01);

document.addEventListener('DOMContentLoaded', function() {
    // конечная дата, например 1 июля 2021
    // id таймера

    // склонение числительных
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    // вызываем функцию countdownTimer каждую секунду
    countdownTimer();
    prevSec = seconds;
    prevMin = minutes;
    prevHrs = hours;
    prevDays = days;
    timerId = setInterval(countdownTimer, 1000);

    start.onclick = function(){
        prevSec = seconds;
        prevMin = minutes;
        prevHrs = hours;
        prevDays = days;
        timerId = setInterval(countdownTimer, 1000);
    }
    
    stop.onclick = function() {    
        clearInterval(timerId);  
    }

    difference.onclick = function() {
        alert (`Разница между стартом и финишем: ${prevDays - days} дней, ${prevHrs - hours} часов, ${prevMin - minutes} минут, ${prevSec - seconds} секунд`);
    }
});