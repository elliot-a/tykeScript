/* typescript grammar */

%lex

%%
[\n\r]                          return 'NEWLINE'
[^\n\S]+                        {/* skip whitespace except \n */}
[0-9]+                          return 'NUMBER'
"+"                             return '+'
"aye"                           return 'aye'
"nay"                           return 'nay'
"in't"                          return 'isnt'
"is"                            return 'is'
"eyup"                          return 'VAR'
[A-Za-z][A-Za-z_0-9-]*          return 'LABEL'
"="                             return 'EQ' // todo : switch assignment operator
<<EOF>>                         return 'EOF'

/lex

%start document

%%

document
    : SOURCE EOF {return yy}
    ;

SOURCE
    : STATEMENT (NEWLINE STATEMENT)* NEWLINE?
    ;

STATEMENT
    : (ASSIGNMENT|EXPR) { yy.add_statement($1)}
    ;


ASSIGNMENT
    : VAR LABEL EQ EXPR
        {$$ = yy.assignment($2, $4)}
    ;

EXPR
    : BOOL
    | NUM
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