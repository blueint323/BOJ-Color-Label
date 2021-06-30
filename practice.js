let END = "</span>";
let ZERO = "<span style=\'color:#000000\'>";
let BRONZE = "<span style=\'color:#8B4513\'>";
let SILVER = "<span style=\'color:#5A78AF\'>";
let GOLD = "<span style=\'color:#FFAF0A\'>";
let PLATINIUM = "<span style=\'color:#22D6B2\'>";
let DIAMOND = "<span style=\'color:#00AFFF\'>";
let RUBY = "<span style=\'color:#CD3861\'>";

let lvcolor = {
    0: ZERO,
    1: BRONZE,
    2: BRONZE,
    3: BRONZE,
    4: BRONZE,
    5: BRONZE,
    6: SILVER,
    7: SILVER,
    8: SILVER,
    9: SILVER,
    10: SILVER,
    11: GOLD,
    12: GOLD,
    13: GOLD,
    14: GOLD,
    15: GOLD,
    16: PLATINIUM,
    17: PLATINIUM,
    18: PLATINIUM,
    19: PLATINIUM,
    20: PLATINIUM,
    21: DIAMOND,
    22: DIAMOND,
    23: DIAMOND,
    24: DIAMOND,
    25: DIAMOND,
    26: RUBY,
    27: RUBY,
    28: RUBY,
    29: RUBY,
    30: RUBY
}

let username = window.location.pathname; //사이트에서 현재 위치 알아내기
//Ex) /user/swoon 형태로 반환

let un = username.substring(6, username.length);

let dict = {};
for (let page = 1; page < 5; page++) {
    let url = `https://solved.ac/api/v3/search/problem?query=solved_by:${un}&page=${page}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 100; i++) {
                try {
                    dict[data.items[i].problemId] = data.items[i].level;
                }
                catch (error) {
                    break;
                }
            }
            repl();
        });
}

function repl() {
    let arr = document.getElementsByClassName("panel-body");
    for (let i of arr) {
        let now = i.innerHTML;
        let str = i.innerText;
        let problemshtml = now.split("\n");
        let problems = str.split(" ");
        let ret = "\n";
        for (let j = 1; j < problemshtml.length; j++) {
            let instr = problems[j-1];
            if (parseInt(instr) in dict) problemshtml[j] = problemshtml[j].replace(instr+"<", `${lvcolor[dict[parseInt(instr)]]}${instr}${END}<`)
            ret += problemshtml[j]+"\n";
        }
        i.innerHTML = ret;
    }
}