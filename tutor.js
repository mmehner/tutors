const randomData = shuffleArray(data);

var curfont = fonts[0]

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
	    
	    if ( text !== "") {
		output(text);
		inputField.scrollIntoView();
	    }
	}
    });
    
});

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

    addReply(dia.intro[0])
    
    sleep(700).then(() => {
	addReply(dia.intro[1]);
	sleep(500).then(() => {
	    excercise(randomData,round-1);
	});
    });

}

function excercise(array,index) {
    if ( index <= array.length ) {
	addReplyL(array[index][0]);
    } else {
	addReplyG(dia.empty);
    }
}

function output(input) {
    let inputTranslit = langSpecTranslit(input);
    let cur = curset();
    let question = cur[field.question];
    let answer = cur[field.answer];
    let answerTranslit = langSpecTranslit(cur[field.answer]);

    addInput(inputTranslit);
    
    if ( input == dia.commands.help ) {
	addReply(table);	
    } else if ( input == dia.commands.chfont ) {
	addButtons(fonts,changefont)
    } else if  ( input.match(/[^a-zA-Z0-9']/g) !== null ) {
	addReply(dia.tryagain);
    } else if ( input === answer ) {
	score += 1;
	addReplyG(dia.correct + quota());
	round += 1;
    } else {
	let reply = dia.incorrect + " <b>" + question + "<span class=\"ltn\"> " + answerTranslit + "</span></b> " + dia.correction + quota();
	addReplyR(reply);
	round += 1;
    }
    
    excercise(randomData,round-1);

}

function langSpecTranslit(input) {
    let out=""
    switch(script)
    {
	case "deva":
	out = translitDeva(input);
	case "bod":
	out = input;
	default:
	break;
    }
    return out
}

function translitDeva(input) {
    let out = input;
    if ( input !== hk2iast(input) ) {
	out = hk2iast(input) + " [" + input + "]";
    }
    return out;
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

function addButtons(buttonArray,cmd) {
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
		cmd(button);
	    })
	    document.getElementById(botDivId.value).appendChild(cbutton);
	    
	});
	
	inputField.scrollIntoView();
    });
}

function changefont(font){
    curfont = font;
    excercise(randomData,round-1);
}

function hk2iast(str) {
    str = str.replace(/A/g, "ā");
    str = str.replace(/I/g, "ī");
    str = str.replace(/U/g, "ū");
    str = str.replace(/lRR/g, "ḹ");
    str = str.replace(/lR/g, "ḷ");
    str = str.replace(/RR/g, "ṝ");
    str = str.replace(/R/g, "ṛ");
    str = str.replace(/M/g, "ṃ");
    str = str.replace(/H/g, "ḥ");
    str = str.replace(/G/g, "ṅ");
    str = str.replace(/J/g, "ñ");
    str = str.replace(/T/g, "ṭ");
    str = str.replace(/D/g, "ḍ");
    str = str.replace(/N/g, "ṇ");
    str = str.replace(/z/gi, "ś");
    str = str.replace(/S/g, "ṣ");
    return str;
}

function num2devastr(n) {
    let nstr = n.toString(10);
    nstr = nstr.replace(/0/g, "०");
    nstr = nstr.replace(/1/g, "१");
    nstr = nstr.replace(/2/g, "२");
    nstr = nstr.replace(/3/g, "३");
    nstr = nstr.replace(/4/g, "४");
    nstr = nstr.replace(/5/g, "५");
    nstr = nstr.replace(/6/g, "६");
    nstr = nstr.replace(/7/g, "७");
    nstr = nstr.replace(/8/g, "८");
    nstr = nstr.replace(/9/g, "९");
    return nstr;
}

function num2bodstr(n) {
    let nstr = n.toString(10);
    nstr = nstr.replace(/0/g, "༠");
    nstr = nstr.replace(/1/g, "༡");
    nstr = nstr.replace(/2/g, "༢");
    nstr = nstr.replace(/3/g, "༣");
    nstr = nstr.replace(/4/g, "༤");
    nstr = nstr.replace(/5/g, "༥");
    nstr = nstr.replace(/6/g, "༦");
    nstr = nstr.replace(/7/g, "༧");
    nstr = nstr.replace(/8/g, "༨");
    nstr = nstr.replace(/9/g, "༩");
    return nstr;
}

function quota() {
    let out=""
    switch(script)
    {
	case "deva":
	out = num2devastr(score) + "/" + num2devastr(round);
	break;
	case "bod":
	out = num2bodstr(score) + "/" + num2bodstr(round);
	break;
	default:
	break;
    }
    return out
}


function curset() {
    return randomData[round-1];
}
