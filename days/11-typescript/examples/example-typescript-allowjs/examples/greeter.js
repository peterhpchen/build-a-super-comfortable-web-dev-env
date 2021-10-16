function greeter(person) {
  return 'Hello, ' + person;
}

let user = 'Jane User';
let theOtherUser = 'Peter User';

document.body.textContent = greeter(user, theOtherUser);
