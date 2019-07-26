function init() {
    return {
        x: null,
        next: function () { return null; }
    };
}
function add(value, target) {
    var newEnv = init();
    newEnv.next = function () { return Object.assign({}, target); };
    newEnv.x = value;
    return newEnv;
}
function unset(target) {
    var newEnv = init();
    newEnv.x = target.next().x;
    newEnv.next = target.next().next;
    return newEnv;
}
var env = init();
env = add(1, env);
env = add(2, env);
env = add(3, env);
env = add(4, env);
env = add(5, env);
env = unset(env)
env = unset(env)
env = unset(env)
env = unset(env)
console.log(env.next().next());
