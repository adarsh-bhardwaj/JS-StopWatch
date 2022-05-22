let miliSec = document.getElementById('mil');
let sec = document.getElementById('sec');
let min = document.getElementById('min');
let startBtn = document.getElementById('start');
let control = document.getElementById('controller');
let pausebtn = document.getElementById('pause');
let reset = document.getElementById('reset');
let addBtn = document.getElementById('add');

let lapAdd = document.getElementById('addLaps');

let miliSecVal = 00;
let secVal = 00;
let minVal = 00;
let lapCounter =0;
let timer;
function incrementSec() {
    miliSecVal++;
    if (miliSecVal <= 9) {
        miliSec.innerHTML = '0' + miliSecVal;
    }
    if (miliSecVal > 9) {
        miliSec.innerHTML = miliSecVal;
    }
    if (miliSecVal > 99) {
        secVal++;
        sec.innerHTML = '0' + secVal;
        miliSecVal = 0;
        miliSec.innerHTML = '00'
    }
    if (secVal > 9) {
        sec.innerHTML = secVal;
    }
    if (secVal > 60) {
        minVal++;
        min.innerHTML = '0' + minVal;
        secVal = 0;
        sec.innerHTML = '00'
    }
    if (minVal > 9) {
        min.innerHTML = minVal;
    }
    if (minVal > 60) {
        clearInterval(timer);
        min.innerHTML = 60;
        sec.innerHTML = 60;
        miliSec.innerHTML = 99;
    }
    if (miliSecVal != 0 || secVal != 0 ) {
        reset.classList.remove('disable')
    }   
}

function startTimer(e) {
    timer = setInterval(incrementSec, 10);
    e.target.parentElement.children[1].style.display = 'none';
    e.target.style.display='none';
    e.target.parentElement.children[2].style.display ='inline';
    e.target.parentElement.children[3].style.display ='inline';
}
function pausefn(e){
    clearInterval(timer);
    e.target.style.display='none';
    e.target.parentElement.children[3].style.display ='none';
    e.target.parentElement.children[1].style.display = 'inline';
    e.target.parentElement.children[0].style.display ='inline';
}
function resetfn(e){
    e.target.classList.add('disable');
    miliSec.innerHTML = '00';
    sec.innerHTML = '00';
    min.innerHTML = '00';
    miliSecVal = 00;
    secVal = 00;
    minVal = 00;
    lapCounter = 0;
    
    let clearLaps = document.getElementsByClassName('singleTime');
    if(clearLaps.length > 0)
    {
        Array.from(clearLaps).forEach(element => {
            element.remove();
        });
    }
    lapAdd.style.display = 'none';


}
function addfn(e){
    lapAdd.style.display = 'block';
    lapCounter++;
    let createLap = document.createElement('div');
    createLap.classList = 'singleTime';
    minVal=("0" + minVal).slice(-2);
    secVal=("0" + secVal).slice(-2);
    miliSecVal=("0" + miliSecVal).slice(-2);
    createLap.innerHTML = `<span>${lapCounter}</span>
    <span>${minVal}.${secVal}.${miliSecVal}</span>`
    lapAdd.append(createLap);
    
}
startBtn.addEventListener('click', startTimer);
pausebtn.addEventListener('click',pausefn);
reset.addEventListener('click',resetfn);
addBtn.addEventListener('click',addfn);