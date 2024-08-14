// global switches
var playing = false;
var transliterating = true;
var chap = false;
var multiple_choice = true;
var last_invert = false;

// global const
const repfailstr = "Repeat failed questions";

// global variables
var curfont = defaultfont;
var curmode;
var curdata;
var curfields;
var faildata = [];

// counters
var round = 1;
var score = 0;
var buttonNo = 1;


// document setup

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    introduce();

    inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            let text = input
                .replace(/^\s+/g, "")
                .replace(/\s+$/g, "")
                .replace(/\s+/g, " ");

            if (text == "") {
                addReply(dia.help);
                repeat_if_playing();
            } else {
                process(text);
                inputField.scrollIntoView();
            }
        }
    });
});

// adders

function addInput(input) {
    let text_roman = translit_bracket(input);
    let text_script = ascii_to_orig(input);
    console.log(text_script);
    
    const mainDiv = document.getElementById("chat");

    const userDiv = document.createElement("li");
    const attUser = document.createAttribute("class");
    attUser.value = "me";
    userDiv.setAttributeNode(attUser);

    const scriptDiv = document.createElement("div");
    const attScript = document.createAttribute("class");
    attScript.value = script + " " + curfont;
    scriptDiv.setAttributeNode(attScript);
    scriptDiv.innerHTML = `${text_script}`;

    const romanDiv = document.createElement("div");
    const attRoman = document.createAttribute("class");
    attRoman.value = "ltn";
    romanDiv.setAttributeNode(attRoman);
    romanDiv.innerHTML = `${text_roman}`;

    userDiv.appendChild(scriptDiv);
    userDiv.appendChild(romanDiv);
    mainDiv.appendChild(userDiv);
}

function addReplyG(reply) {
    addReply(reply, "green");
}

function addReplyR(reply) {
    addReply(reply, "red");
}

function addReplyL(reply) {
    addReply(reply, script + "-large");
}

function addReply(reply, cl = "") {
    const inputField = document.getElementById("input");

    let sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const mainDiv = document.getElementById("chat");
    const botDiv = document.createElement("li");
    const botDivAtt = document.createAttribute("class");

    botDivAtt.value = "bot " + " " + script + " " + curfont + " " + cl;
    botDiv.setAttributeNode(botDivAtt);
    botDiv.innerHTML = `${reply}`;

    sleep(500).then(() => {
        mainDiv.appendChild(botDiv);
        inputField.scrollIntoView();
    });
}

function translit_bracket(input) {
    let out = input;

    if (transliterating) {
        if (input !== ascii_to_romanized(input)) {
            out = ascii_to_romanized(input) + " [" + input + "]";
        }

        return out;
    } else {
        return out;
    }
}

function addButtons(buttonArray, cmd, data = false, include_mc_toggle = false) {
    const inputField = document.getElementById("input");
    const id = buttonNo.toString();

    let sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const mainDiv = document.getElementById("chat");
    const botDiv = document.createElement("li");
    const botDivId = document.createAttribute("id");
    const botDivAtt = document.createAttribute("class");
    botDivAtt.value = "bot ltn";
    botDivId.value = "botdiv" + id;
    botDiv.setAttributeNode(botDivAtt);
    botDiv.setAttributeNode(botDivId);

    sleep(500).then(() => {
        mainDiv.appendChild(botDiv);

	buttonArray.forEach((button) => {
            const cbutton = document.createElement("button");
            const buttonAtt = document.createAttribute("class");
            buttonAtt.value = "button";
            const id = buttonNo.toString();
            buttonNo += 1;

            cbutton.innerText = button;
            cbutton.id = "button" + id;
            cbutton.setAttributeNode(buttonAtt);

            cbutton.addEventListener("click", () => {
                if (!data) {
                    cmd(button);
                } else {
                    cmd(button, data);
                }
            });

	    document.getElementById(botDivId.value).appendChild(cbutton);
        });
	
	if (include_mc_toggle) {
	    const switchDiv = document.createElement("label");
	    const switchDivAtt = document.createAttribute("class");
	    switchDivAtt.value = "switchdiv";
	    switchDiv.setAttributeNode(switchDivAtt);

	    const leftDiv = document.createElement("div");
	    const leftDivAtt = document.createAttribute("class");
	    leftDivAtt.value = "ltn left-div";
	    leftDiv.setAttributeNode(leftDivAtt);
	    leftDiv.innerHTML = `<b>free typing</b>`;

	    const rightDiv = document.createElement("div");
	    const rightDivAtt = document.createAttribute("class");
	    rightDivAtt.value = "ltn right-div";
	    rightDiv.setAttributeNode(rightDivAtt);
	    rightDiv.innerHTML = `<b>multiple choice</b>`;
	    
	    const switchLabel = document.createElement("label");
	    const switchLabelAtt = document.createAttribute("class");
	    switchLabelAtt.value = "switch";
	    switchLabel.setAttributeNode(switchLabelAtt);
	    
	    const inputDiv = document.createElement("input");
	    const inputDivAtt = document.createAttribute("type");
	    inputDivAtt.value = "checkbox";
	    inputDiv.setAttributeNode(inputDivAtt);
	    // checked initially
	    inputDiv.setAttribute("checked", "checked");
	    
	    const sliderDiv = document.createElement("span");
	    const sliderDivAtt = document.createAttribute("class");
	    sliderDivAtt.value = "slider round";
	    sliderDiv.setAttributeNode(sliderDivAtt);

	    const onCheckboxChange = () => {
                multiple_choice = inputDiv.checked;
            };

            inputDiv.addEventListener("change", onCheckboxChange);
	    
	    // Add inputDiv and sliderDiv to switchDiv
	    switchLabel.appendChild(inputDiv);
	    switchLabel.appendChild(sliderDiv);

	    switchDiv.appendChild(leftDiv);
	    switchDiv.appendChild(switchLabel);
	    switchDiv.appendChild(rightDiv);

	    document.getElementById(botDivId.value).appendChild(switchDiv);
	};
	
        inputField.scrollIntoView();
    });
}

function process(input) {
    addInput(input);

    if (commands.includes(input)) {
        follow_command(commands.indexOf(input));
    } else if (playing) {
        set_question_answer(input);
    } else {
        mode_choice();
    }
}

function follow_command(index) {
    switch (index) {
    case 0: // help
        addReply(dia.help);
        repeat_if_playing();
        break;
    case 1: // script table
        addReply(table);
        repeat_if_playing();
        break;
    case 2: // change font
        addButtons(fonts, changefont);
        // repeat_if_playing();
        break;
    case 3: // change mode
        playing = false;
        mode_choice();
        break;
    }
}

function resetroundscore() {
    round = 1;
    score = 0;
}

function resetFaildata() {
    faildata = [];
    console.dir(faildata);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function introduce() {
    let sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    addReply(dia.intro);
    sleep(500).then(() => {
        addReply(dia.help);
        sleep(500).then(() => {
            mode_choice();
        });
    });
}

function mode_choice() {
    addReply(dia.choice);

    if (faildata.length == 0 || !faildata) {
        addButtons(modes, changemode, false, true);
        return;
    }

    addButtons([repfailstr].concat(modes), changemode, false, true);
}

function exercise(data, index, random_invert = true) {
    playing = true;

    if (index + 1 <= data.length) {
        switch (curmode) {
        case "oneway": // i.e. one-way
            exercise_oneway(data, index);
            break;
        case "twoway": // i.e. two-way
            exercise_twoway(data, index, random_invert);
            break;
        case "root": // i.e. step-by-step
            exercise_root(curdata, index);
            break;
        case "c-oneway": // i.e. choice one-way
            exercise_oneway(data, index);
            
            let arr = shuffleArray(create_choice_array(4, data[index], 2));

            addButtons(arr, process);
            break;
        }
    } else {
        playing = false;
        addReplyG(dia.empty);
        mode_choice();
    }
}

function exercise_oneway(array, index) {
    transliterating = true;
    addReplyL(array[index][0]);
}

function exercise_twoway(array, index, random_invert = true) {
    let invert = last_invert;

    if (random_invert) {
        invert = Math.random() < 0.5; //randomly invert
        last_invert = invert;
    }

    if (invert) {
        transliterating = true;
        addReply('<span class="ltn">' + array[index][2] + "</span>");
    } else {
        transliterating = false;
        addReplyL(array[index][0]);
    }
}

function exercise_root(array, index) {
    transliterating = true;
    addReplyL(array[index][0]);
}

function set_question_answer(input) {
    let cur = curdata[round - 1];
    let question = "";
    let answer = "";
    let multi = false;

    // set variables according to mode
    switch (curmode) {
    case "oneway":
        question = cur[0];
        answer = cur[1];

        compare_with_answer(input, question, answer, checkmulti(answer));
        break;
        
    case "twoway":
        if (transliterating) {
            question = cur[2] + " " + cur[0];
            answer = cur[1];
        } else {
            question = cur[0];
            answer = cur[2];
        }

        compare_with_answer(input, question, answer, checkmulti(answer));

        break;

    case "root":
        question = cur[0] + " – " + cur[1];
        answer = cur[2];

        // check for multiple correct answers
        multi = checkmulti(answer);

        if ((multi && input.match(answer)) || (!multi && input === answer)) {
            answer = input + " " + cur[3];

            let arr = shuffleArray(create_choice_array(4, cur, 3));

            addButtons(arr, add_button_value, [input, question, answer]);
        } else {
            answer = translit_bracket(cur[2]) + " " + cur[3];
            transliterating = false;
            compare_with_answer(input, question, answer);
            transliterating = true;
        }
        break;

    case "c-oneway":
        question = cur[0] + " " + cur[1];
        answer = cur[2];

        compare_with_answer(input, question, answer, false, true);

        break;
    }
}

function checkmulti(answer) {
    if (transliterating && answer.match("\\|") !== null) {
        return true;
    } else if (!transliterating && answer.match(/[,;]/g) !== null) {
        return true;
    } else {
        return false;
    }
}

function strip_additions(str) {
    let nstr = str.replace(/ *\[.*\] */g, "");
    // console.log(nstr);
    return nstr;
}

function create_choice_array(number, curset, idx) {
    let arr = [curset[idx]];
    let i = curdata.length - 1;

    while (arr.length < number) {
        let n = Math.floor(Math.random() * (i + 1));
        if (!arr.includes(curdata[n][idx])) {
            arr.push(curdata[n][idx]);
        }
    }

    return arr;
}

function compare_with_answer(input,
                             question,
                             answer,
                             multi = false,
                             buttoninput = false){
    if (!buttoninput && input.match(/[^-a-zA-ZÖÜÄöüäß';._\^\. ]/g) !== null) {
        addReply(dia.tryagain);
    } else if ((multi && answer.match(input)) || (!multi && input === strip_additions(answer))) {
        // right answer
        score += 1;
        addReplyG(dia.correct + quota());
        round += 1;
    } else {
        // wrong answer
        let reply =
            dia.incorrect +
            " <b>" +
            question +
            '<div class="ltn"> ' +
            translit_bracket(answer) +
            "</div></b> " +
            dia.correction +
            quota();
        if (curmode !== "c-oneway" && curmode != "root") {
            faildata.push(curdata[round -1]);
            console.dir(faildata); }
        addReplyR(reply);
        round += 1;
    }

    exercise(curdata, round - 1);
}

function repeat_if_playing() {
    if (!playing) {
        mode_choice();
        return;
    }

    exercise(curdata, round - 1, false);
}

function changefont(font) {
    curfont = font;
    repeat_if_playing();
}

function changemode(mode) {
    resetroundscore();

    if (mode == repfailstr) {
        curdata = shuffleArray(faildata);
        resetFaildata();
        exercise(curdata, round - 1);
        return;
    }

    curmode = mode_map[mode][0];
    chap = mode_map[mode][1];
    curfields = mode_map[mode][3];

    var curintro = mode_map[mode][4];
    addReplyG(dia[curintro]);

    if (chap) {
        var chapdata = mode_map[mode][2];
        var chapters = ["all"].concat(Object.keys(chapdata));
        addButtons(chapters, choosechapter, chapdata);
    } else {
        curdata = shuffleArray(mode_map[mode][2]);
        resetFaildata();
        exercise(curdata, round - 1);
    }
}

function choosechapter(chapter, data) {
    if (chapter == "all") {
        let all = [];
        let chapters_a = Object.keys(data);

        for (var i = chapters_a.length - 1; i >= 0; i--) {
            chap_a = data[chapters_a[i]];

            for (var j = chap_a.length - 1; j >= 0; j--) {
                all.push(chap_a[j]);
            }
        }

        curdata = shuffleArray(all);
    } else {
        curdata = shuffleArray(data[chapter]);
    }

    resetFaildata();
    exercise(curdata, round - 1);
}

function add_button_value(str, array) {
    let display = translit_bracket(array[0]) + " " + str;
    let input = array[0] + " " + str;
    let question = array[1];
    let answer = array[2];

    addInput(display);
    compare_with_answer(input, question, answer);
}

function quota() {
    let out = "";
    out = number_to_origstr(score) + "/" + number_to_origstr(round);
    return out;
}

