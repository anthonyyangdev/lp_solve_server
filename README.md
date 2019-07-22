# lp_solve_server

Not to be confused with the **lp_solver_server_dev** repository, this repository is a new build. 
Like the previous version, this version uses NodeJS and the Express dependency to start a runnable server. 
However, there are major differences between the two versions.

## Differences
This version of the lp_solve_server is written and tested using TypeScript. In addition, it uses a more 
robust parser and tokenizes its received inputs. By tokenizing the inputs, the version aims to 
interpret the inputs token by token to accurately produce the algebraic model, as well as to make the project
more scalable should additional features be added.

The EBNF-Grammar rules of the language are written in the ./Grammar directory.

