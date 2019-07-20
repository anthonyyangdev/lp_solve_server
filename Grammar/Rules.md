# Rules

&lt;statement&gt; ::= (&lt;sum&gt; | &lt;for&gt; | &lt;objective&gt; | &lt;constraint&gt; | &lt;set&gt;) ";"

&lt;sum&gt; ::= "sum [" &lt;variable&gt; "=" (&lt;variable&gt; | &lt;number&gt;) "to" (&lt;variable&gt; | &lt;number&gt;) "] (" &lt;expression&gt; ")" 

&lt;for&gt; ::= "for" &lt;variable&gt; "=" (&lt;variable&gt; | &lt;number&gt;) "to" (&lt;variable&gt; | &lt;number&gt;) ":" &lt;expression&gt; 

&lt;objective&gt; ::= ("max" | "min" ) [ "imize" ] ":", &lt;expression&gt;

&lt;constraint&gt; ::= [ &lt;name&gt; ] (&lt;relation_constraint&gt; | &lt;range_constraint&gt;)

&lt;set&gt; ::= "set" &lt;variable&gt; "=" &lt;expression&gt;

&lt;expression&gt; ::= (&lt;term&gt;| &lt;number&gt; ) ("+" | "-") [ ("+" | "-") ] &lt;expression&gt; | &lt;number&gt; | &lt;term&gt;

&lt;term&gt; ::= &lt;number&gt; &lt;variable&gt;

&lt;number&gt; ::= &lt;integer&gt; | &lt;float&gt;

&lt;variable&gt; ::= &lt;letter&gt; { &lt;word&gt; } [ &lt;subscript&gt; ]

&lt;letter&gt; ::= [a-zA-Z]

&lt;word&gt; ::= [a-zA-Z_0-9]

&lt;subscript&gt; ::= "_"&lt;variable&gt;

&lt;name&gt; ::=  &lt;letter&gt; { &lt;word&gt; } ":"

&lt;relation_constraint&gt; ::= &lt;expression&gt; &lt;relation&gt; &lt;expression&gt;

&lt;range_constraint&gt; ::= &lt;expression&gt; &lt;increasing&gt; &lt;expression&gt; &lt;increasing&gt; &lt;expression&gt; | &lt;expression&gt; &lt;decreasing&gt; &lt;expression&gt; &lt;decreasing&gt; &lt;expression&gt;

&lt;relation&gt; ::= &lt;increasing&gt; | &lt;decreasing&gt; | &lt;equal&gt;

&lt;increasing&gt; ::= "<" | "<="

&lt;decreasing&gt; ::= ">" | ">="

&lt;equal&gt; ::= "="
