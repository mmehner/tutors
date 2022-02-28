const type = "transcription";

const script = "alefba";

const field = {
    "question": 0,
    "answer": 1,
};

const data = []; 

 
const table = '<table class="bod-large" style="text-align: center; vertical-align: middle;">' +
      '<tr>' +
      '<td>ཀ་</td>' +
      '<td class="ltn-small">ka</td>' +
      '<td>ཁ་</td>' +
      '<td class="ltn-small">kha</td>' +
      '<td>ག་</td>' +
      '<td class="ltn-small">ga</td>' +
      '<td>ང་</td>' +
      '<td class="ltn-small">nga</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ཅ་</td>' +
      '<td class="ltn-small">ca</td>' +
      '<td>ཆ་</td>' +
      '<td class="ltn-small">cha</td>' +
      '<td>ཇ་</td>' +
      '<td class="ltn-small">ja</td>' +
      '<td>ཉ་</td>' +
      '<td class="ltn-small">nya</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ཏ་</td>' +
      '<td class="ltn-small">ta</td>' +
      '<td>ཐ་</td>' +
      '<td class="ltn-small">tha</td>' +
      '<td>ད་</td>' +
      '<td class="ltn-small">da</td>' +
      '<td>ན་</td>' +
      '<td class="ltn-small">na</td>' +
      '</tr>' +
      '<tr>' +
      '<td>པ་</td>' +
      '<td class="ltn-small">pa</td>' +
      '<td>ཕ་</td>' +
      '<td class="ltn-small">pha</td>' +
      '<td>བ་</td>' +
      '<td class="ltn-small">ba</td>' +
      '<td>མ་</td>' +
      '<td class="ltn-small">ma</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ཙ་</td>' +
      '<td class="ltn-small">tsa</td>' +
      '<td>ཚ་</td>' +
      '<td class="ltn-small">tsha</td>' +
      '<td>ཛ་</td>' +
      '<td class="ltn-small">dza</td>' +
      '<td>ཝ་</td>' +
      '<td class="ltn-small">wa</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ཞ་</td>' +
      '<td class="ltn-small">zha</td>' +
      '<td>ཟ་</td>' +
      '<td class="ltn-small">za</td>' +
      '<td>འ་</td>' +
      '<td class="ltn-small">\'a</td>' +
      '<td>ཡ་</td>' +
      '<td class="ltn-small">ya</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ར་</td>' +
      '<td class="ltn-small">ra</td>' +
      '<td>ལ་</td>' +
      '<td class="ltn-small">la</td>' +
      '<td>ཤ་</td>' +
      '<td class="ltn-small">sha</td>' +
      '<td>ས་</td>' +
      '<td class="ltn-small">sa</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ཧ་</td>' +
      '<td class="ltn-small">ha</td>' +
      '<td>ཨ་</td>' +
      '<td class="ltn-small">a</td>' +
      '<tr class="blank-row"/>' +
      '<tr>' +
      '<td>ཀ་</td>' +
      '<td class="ltn-small">ka</td>' +
      '<td>ཀི་</td>' +
      '<td class="ltn-small">ki</td>' +
      '<td>ཀུ་</td>' +
      '<td class="ltn-small">ku</td>' +
      '<td>ཀེ་</td>' +
      '<td class="ltn-small">ke</td>' +
      '<td>ཀོ་</td>' +
      '<td class="ltn-small">ko</td>' +
      '</tr>' +
      '</table>';

const dia = {
    "intro" : [ "سلآم", '<span class="ltn">Please transcribe the following syllables.<br/>For help type</span> རོགས་རམ་ <span class="ltn"><i>rogs ram</i>.</span>' ],
    "empty" : "ཚར་བ།",
    "help" : "rogs ram",
    "tryagain" : "ཐུགས་ཁྲལ་མ་གནང། འདི་ཡང་སྐྱར་བྲིས་རོགས་གནང།",
    "correct" : "འགྲིགས་པ་ཡིན། ",
    "incorrect" : "ནོར་འཁྲུལ།<br/>",
    "correction" : "ཅེས་འགྲིགས་པ་ཡིན། ",
    "response": [],
};
