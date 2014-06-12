/* typescript grammar */

%lex

%%
\s+        				{/* skip whitespace */}
[0-9]+         			return 'NUMBER'
"+"         			return '+'
"aye"                   return 'aye'
"nay"                   return 'nay'
"in't"                  return 'isnt'
"is"                    return 'is'
<<EOF>>               	return 'EOF'

/lex

%start document

%%

document
    : SOURCE EOF {yy.add($1); return yy}
    ;

SOURCE
    : BOOL
    | BOOL COMPARISON BOOL
        {$$ = yy.bool_compare($1, $2, $3)}
    ;

BOOL
    : BOOL_LITERAL
        {$$ = yy.bool_literal($1)}
    | NUM COMPARISON NUM
        {$$ = yy.bool_compare($1, $2, $3)}
    ;


BOOL_LITERAL
    : aye
        {$$ = $1}
    | nay
        {$$ = $1}
    ;


COMPARISON
    : isnt
        {$$ = $1}
    | is
        {$$ = $1}
    ;

NUM : NUMBER {$$ = yy.number_literal($1)};

%%