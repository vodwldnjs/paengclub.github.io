const NUMBER_OF_MEMBERS = 9;

const ARRAY_PREFIX = ["휴가까지", "복귀까지", "입대까지", "전역까지", "전역까지", "전역까지", "전역까지", "전역까지", "전역까지"]
const ARRAY_NAMES = ["예지민", "예지민", "이성민", "허채민", "예지민", "팽지원", "심우재", "이승우", "이성민"];
const ARRAY_DATES = ["2023-05-25T08:00:00", "2023-05-27T20:00:00", "2023-07-10T14:00:00", "2024-04-02T08:00:00", "2024-07-29T08:00:00", "2024-09-19T08:00:00", "2024-10-02T08:00:00", "2025-01-23T08:00:00", "2025-04-09T08:00:00"];

document.body.onload = renderTimer;

/*
<div class = "container" id = "wrapper">
    <div class = "row" id = "row2">
        <div class = "col-sm-6 mt-2"><div class = "card"></div></div>
        <div class = "col-sm-6 mt-2"><div class = "card"></div></div>
    </div>
</div>
*/
function addElements() {
    for (let i = 0; i < parseInt((NUMBER_OF_MEMBERS + 1) / 2); i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "row");
        newDiv.setAttribute("id", "row" + i);
        document.getElementById("wrapper").insertBefore(newDiv, null);
    }
    for (let i = 0; i < NUMBER_OF_MEMBERS; i++) {
        addElement(i, parseInt(i / 2));
    }
}


/*
<div class="card">
    <div class="card-header">팽지원</div>
    <div class="card-body">
        <h5 class="card-title">입대까지 1일 ~~~</h5>
        <p class="card-text">2023년 3월 20일 14:00:00</p>
    </div>
</div>
*/
function addElement(number, rowNumber) {
    // col div 추가
    const colElement = document.createElement("div");
    colElement.setAttribute("class", "col-sm-6 mt-2");
    document.getElementById("row" + rowNumber).insertBefore(colElement, null);
    // card div 추가
    const cardElement = document.createElement("div");
    if (ARRAY_PREFIX[number] == '휴가까지') cardElement.setAttribute("class", "card text-white bg-info");
    if (ARRAY_PREFIX[number] == '전역까지') cardElement.setAttribute("class", "card text-white bg-dark");
    if (ARRAY_PREFIX[number] == '복귀까지' || ARRAY_PREFIX[number] == '입대까지') cardElement.setAttribute("class", "card text-white bg-danger");
    colElement.insertBefore(cardElement, null);

    // card header div 추가
    const cardHeaderElement = document.createElement("div");
    cardHeaderElement.setAttribute("class", "card-header");
    cardHeaderElement.innerHTML = ARRAY_NAMES[number];
    cardElement.insertBefore(cardHeaderElement, null);
    
    // card body div 추가
    const cardBodyElement = document.createElement("div");
    cardBodyElement.setAttribute("class", "card-body");
    cardElement.insertBefore(cardBodyElement, null);

    const dateObject = new Date(ARRAY_DATES[number]);

    // h5 카운터 div 추가
    const counterElement = document.createElement("h5");
    const newContent = document.createTextNode("test text");
    counterElement.appendChild(newContent);
    counterElement.setAttribute("class", "card-title");
    counterElement.setAttribute("id", "timeDisplayer" + number);
    cardBodyElement.insertBefore(counterElement, null);

    // p 내용 div 추가
    const dateElement = document.createElement("p");
    dateElement.setAttribute("class", "card-text");
    dateElement.innerHTML = dateObject.getFullYear().toString() + "년 " + (dateObject.getMonth() + 1).toString() + "월 " + dateObject.getDate().toString() + "일";
    cardBodyElement.insertBefore(dateElement, null);

    const x = setInterval(function() {
        
        let now = new Date().getTime();
        
        let distance = dateObject.getTime() - now;
        
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        let timerContent = days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초";
        timerContent = ARRAY_PREFIX[number] + " " + timerContent;
        document.getElementById("timeDisplayer" + number).innerHTML = timerContent;
        
        if (distance < 0)
        {
            clearInterval(x);
            document.getElementById("timeDisplayer" + number).innerHTML = ARRAY_PREFIX[number] + " 0일 0시간 0분 0초";
        }
    }, 10);
}


/*
<div class = "wrapper" id="wrapper">
    <h3>나도 추가됐으면 좋겠다 -> 연락주세요~</h3>
    <div class="alert alert-dark" role="alert">
        내용
    </div>
</div>
*/
function renderTimer() {

    // wrapper 추가
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("class", "container my-3 mt-3");
    wrapperElement.setAttribute("id", "wrapper");
    document.getElementById("screen").insertBefore(wrapperElement, null);
    
    // 안내문 추가
    const botDivElement = document.createElement("div");
    botDivElement.setAttribute("class", "alert alert-dark");
    const alertContent = document.createTextNode("휴가,전역:08시 / 입대:14시 / 복귀:21시");
    botDivElement.appendChild(alertContent);
    document.getElementById("wrapper").insertBefore(botDivElement, null);

    addElements();
}
