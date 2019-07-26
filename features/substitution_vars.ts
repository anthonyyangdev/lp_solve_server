type Data = {
  x: number,
  next: () => Data
}

function init() {
  return {
    x: undefined,
    next: () => undefined
  }
}
function add(value, target) {
  let newEnv: Data = init()
  newEnv.next = () => Object.assign({}, target)
  newEnv.x = value
  return newEnv
}

function unset(target: Data) {
  let newEnv = init()
  newEnv.x = target.next().x
  newEnv.next = target.next().next;
  return newEnv
}

let env: Data = init()
env = add(1, env)
env = add(2, env)
env = add(3, env)
env = add(4, env)
env = add(5, env)
console.log(env)