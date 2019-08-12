# lp_solve_server

Not to be confused with the [lp_solver_server_dev](https://github.com/ayang4114/lp_solve_server_dev) repository, this repository is a new build carried over from the previous repository. Like the previous version, this version uses NodeJS and the Express dependency to create a runnable server. While the two version are similar in their syntax and semantics, the implementation of the parser is significantly different.

## Differences
This version of the lp_solve_server is written and tested using TypeScript. In addition, it uses a more 
robust parser and tokenizes its received inputs for more modularized interpretation. By tokenizing the inputs, the version aims to interpret the inputs to produce the algebraic model, as well as to make the project more scalable if additional features are desired to be added.

The current EBNF-Grammar rules of the language are written in the [./Grammar directory](https://github.com/ayang4114/lp_solve_server/blob/master/Grammar/Rules.ebnf).

