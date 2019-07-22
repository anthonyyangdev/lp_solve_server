function REGEX() {
  const variable = /[a-zA-Z]\w*/
  const float = /[0-9]+\.[0-9]*|[0-9]*\.[0-9]+/
  const whitespace = /\s*/.source
  const integer = /[0-9]+/
  const number = new RegExp(`${integer.source}'|'${float.source}`)
  const possible_value = new RegExp(`${variable.source}|${number.source}`)

  const iteration_assign = new RegExp(`${variable.source}${whitespace}=${whitespace}${possible_value.source}${whitespace}to${whitespace}${possible_value}`)

  const for_statement = new RegExp(`for${whitespace}${iteration_assign.source}[${whitespace},${whitespace}${iteration_assign.source}]*${whitespace}:`)

  const statement = new RegExp(`${for_statement.source}`)
}

module.exports = REGEX