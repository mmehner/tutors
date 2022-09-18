// global switches
var playing = false;
var transliterating = true;
var chap = false;
var last_invert= false;

// global variables
var curfont = defaultfont
var curmode
var curdata

// counters
var round = 1;
var score = 0;
var buttonNo = 1;

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    introduce();

    inputField.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
	    let input = inputField.value;
	    inputField.value = "";
	    let text = input.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
	    
	    if ( text == "" ) {
		addReply(dia.help);
		repeat_if_playing();
	    } else { 
		process(text);
		inputField.scrollIntoView();
	    }
	}
    });
    
});

function resetroundscore() {
    round = 1;
    score = 0;
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
    let sleep = ms => {  
	return new Promise(resolve => setTimeout(resolve, ms));  
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
    let sleep = ms => {  
	return new Promise(resolve => setTimeout(resolve, ms));  
    };
    
    addReply(dia.choice);
    sleep(500).then(() => {
	addButtons(modes, changemode);
    });
}

function exercise(data, index, random_invert=true) {
    playing = true;

    if ( index+1 <= data.length ) {
	
	switch(curmode){
	case "oneway": // i.e. one-way
	    exercise_oneway(data,index);
	    break;
	case "twoway": // i.e. two-way
	    exercise_twoway(data,index,random_invert);
	    break;
	case "root": // i.e. step-by-step
	    exercise_root(curdata,index); 
	    break;
	case "c-oneway": // i.e. choice one-way
	    exercise_oneway(data,index);

	    let arr = shuffleArray(create_choice_array(4,data[index],2));
	  
	    addButtons(arr,process);
	    break;
	};
	
    } else {
	playing = false
	addReplyG(dia.empty);
	mode_choice();
    }
}

function exercise_oneway(array, index) {
    transliterating = true;
    addReplyL(array[index][0]);
}

function exercise_twoway(array, index, random_invert=true) {

    let invert = last_invert
    
    if (random_invert) {
	invert = Math.random() < 0.5; //randomly invert
	last_invert = invert
    }	

    if (invert) {
	transliterating = true;
	addReply('<span class="ltn">' + array[index][2] + '</span>');
    } else {
	transliterating = false;
	addReplyL(array[index][0]);
    }
}

function exercise_root(array, index) {
    transliterating = true;
    addReplyL(array[index][0]);
}


function process(input) {
    display_input(input);
        
    if ( commands.includes(input) ) {
	follow_command(commands.indexOf(input));
    } else if (playing) {
	set_question_answer(input);
    } else {
	mode_choice();
    }
}

function set_question_answer(input) {

    let cur =  curdata[round-1];
    let question = ""
    let answer = ""
    let multi = false

    // set variables according to mode
    switch(curmode){
	
    case "oneway":
	question = cur[0];
	answer = cur[1];

	compare_with_answer(input,question,answer,checkmulti(answer));
	break;
	
    case "twoway":
	if (transliterating) {
	    question = cur[2] + " " + cur[0];
	    answer = cur[1];
	} else {
	    question = cur[0];
	    answer = cur[2];
	};
	
	compare_with_answer(input,question,answer,checkmulti(answer));
	
	break;
	
    case "root":
	question = cur[0] + " – " + cur[1];
	answer = cur[2]

	// check for multiple correct answers
	multi = checkmulti(answer);

	if ( (multi && input.match(answer)) || (!multi && input === answer)) {
	    answer = input + " " + cur[3];

	    let arr = shuffleArray(create_choice_array(4,cur,3));
	  
	    addButtons(arr,add_button_value,[input,question,answer]);
	}
	else {
	    answer = translit_bracket(cur[2]) + " " + cur[3];
	    transliterating=false
	    compare_with_answer(input, question, answer)
	    transliterating=true
	}
	break;

    case "c-oneway":
	question = cur[0] + " " + cur[1];
	answer = cur[2]

	compare_with_answer(input,question,answer,false,true);
	
	break;
    };

}

function checkmulti(answer) {
    if ( transliterating && ( answer.match("\\|") !== null ) ) {
	return true;
    } else if ( !transliterating && ( answer.match(/[,;]/g) !== null ) ) {
	return true;
    } else {
	return false;
    }
}

function create_choice_array(number,curset,idx) {
    let arr = [curset[idx]]
    let i = curdata.length -1

    while (arr.length < number) {
	let n = Math.floor(Math.random() * (i + 1));
	if (! arr.includes(curdata[n][idx])) {
	    arr.push(curdata[n][idx]);
	}
    }

    return arr;
}

function compare_with_answer(input, question, answer, multi = false, buttoninput = false) {

    if  ( !buttoninput && input.match(/[^-a-zA-ZÖÜÄöüäß' ]/g) !== null ) {
	addReply(dia.tryagain);
    } else if ( (multi && answer.match(input)) || (!multi && input === answer)) { // right answer
	score += 1;
	addReplyG(dia.correct + quota());
	round += 1;
    } else { // wrong answer
	let reply = dia.incorrect + " <b>" + question + '<span class="ltn"> ' + translit_bracket(answer)  + "</span></b> " + dia.correction + quota();
	addReplyR(reply);
	round += 1;
    }

    exercise(curdata, round-1);
}

function display_input(input) {
    addInput(translit_bracket(input));
}

function follow_command(index) {
    switch(index) {
    case 0: // help
	addReply(dia.help);
	repeat_if_playing();
	break;
    case 1: // script table
	addReply(table);
	repeat_if_playing();
	break;
    case 2: // change font
	addButtons(fonts,changefont);
	repeat_if_playing();
	break;
    case 3: // change mode
	playing = false;
	addButtons(modes,changemode)
	break;
    }
}

function translit_bracket(input) {
    let out = input;
    
    if ( transliterating ) {
	
	if ( input !== ltn2transcript(input) ) {
	    out = ltn2transcript(input) + " [" + input + "]";
	}
	
	return out;
    } else {
	return out;
    }
    
}

function addInput(input) {
    const mainDiv = document.getElementById("chat");
    
    const userDiv = document.createElement("li");
    const attUser = document.createAttribute("class");
    attUser.value = "me ltn";
    
    userDiv.setAttributeNode(attUser);
    userDiv.innerHTML = `${input}`;
    mainDiv.appendChild(userDiv);
}

function addReplyG(reply) {
    addReply(reply,"green")
}

function addReplyR(reply) {
    addReply(reply,"red")
}

function addReplyL(reply) {
    addReply(reply, script + "-large")
}

function addReply(reply, cl = "") {
    const inputField = document.getElementById("input");
    
    let sleep = ms => {  
	return new Promise(resolve => setTimeout(resolve, ms));  
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

function addButtons(buttonArray,cmd,data = false) {
    const inputField = document.getElementById("input");
    const id = buttonNo.toString();
    
    let sleep = ms => {  
	return new Promise(resolve => setTimeout(resolve, ms));  
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

	buttonArray.forEach(button => {
	    const cbutton = document.createElement('button')
	    const buttonAtt = document.createAttribute("class");
	    buttonAtt.value = "button"
	    const id = buttonNo.toString();
	    buttonNo += 1;
	    
	    cbutton.innerText = button;
	    cbutton.id = "button" + id;
	    cbutton.setAttributeNode(buttonAtt);
	
	    cbutton.addEventListener('click', () => {
		if ( ! data ) {
		    cmd(button);
		} else {
		    cmd(button,data)
		}
	    })
	    document.getElementById(botDivId.value).appendChild(cbutton);
	    
	});
	
	inputField.scrollIntoView();
    });
}

function repeat_if_playing() {
    if (playing) {
	exercise(curdata, round-1,false)
    } else {
	mode_choice();
    }
}

function changefont(font){
    curfont = font;
    repeat_if_playing();
}

function changemode(mode){
    curmode = mode_map[mode][0];
    chap = mode_map[mode][1];
    resetroundscore();

    var curintro = mode_map[mode][3];
    addReplyG(dia[curintro])

    if ( chap ) {
	var chapdata = mode_map[mode][2];
	var chapters = ["all"].concat(Object.keys(chapdata));
	addButtons(chapters, choosechapter, chapdata);
    } else {
	curdata = shuffleArray(mode_map[mode][2]) 
	exercise(curdata,round-1)
    }
}

function choosechapter(chapter, data) {
    if ( chapter == "all" ) {

	let all = []
	let chapters_a = Object.keys(data);
	
	for (var i = chapters_a.length -1 ; i >= 0; i--) {    
	    chap_a = data[chapters_a[i]]
	    
	    for (var j = chap_a.length -1 ; j >= 0; j--) {
		all.push(chap_a[j])
	    };
	};
	
	curdata = shuffleArray(all)
    } else {
	curdata = shuffleArray(data[chapter]);
    }

   
    exercise(curdata,round-1);
}

function add_button_value(str,array) {
    let display = translit_bracket(array[0]) + " " + str;
    let input = array[0] + " " + str;
    let question = array[1];
    let answer = array[2];
    
    addInput(display);
    compare_with_answer(input,question,answer);
}

function quota() {
    let out=""
    out = num2scriptstr(score) + "/" + num2scriptstr(round);
    return out
}


// remove later

function num2mongolstr(n) {
    let nstr = n.toString(10);
    nstr = nstr.replace(/0/g, "᠐");
    nstr = nstr.replace(/1/g, "᠑");
    nstr = nstr.replace(/2/g, "᠒");
    nstr = nstr.replace(/3/g, "᠓");
    nstr = nstr.replace(/4/g, "᠔");
    nstr = nstr.replace(/5/g, "᠕");
    nstr = nstr.replace(/6/g, "᠖");
    nstr = nstr.replace(/7/g, "᠗");
    nstr = nstr.replace(/8/g, "᠘");
    nstr = nstr.replace(/9/g, "᠙");
    return nstr;
}
