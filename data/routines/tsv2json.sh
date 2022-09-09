#!/bin/sh

# $1 is *.tsv-file

bracket() {
    sed -e '1 s_^_const data = \[\[_' \
	-e '2,$ s_^_\[_' \
	-e 's_$_\],_' \
	-e '$ s_$_\];_'
}

awk 'BEGIN {FS="\t";OFS=","};
    {for (i=1; i <= NF; i++) {
    	 gsub(/ *$/,"",$i);
	 gsub(/^ */,"",$i);
	 $i = "\""$i"\""};
	 print}' "${1}" | bracket
