// constants
const script = "farsi";

const fonts = [  "Lateef", "Scheherazade", "Awami", ];

const defaultfont = "Lateef";

const modes = [ "script", "Grundwortschatz", ];

const field = {
    "question" : 0,
    "answer" : 1,
};

const commands = [ "help", "alefbA", "qalam", "tamrIn", ];

const dia = {
    "intro" :  "سلام",
    "choice" : '<div class="ltn">What would you like to exercise?</div>',
    "help" : '<div class="ltn">List of commands:<br/>To display the transliteration table type:</div> الفبا <i class="ltn">alefbA</i><div class="ltn"> to change the font type:</div> قلم <i class="ltn">qalam</i><div class="ltn">and to choose another exercise type:</div> تمرین <i class="ltn">tamrIn.</i>',
    "empty" : "",
    "tryagain" : "",
    "correct" : "",
    "incorrect" : "",
    "correction" : "",
    "script_intro" : '<div class="ltn">Transcribe the following letters.<br/>To display the transliteration table type:</div> الفبا <i class="ltn">alefbA</i><div class="ltn">to change the font type:</div> قلم <i class="ltn">qalam.</i>',
    "grund_intro" : '<div class="ltn"></div>',
};

const table = '<table class="farsi-large" style="text-align: center; vertical-align: middle;">' +
      '<tr>' +
      '<td>اَ</td>' +
      '<td class="ltn-small">a</td>' +
      '<td>اِ</td>' +
      '<td class="ltn-small">i/e</td>' +
      '<td>اُ</td>' +
      '<td class="ltn-small">u/o</td>' +
      '</tr>' +
      '<tr>' +
      '<td>آ</td>' +
      '<td class="ltn-small">ā [A]</td>' +
      '<td>ب</td>' +
      '<td class="ltn-small">b</td>' +
      '<td>پ</td>' +
      '<td class="ltn-small">p</td>' +
      '<td>ت</td>' +
      '<td class="ltn-small">t</td>' +
      '<td>ث</td>' +
      '<td class="ltn-small">s̱ [_s]</td>' +
      '<td>ج</td>' +
      '<td class="ltn-small">ǧ [^g]</td>' +
      '<td>چ</td>' +
      '<td class="ltn-small">č [c]</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ح</td>' +
      '<td class="ltn-small">ḥ [.h]</td>' +
      '<td>خ</td>' +
      '<td class="ltn-small">ḫ [_h/x]</td>' +
      '<td>د</td>' +
      '<td class="ltn-small">d</td>' +
      '<td>ذ</td>' +
      '<td class="ltn-small">ẕ [_z]</td>' +
      '<td>ر</td>' +
      '<td class="ltn-small">r</td>' +
      '<td>ز</td>' +
      '<td class="ltn-small">z</td>' +
      '<td>ژ</td>' +
      '<td class="ltn-small">ž [^z]</td>' +
      '</tr>' +
      '<tr>' +
      '<td>س</td>' +
      '<td class="ltn-small">s</td>' +
      '<td>ش</td>' +
      '<td class="ltn-small">š [^s]</td>' +
      '<td>ص</td>' +
      '<td class="ltn-small">ṣ [.s]</td>' +
      '<td>ض</td>' +
      '<td class="ltn-small">ż [;z]</td>' +
      '<td>ط</td>' +
      '<td class="ltn-small">ṭ [.t]</td>' +
      '<td>ظ</td>' +
      '<td class="ltn-small">ẓ [.z]</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ع</td>' +
      '<td class="ltn-small">ʿ [\']</td>' +
      '<td>غ</td>' +
      '<td class="ltn-small">ġ [;g]</td>' +
      '<td>ف</td>' +
      '<td class="ltn-small">f</td>' +
      '<td>ق</td>' +
      '<td class="ltn-small">q</td>' +
      '<td>ک</td>' +
      '<td class="ltn-small">k</td>' +
      '<td>گ</td>' +
      '<td class="ltn-small">g</td>' +
      '</tr>' +
      '<tr>' +
      '<td>ل</td>' +
      '<td class="ltn-small">l</td>' +
      '<td>م</td>' +
      '<td class="ltn-small">m</td>' +
      '<td>ن</td>' +
      '<td class="ltn-small">n</td>' +
      '<td>و</td>' +
      '<td class="ltn-small">v/ū/ou</td>' +
      '<td>ه</td>' +
      '<td class="ltn-small">h</td>' +
      '<td>ی</td>' +
      '<td class="ltn-small">y/ī</td>' +
      '</tr>' +
      '</table>';

const scriptdata = [
    ["اَ", "a"],
    ["اِ", "i\\|e"],
    ["اُ", "u\\|o"],
    ["آ", "A"],
    ["ی اییی", "I"],
    ["ی ییی", "I\\|y"],
    ["او", "U"],
    ["و", "U\\|v"],
    ["ب ببب", "b"],
    ["پ پپپ", "p"],
    ["ت تتت", "t"],
    ["ث ثثث", "_s"],
    ["ج جج", "^g"],
    ["چ چچ", "c"],
    ["ح حح", ".h"],
    ["خ خخ", "_h\\|x"],
    ["د", "d"],
    ["ذ", "_z"],
    ["ر", "r"],
    ["ز", "z"],
    ["ژ", "^z"],
    ["س سس", "s"],
    ["ش شش", "^s"],
    ["ص صص", ".s"],
    ["ض ضض", ";z"],
    ["ط", ".t"],
    ["ظ", ".z"],
    ["ع ععع", "'"],
    ["غ غغغ", ";g"],
    ["ف ففف", "f"],
    ["ق ققق", "q"],
    ["ک کک", "k"],
    ["گ گگ", "g"],
    ["ل لل", "l"],
    ["م ممم", "m"],
    ["ن ننن", "n"],
    ["ه ههه", "h"],
];

const grunddata = [
    ["آب", "Ab", "Wasser"],
    ["بابا", "bAbA", "Vater"],
    ["پا", "pA", "Fuß"],
    ["پیپ", "pIp", "Pfeife"],
    ["تاب", "tAb", "Schaukel"],
    ["تَب", "tab", "Fieber"],
    ["سیب", "sIb", "Apfel"],
    ["اَسب", "asb", "Pferd"],
    ["پِسته", "peste", "Pistazie"],
    ["سه", "se", "drei"],
    ["او", "U", "er\\|sie"],
    ["توت", "tUt", "Beere"],
    ["پُست", "post", "Post"],
    ["تو", "tou", "du"],
    ["اَره", "are", "ja"],
    ["تَبَر", "tabar", "Axt"],
    ["این", "In", "dies"],
    ["آن", "An", "jenes"],
    ["اِستِکان", "estekAn", "Tasse"],
    ["کِتاب", "ketAb", "Buch"],
    ["کَدو", "gadU", "Kürbis"],
    ["دَندان", "dandAn", "Zahn"],
    ["بَستَنی", "bastanI", "Eiscreme"],
    ["اَنار", "anAr", "Granatapfel"],
    ["ایران", "IrAn", "Iran"],
    ["نان", "nAn", "Brot"],
    ["پِسَر", "pesar", "Junge"],
    ["زَن", "zan", "Frau"],
    ["بُز", "boz", "Ziege"],
    ["شاد", "^sAd", "glücklich"],
    ["آتَش", "Ata^s", "Feuer"],
    ["موش", "mU^s", "Maus"],
    ["مَرد", "mard", "Mann"],
    ["ماهی", "mAhI", "Fisch"],
    ["بَهار", "bahAr", "Frühling"],
    ["نُه", "noh", "neun"],
    ["ماه", "mAh", "Mond"],
    ["شیر", "^sIr", "Löwe"],
    ["زَبان", "zabAn", "Gesicht"],
    ["آسِمان", "AsemAn", "Himmel"],
    ["شَهر", "^sahr", "Stadt"],
    ["لَب", "lab", "Lippe"],
    ["لِباس", "lebAs", "Kleidung"],
    ["مِسواک", "mesvAk", "Zahnbürste"],
    ["میوه", "mIve", "Obst"],
    ["بِرِنج", "beren^g", "Reis"],
    ["پَنجَره", "pan^gare", "Fenster"],
    ["چَشم", "^ca^sm", "Auge"],
    ["ساندِویچ", "sAndevI^c", "Sandwich"],
    ["دِرَخت", "dera_ht", "Baum"],
    ["خانه", "_hAne", "Haus"],
    ["کَفش", "kaf^s", "Schuhe"],
    ["تِلِفُن", "telefon", "Telefon"],
    ["سَگ", "sag", "Hund"],
    ["گُربه", "gorbe", "Katze"],
    ["روح", "rU.h", "Gespenst"],
    ["حوله", ".hUle", "Handtuch"],
    ["بیمار", "bImAr", "krank"],
    ["بیمارِستان", "bImArestAn", "Krankenhaus"],
    ["دانِشجو", "dAne^s^gU", "Student"],
    ["خون", "_hUb", "gut"],
    ["دانِشمَند", "dAne^smand", "Wissenschaftler"],
    ["دوست", "dUst", "Freund"],
    ["نه", "ne", "Nein"],
    ["صورَت", ".surat", "Gesicht"],
    ["صُبح", ".sob.h", "Morgen"],
    ["حَیاط", ".hayA.t", "Hof"],
    ["طَناب", ".tanAb", "Seil"],
    ["قُرص", "qor.s", "Pille"],
    ["قاشُق", "qA^soq", "Löffel"],
    ["مُژه", "mo^ze", "Wimper"],
    ["ژاکَت", "^zAkat", "Jacke"],
    ["قَند", "qand", "Zucker"],
    ["سِفید", "sefId", "weiß"],
    ["چای", "^cAy", "Tee"],
    ["یِک", "yek", "eins"],
    ["عَسَل", "'asal", "Honig"],
    ["مُعلِّم", "mo'allam", "Lehrer"],
    ["شَمع", "^som'", "Kerze"],
    ["شُروع", "^sov'", "Start"],
    ["غَزا", ";gazA", "Gaza"],
    ["مَعازه", "ma'Aze", "Laden"],
    ["تیغ", "tI;g", "Rasierklinge"],
    ["مُرغ", "mor;g", "Huhn"],
    ["اَثاث", "a_sA_s", "Ding"],
    ["کَثیف", "ka_sIf", "schmutzig"],
    ["دانا", "dAnA", "weise"],
    ["پیر", "pIr", "alt"],
    ["خُرما", "_hormA", "Dattel"],
    ["غَذا", ";ga_zA", "Essen"],
    ["ذُرَّت", "_zorrat", "Mais"],
    ["ضَقیف", ";zaqIf", "schwach"],
    ["مَریض", "marI.s", "krank"],
    ["ظَرف", ".zarf", "Behälter"],
    ["خُداحافِظ", "_hodA.hAfe.z", "Tschüss"],
    ["کیلاس", "kIlAs", "Kirsche"],
    ["اِنگور", "engUr", "Traube"],
    ["نَقّاش", "naqqA^s", "Maler"],
];

// mode map must come after data
const mode_map = {
  // mode : [ abstract-mode, chap, data-set, intro ]
    script: ["oneway", false, scriptdata, "script_intro"],
    Grundwortschatz: ["c-oneway", false, grunddata, "grund_intro"],
};

// methods
function ltn2transcript(str) {
    str = str.replace(/A/g, "ā");
    str = str.replace(/I/g, "ī");
    str = str.replace(/U/g, "ū");
    str = str.replace(/_s/g, "s̱");
    str = str.replace(/\^g/g, "ǧ");
    str = str.replace(/\^c/g, "č");
    str = str.replace(/c/g, "č");
    str = str.replace(/\.h/g, "ḥ");
    str = str.replace(/_h/g, "ḫ");
    str = str.replace(/x/g, "ḫ");
    str = str.replace(/_z/g, "ẕ");
    str = str.replace(/\^z/g, "ž");
    str = str.replace(/\^s/g, "š");
    str = str.replace(/\.s/g, "ṣ");
    str = str.replace(/;z/g, "ż");
    str = str.replace(/\.t/g, "ṭ");
    str = str.replace(/\.z/g, "ẓ");
    str = str.replace(/;g/g, "ġ");
    str = str.replace(/'/g, "ʿ"); // Eyn
    str = str.replace(/:/g, "ʾ"); // Hamze
return str;
}

function num2scriptstr(n) {
  let nstr = n.toString(10);
  nstr = nstr.replace(/0/g, "۰");
  nstr = nstr.replace(/1/g, "۱");
  nstr = nstr.replace(/2/g, "۲");
  nstr = nstr.replace(/3/g, "۳");
  nstr = nstr.replace(/4/g, "۴");
  nstr = nstr.replace(/5/g, "۵");
  nstr = nstr.replace(/6/g, "۶");
  nstr = nstr.replace(/7/g, "۷");
  nstr = nstr.replace(/8/g, "۸");
  nstr = nstr.replace(/9/g, "۹");
  return nstr;
}
