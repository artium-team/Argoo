answers = ["a", "b", "c", "d"]

questionList = []

interval = null

globalCorrect = 0, globalTimer = 0

function set4(question, a, b, c, d, timer, correct) {
    questionList.push({ question: question, a: a, b: b, c: c, d: d, timer: timer, correct: correct })
}

function set2(question, a, b, timer, correct) {
    questionList.push({ question: question, a: a, b: b, timer: timer, correct: correct })
}

function game4(question, a, b, c, d, timer, correct) {
    globalCorrect = correct, globalTimer = timer
    document.querySelector(".body").insertAdjacentHTML("beforeend", `<div id="main" class="flex flex-col h-screen"><div class="flex-1 bg-white"><div class="flex h-full justify-center items-center"><p class="text-4xl font-bold">${question}</p></div></div><div class="flex-1 bg-white"><div class="h-full grid grid-cols-2 grid-rows-2 gap-2 border-8 border-white"><div id="a" class="col-span-1 row-span-1 bg-red-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${a}</p></div></div><div id="b" class="col-span-1 row-span-1 bg-blue-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${b}</p></div></div><div id="c" class="col-span-1 row-span-1 bg-green-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${c}</p></div></div><div id="d" class="col-span-1 row-span-1 bg-yellow-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${d}</p></div></div></div></div></div>`)

    Next()

    Timer(timer)
}

function game2(question, a, b, timer, correct) {
    globalCorrect = correct, globalTimer = timer
    document.querySelector(".body").insertAdjacentHTML("beforeend", `<div id="main" class="flex flex-col h-screen"><div class="flex-1 bg-white"><div class="flex h-full justify-center items-center"><p class="text-4xl font-bold">${question}</p></div></div><div class="flex-1 bg-white"><div class="h-full grid grid-cols-2 grid-rows-1 gap-2 border-8 border-white"><div id="a" class="col-span-1 row-span-1 bg-red-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${a}</p></div></div><div id="b" class="col-span-1 row-span-1 bg-blue-500"><div class="flex h-full justify-center items-center"><p class="text-2xl text-white font-bold">${b}</p></div></div>`)

    Next()

    Timer(timer)
}

questionNumber = 0

function change() {
    document.querySelector("#main").remove()
    document.querySelector("#timer").remove()
    document.querySelector("#next").remove()

    questionNumber++

    clearInterval(interval)

    checkTypeAndRun()
}

function checkTypeAndRun() {
    if (questionList[questionNumber].c) {
        game4(questionList[questionNumber].question, questionList[questionNumber].a, questionList[questionNumber].b, questionList[questionNumber].c, questionList[questionNumber].d, questionList[questionNumber].timer, questionList[questionNumber].correct)
    } else {
        game2(questionList[questionNumber].question, questionList[questionNumber].a, questionList[questionNumber].b, questionList[questionNumber].timer, questionList[questionNumber].correct)
    }
}

function Timer(timer) {

    globalTimer = timer > 60 ? 60 : timer

    if (globalTimer > 0) {
        document.querySelector("#main").insertAdjacentHTML("beforebegin", `<div id="timer" class="absolute w-40 h-20 bg-slate-100 rounded-3xl flex justify-center items-center m-2 font-semibold text-2xl"><p id="timer-value">Test</p></div>`)
    }

    document.querySelector("#timer-value").innerHTML = globalTimer

    interval = setInterval(function () {
        globalTimer--
        if (globalTimer > 0) {
            document.querySelector("#timer-value").innerHTML = globalTimer

        } else {
            document.querySelector("#timer-value").innerHTML = "Hết giờ!"
            for (i = 0; i < 4; i++) {
                if (i != globalCorrect - 1) {
                    document.querySelector(`#${answers[i]}`).style.opacity -= 0.1
                }
            }
        }
    }, 1000);
}

function Next() {
    if (questionNumber != questionList.length - 1) {
        document.querySelector("#main").insertAdjacentHTML("beforebegin", `<div id="next" class="absolute right-0 w-40 h-20 bg-slate-100 rounded-3xl flex justify-center items-center m-2 font-semibold text-2xl"><p>Tiếp theo</p></div>`)
        document.querySelector("#next").onclick = change;
    }
}

// For presentation clicker!
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name = ("Enter" || "ArrowDown" || "ArrowRight")) {
        clearInterval(interval)
        if (globalTimer > 0) {
            globalTimer = 0
            document.querySelector("#timer-value").innerHTML = "Đáp án!"
            for (i = 0; i < 4; i++) {
                if (i != globalCorrect - 1) {
                    document.querySelector(`#${answers[i]}`).style.opacity -= 0.1
                }
            }
        } else change()
    }
}, false);