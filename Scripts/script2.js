//Восстанавливаем inputs из localStorage
let divList = '<h2>Километраж вызова:</h2>';
divList += '<div id="ff0"><span>1.&nbsp&nbsp</span><input type="number" id="fff0" class="localSt" name="n2" min="1" placeholder="Введите расстояние (км.)" onblur="sum()"></div>';
document.getElementById('f8').innerHTML = divList;
for (let i = 0; i <= 25; i++) {
    if (localStorage.getItem('ff' + [i+1]) === '<div id="ff' + [i+1] + '"><span>' + [i+2] + '.&nbsp&nbsp</span><input type="number" id="fff' + [i+1] + '" class="localSt" name="n2" min="1" placeholder="Введите расстояние (км.)" onblur="sum()"></div>') {
        divList +=                                 '<div id="ff' + [i+1] + '"><span>' + [i+2] + '.&nbsp&nbsp</span><input type="number" id="fff' + [i+1] + '" class="localSt" name="n2" min="1" placeholder="Введите расстояние (км.)" onblur="sum()"></div>';
        document.getElementById('f8').innerHTML = divList;
    }
    else {
        break
    }
}

//Вставляем данные в inputs из localStorage при загр./перезагр. страницы, а также автосохраняем вводимые данные
let localSt = document.getElementsByClassName('localSt');
for (let i = 0; i < localSt.length; i++) {
    (function (localSt) {
        localSt.value = localStorage.getItem(localSt.getAttribute('id'));
        localSt.oninput = function() {
            localStorage.setItem(localSt.getAttribute('id'), localSt.value)
        };
    })(localSt[i]);
}

//Вставляем данные в outputs и th из localStorage при загр./перезагр. страницы
let localS = document.getElementsByClassName('localS');
for (let i = 0; i < localS.length; i++) {
    (function(localS) {
        localS.innerHTML = localStorage.getItem(localS.getAttribute('id'));
    })(localS[i]);
}

//Делаем не рисовать пустой журнал или пустые клетки журнала
let styleD = document.getElementsByTagName('th');
let arr = [];
for (let i = 0; i < styleD.length; i++) {
    arr[i] = styleD[i].innerHTML;
}
function isPositive(val) {
    return val === ''
}
if (arr.every(isPositive) === true) {
    document.getElementById('message').innerHTML = '<h2>Записи в журнале отсутствуют</h2>';
    document.getElementById('center').style.display = 'none'
}
else {
    for (let i = 0; i < styleD.length; i++) {
        if (styleD[i].innerHTML === '') {
            styleD[i].style.display = 'none'
        }
    }
}

//Делаем мигать поле blink2/blink3
document.querySelector('#f32').addEventListener('input', function() {
    function message(){
        document.getElementById('blink2').innerHTML = 'Проверьте или введите норму!';
    }
    function stock(){
        document.getElementById('blink2').innerHTML = 'Норма расхода топлива (л./ч.):';
    }
    for (let i = 0; i<10; i++) {
        if (i % 2 === 0) {
            setTimeout(message, i*1000);
        }
        else {
            setTimeout(stock, i*1000);
        }
    }
});


function benzDisMonth() {
    function message(){
        document.getElementById('blink').innerHTML = 'Проверьте или введите гоcномер!';
        document.getElementById('blink3').innerHTML = 'Проверьте или введите норму!';
    }
    function stock(){
        document.getElementById('blink').innerHTML = 'Регистрационный номер автомобиля:';
        document.getElementById('blink3').innerHTML = 'Норма расхода топлива (л./100км.):';
    }
    for (let i = 0; i<24; i++) {
        if (i % 2 === 0) {
            setTimeout(message, i*1000);
        }
        else {
            setTimeout(stock, i*1000);
        }
    }
    if (document.getElementById('monthSt').value === '' || document.getElementById('monthSt').value !== document.getElementById('monthFin').value) {
        let D = new Date();
        document.getElementById('monthSt').value = D.getMonth();
        localStorage.setItem('monthSt', document.getElementById('monthSt').value);
        document.getElementById('benz').value = 0;
        localStorage.setItem('benz', '0');
        document.getElementById('dis').value = 0;
        localStorage.setItem('dis', '0');
        if (document.getElementById('f6').value === '') {
            document.getElementById('f6').value = 0
        }
    }
}

let radio = document.getElementsByName('fuel');
radio[0].onclick = function() {
    localStorage.setItem('idRadio', this.value);
    document.getElementById('f3.1').setAttribute("readonly", "readonly");
    document.getElementById('f32').setAttribute("readonly", "readonly")
    benzDisMonth();
};
radio[1].onclick = function() {
    localStorage.setItem('idRadio', this.value);
    document.getElementById('f3.1').readOnly = false;
    document.getElementById('f32').readOnly = false;
    benzDisMonth()
};

if (localStorage.getItem('idRadio') === 'benz') {
    radio[0].checked = true;
    document.getElementById('f3.1').setAttribute("readonly", "readonly");
    document.getElementById('f32').setAttribute("readonly", "readonly")
}
else if (localStorage.getItem('idRadio') === 'dis') {
    radio[1].checked = true;
    document.getElementById('f3.1').readOnly = false;
    document.getElementById('f32').readOnly = false;
}

function add() {
    let n2 = document.getElementsByName('n2');
    let arr = [];
    for (var i = 0; i < n2.length; i++) {
        arr[i] = n2[i].value;
    }
    function isPositive(km) {
        return km >= 1
    }
    if (arr.every(isPositive) === true && i <= 25) {
        document.getElementById('f8').insertAdjacentHTML('beforeEnd', '<div id="ff' + i + '"><span>' + [i+1] + '.&nbsp&nbsp</span><input type="number" id="fff' + i + '" class="localSt" name="n2" min="1" placeholder="Введите расстояние (км.)" onblur="sum()"></div>');
        localStorage.setItem('ff' + i,                                                    '<div id="ff' + i + '"><span>' + [i+1] + '.&nbsp&nbsp</span><input type="number" id="fff' + i + '" class="localSt" name="n2" min="1" placeholder="Введите расстояние (км.)" onblur="sum()"></div>');
        (function () {
            n2[i].oninput = function () {
                localStorage.setItem(n2[i].getAttribute('id'), n2[i].value);
            };
        })(n2[i]);
        n2[i].focus();
    }
    else {
        if (n2[i-1].value === '' && n2[i-1] !== n2[0]) {
            let elem = document.getElementById('ff' + (i-1));
            elem.parentNode.removeChild(elem);
            localStorage.removeItem('ff' + (i-1));
            sum()
        }
    }
}

function sum() {
    let regNumber = document.getElementById('regNumber').value.length;
    if (regNumber < 4) {
        document.getElementById('regNumber').focus();
        function setFire(){
            document.getElementById('blink').style.color = 'firebrick';
        }
        function setCorn(){
            document.getElementById('blink').style.color = 'cornflowerblue';
        }
        for (let i = 0; i<7; i++) {
            setTimeout(setFire, i*1000);
            setTimeout(setCorn, (i+0.5)*1000);
        }
    }
    else {
        let cons;
        let a = 0;
        let n2 = document.getElementsByName('n2');
        for (let i = 0; i < n2.length; i++) {
            a += parseFloat(n2[i].value);
            if (document.getElementById('f3.1').value !== '' && document.getElementById('f32').value !== '') {
                let ebrSp = parseFloat((document.getElementById('f3.1').value * document.getElementById('f32').value).toFixed(2));
                cons = ((a/100 *  parseFloat(document.getElementById('f5').value) + ebrSp)).toFixed(2);
                document.getElementById('f3.3').innerHTML = ebrSp + ' л.'
            }
            else {
                cons = (a/100 *  parseFloat(document.getElementById('f5').value)).toFixed(2);
                document.getElementById('f3.3').innerHTML = 'Данные не введены'
            }
            document.getElementById('f9').innerHTML = ((parseFloat(document.getElementById('f4').value) +  parseFloat(document.getElementById('f6').value)) - (cons*1).toFixed(0)).toFixed(0) +' л.';
            localStorage.setItem('f9', document.getElementById('f9').innerHTML);
            document.getElementById('f10').innerHTML = (cons * 1).toFixed(0) +' л.';
            localStorage.setItem('f10', document.getElementById('f10').innerHTML);
            document.getElementById('f11').innerHTML = parseFloat(document.getElementById('f7').value) + a +' км.';
            localStorage.setItem('f11',  document.getElementById('f11').innerHTML);
            document.getElementById('f12').innerHTML = a +' км.';
            localStorage.setItem('f12', document.getElementById('f12').innerHTML);
            let b =(cons *1).toFixed(0) - (cons * 1).toFixed(2);
            let radio = document.getElementsByName('fuel');
            if (radio[0].checked) {
                document.getElementById('f13').innerHTML = (parseFloat(localStorage.getItem('benz')) + b).toFixed(2) +' л.';
                localStorage.setItem('f13', (parseFloat(localStorage.getItem('benz')) + b).toFixed(2) +' л.')
            }
            else if (radio[1].checked) {
                document.getElementById('f13').innerHTML = (parseFloat(localStorage.getItem('dis')) + b).toFixed(2) +' л.';
                localStorage.setItem('f13', document.getElementById('f13').innerHTML)
            }
        }
        if (localStorage.getItem('idRadio') === 'benz') {
            document.getElementById('f3.3').innerHTML = ''
        }
    }

}

function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    document.body.appendChild(coverDiv);
}

function showPrompt() {
    showCover();
    document.getElementById('prompt-form-container').style.display = 'block';
}

function hideCover() {
    document.body.removeChild(document.getElementById('cover-div'));
    document.getElementById('prompt-form-container').style.display = 'none';
}

function reset() {
    if (document.getElementById('f9').value === '' || document.getElementById('f10').value === '' || document.getElementById('f11').value === '' || document.getElementById('f12').value === '' || document.getElementById('f13').value === '') {
        function message() {
            document.getElementById('blink4').innerHTML = '';
            document.getElementById('blink5').innerHTML = 'Данные уже были удалены, или текущие данные не введены или не обработаны!';
        }
        function stock() {
            document.getElementById('blink5').innerHTML = '';
            document.getElementById('blink4').innerHTML = '<button onclick="reset()">Удалить данные</button>';
        }
        for (let i = 0; i<4; i++) {
            if (i % 2 === 0) {
                setTimeout(message, i*1000);
            }
            else {
                setTimeout(stock, i * 1500);
            }
        }
    }
    else {
        showCover();
        showPrompt();
        document.querySelector('#Yes').addEventListener('click', function() {
            let radio = document.getElementsByName('fuel');
            if (radio[0].checked) {
                var balanceBenz = parseFloat(document.getElementById('f13').value);
                var balanceDis = parseFloat(localStorage.getItem('dis'))
            } else if (radio[1].checked) {
                balanceDis = parseFloat(document.getElementById('f13').value);
                balanceBenz = parseFloat(localStorage.getItem('benz'))
            }
            localStorage.clear();
            location.reload();
            let D = new Date();
            //Переменные, формирующие журнал
            let a = 'Остаток топлива при выезде: ' + document.getElementById('f4').value + ' л.';
            let b = 'Показания одометра при выезде: ' + document.getElementById('f7').value + ' км.';
            let c = 'Заправка: ' + document.getElementById('f6').value + ' л.';
            let d = 'Показания одометра (возвращение в гараж): ' + document.getElementById('f11').innerHTML;
            let e = 'Остаток топлива (возвращение в гараж): ' + document.getElementById('f9').innerHTML;
            let f = 'Пробег за смену: ' + document.getElementById('f12').innerHTML;
            let g = 'Расход топлива: ' + document.getElementById('f10').innerHTML;
            let h = 'Госномер автомобиля: ' + document.getElementById('regNumber').value;
            //Формируем данные в журнал
            document.getElementById('endShiftData').value = 'Дата: ' + D.toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                + '</br>' + a + '</br>' + b + '</br>' + c + '</br>' + d + '</br>' + e + '</br>' + f + '</br>' + g + '</br>' + h;
            localStorage.setItem('endShiftData', document.getElementById('endShiftData').value);
            localStorage.setItem('regNumber', document.getElementById('regNumber').value);
            localStorage.setItem('f3.1', document.getElementById('f3.1').value);
            localStorage.setItem('f5', document.getElementById('f5').value);
            localStorage.setItem('f6', '0');
            localStorage.setItem('monthSt', document.getElementById('monthSt').value);
            localStorage.setItem('monthFin', D.getMonth().toLocaleString());
            localStorage.setItem('benz', balanceBenz);
            localStorage.setItem('dis', balanceDis);
            localStorage.setItem('th0', document.getElementById('endShiftData').value);
            let log = document.getElementsByTagName('th');
            for (let i = 0; i < log.length; i++) {
                localStorage.setItem('th' + [i + 1], log[i].innerHTML);
            }
        });
        document.querySelector('#No').addEventListener('click', function() {
            hideCover();
        });
    }
}