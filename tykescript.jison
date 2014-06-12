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
"="                             return 'EQ' // todo : switch assignment operator
"nowthen"                       return 'nowthen'
"tara"                          return 'tara'
"do"                            return 'do'
[A-Za-z][A-Za-z_0-9-]*          return 'NAME'
<<EOF>>                         return 'EOF'

/lex

%start document

%%

document
    : SOURCE EOF {yy.add($1); return yy}
    ;

SOURCE
    : STATEMENTS
    | STATEMENTS NEWLINES
    ;

STATEMENTS
    : STATEMENT { $$ = yy.statement($1)}
    | STATEMENTS NEWLINES STATEMENT {$$ = yy.add_statement($1, $3)}
    ;

STATEMENT
    : ASSIGNMENT
    | EXPR
    | FUNCTION
    | FUNC_CALL
    ;


ASSIGNMENT
    : VAR LABEL EQ EXPR
        {$$ = yy.assignment($2, $4)}
    ;

FUNCTION
    : nowthen LABEL NEWLINE STATEMENTS NEWLINE tara
        {$$ = yy.function($2, $4)}
    ;

FUNC_CALL
    : do LABEL {$$ = yy.function_call($2)};

EXPR
    : BOOL
    | NUM
    | BOOL COMPARISON BOOL
        {$$ = yy.bool_compare($1, $2, $3)}
    | LABEL COMPARISON LABEL
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

NEWLINES
    : NEWLINE
    | NEWLINES NEWLINE
    ;

NUM : NUMBER {$$ = yy.number_literal($1)};
LABEL : NAME {$$ = yy.label($1)};


%%