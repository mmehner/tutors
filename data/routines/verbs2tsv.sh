#!/bin/sh

input="verbs.tex"
output="verbs.tsv"

sed -e '/\\vw{.*/d' < $input  |
    tr '\n' ' '  |
    sed -e 's_\\dhatu_\n&_g' |
    sed -e 's_\s*\\Zusatz.*__' \
	-e 's_\s*\\medskip\s*_ _' \
	-e 's_\s*\\forms{\s*__' \
	-e 's_\s*\\artha{[^}]*}__g' \
	-e 's_ *\\altern *_, _g' \
	-e 's_\\abbrev{präs.\\ pf}_\\PPRS_' \
	-e 's_adhi-i_& / adhī_' \
	-e 's_\\-__g' \
	-e 's_\\gan{\([^}]*\)}_ (\1)_g' \
	-e 's_\\gand{\([^}]*\)}_ (\1)_g' \
	-e 's_\([{ ]\)\([^ {]*\)\\shortlonga{}\([^ ,;|]*\)_\1 \2a\3, \2ā\3_g' \
	-e 's_\([{ ]\)\([^ {]*\)\\shortlongi{}\([^ ,;|]*\)_\1 \2i\3, \2ī\3_g' \
	-e 's_\([{ ]\)\([^ {]*\)\\shortlongu{}\([^ ,;|]*\)_\1 \2u\3, \2ū\3_g' \
	-e 's_\\mbox{\([^}]*\)}_\1_g' \
	-e 's_\(\\[A-Z]\+\s*\)*\[[^][]*\]__g' | 
    sed -e 's_\\[^{ ]*{-*}__g' \
	-e 's_\( *([^) ]*\) *|\([^)]*)\)_\1, \2_' |
    sed -e 's_\(\\[A-Z]\+\)\s\+\([^\\]*\)|_\1 \2 \1 _' |
    sed -e 's_\\[A-Z]\+_<n>&_g' \
	-e 's_\\pppp{-*}__' \
	-e 's_\\pppp{\([^}]*\)}_<n>\\PPP \1_' |
    sed -e ':a; s_\(<n>[ \\A-Z]\+\)<n>_\1_g;t a' |
    sed -e ':a; s_\(<n>[ \\A-Z]\+\)\([^\\,/|]*\)[,/|] *_\1 \2\1 _g; t a' | 
    sed -e 's_|\? *--- *__' |
    sed -e 's_\({\) *|_\1_' \
	-e 's_| *\(}\)_\1_' |
    sed -e 's_<n>_\n&_g' |
    sed ':a; s_\\pres{\([^}|]\+\)|\?\(.*\)\?}_<p>\1 \\pres{\2}_; ta;' | #best parser!
    sed -e 's_\\pres{ *}__g' \
	-e 's_, *$__' |  
    sed -e 's_^\(\\dhatu{[^{}]*}\)\(.*\) \(([^)]*)\),\?_\1 \3\2_' |
    sed -e 's_^\(\\dhatu{[^{}]*}\) (\([^)]*\))\(.*\) (\([^)]*\)),\?_\1 (\4, \2)\3_' | 
    sed -e 's_<p> *$__' \
	-e 's_<p>\([^<]*\)_\n<n>\\PRES \1_g' | 
    sed -e 's_\(<n>[^>]\+\)\(ti\); *-te_\1\2\n\1te_' \
	-e 's_\(<n>[^>]\+\)\(te\); *-ti_\1\2\n\1ti_' \
	-e 's_(\([^-]\+\)-)_\1_g' \
	-e 's_([1-3]\.[^)]*)__g' \
	-e 's_\(\w*\)(\([[:lower:]]\+\))\(\w*\)_\1\3 / \1\2\3_g' \
	-e 's_ (\?-)\?_ °_g' | 
    sed -e 's_\(<n>[ \\A-Z]\+\)\(°\?\w*\)(\(\w\+\))\(\w*\)_\1\2\4\n\1\2\3\4_g' |
    sed -e ':a; s_\(<n>[ \\A-Z]\+\)\([^,/]\+\)[,/] *_\1 \2\n\1 _; t a;' \
	-e 's_\(<n>\\[A-Z]\+\) *\([^;]\+\); *_\1\2\n\1 _' \
	-e 's_\\dhatu{\([^}]*\)}_<d>\1_' \
	-e 's_} *$__' |
    tr '\n' ' ' |
    sed -e 's_<d>_\n_g' \
	-e 's_<n>\([\\A-Z ]\+[A-Z]\) *\([^<\n]*\)_<n>\2\t\1_g' |
    awk 'BEGIN {FS="<n>"};
    	       {OFS="\t";
	        gsub(/^ */, "", $1)
		gsub(/ *$/, "", $1)
		gsub(/ *\/ */, " / ", $1)
	        for (i=2; i<=NF; i++) {
		 gsub(/^ */, "", $i)
		 gsub(/ *\t */, "\t", $i)
                 gsub(/ *$/, "", $i)	
	       	 print $1, $i }};' |
    sed -e 's_^\([^\t(]*\) *\(([^)]\+)\)\?\t_\1\t\2\t_' |
    sed -e 's_\t *\\PS *$_\tpresent passive_' \
	-e 's_\\PS_passive_' \
	-e 's_\\PRES_indicative_' \
	-e 's_\\PPP_past participle_' \
	-e 's_\\IND_indicative_' \
	-e 's_\\OP_optative_' \
	-e 's_\\IPV_imperative_' \
	-e 's_\\IMP_imperfect_' \
	-e 's_\\INJ_injunctive_' \
	-e 's_\\PF_perfect_' \
	-e 's_\\PPRS_present / perfect_' \
	-e 's_\\PPF_periphrastic perfect_' \
	-e 's_\\AO_aorist_' \
	-e 's_\\FT_future_' \
	-e 's_\\BEN_benedictive_' \
	-e 's_\\PPA_present active participle_' \
	-e 's_\\PPFA_perfect active participle_' \
	-e 's_\\GDV_gerundive_' \
	-e 's_\\INFIN_infinitive_' \
	-e 's_\\ABS_absolutive_' \
	-e 's_\t *\\CS *$_\tcausative indicative_' \
	-e 's_\\CS_causative_' \
	-e 's_\t *\\DS *$_\tdesiderative indicative_' \
	-e 's_\\DS_desiderative_' \
	-e 's_\t *\\IS *$_\tintensive indicative_' \
	-e 's_\\IS_intensive_' |
    sort | uniq > $output
