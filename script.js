import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase, set, ref ,push, child, onValue} from
"https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyDxnwv6YVjJFMUwY4U16xoUihhnwrd4gyA",
authDomain: "to-do-list-70f7f.firebaseapp.com",
databaseURL: "https://to-do-list-70f7f-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "to-do-list-70f7f",
storageBucket: "to-do-list-70f7f.appspot.com",
messagingSenderId: "458799349490",
appId: "1:458799349490:web:11eebbe7ff8fff075e9a6b",
measurementId: "G-1R7MEDHRNZ",
databaseURL: "https://to-do-list-70f7f-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let userName = $("#userName")
let pass = $("#pass")

let btn = $("#btn")
let send = $("#send")

let usersArray = [];
let passArray = [];

let user;

let list = document.querySelector('#list');

const starCountRef = ref(database, 'messages/');
onValue(starCountRef, (snapshot) => {
snapshot.forEach(childSnapshot => {
const data = childSnapshot.val();
const key = childSnapshot.key;
console.log(data.mess)
console.log(data.user)

let li1 = document.createElement('li');
let li2 = document.createElement('li');
li1.textContent = data.user;
li2.textContent = data.mess;
list.appendChild(li1);
list.appendChild(li2);
});

});

const starCountRef1 = ref(database, 'users/');
onValue(starCountRef1, (snapshot) => {
snapshot.forEach(childSnapshot => {
const data = childSnapshot.val();
const key = childSnapshot.key;
console.log(data.name)
console.log(data.pass)
usersArray.push(data.name)
passArray.push(data.pass) // милиця, виправити на асоціативний масив, якщо звятиться сенс
});

});


function ifUserExists() {
    if (!usersArray.includes(userName.val())) {
    alert("Зареєстровано!.");
    set(ref(database, 'users/' + userName.val()), {
    name: userName.val(),
    pass: pass.val(),
    })
    } else {
    if (passArray.includes(pass.val())) {
    alert("Ви увійшли!")
    user = userName.val();

    $('#messages').css('display', 'block')
    } else {
    alert("Це імя вже існує")
    }
    }
}

function read() {
    return new Promise((resolve, reject) => {
       const starCountRef1 = ref(database, 'users/');
       onValue(starCountRef1, (snapshot) => {
       snapshot.forEach(childSnapshot => {
       const data = childSnapshot.val();
       const key = childSnapshot.key;
       usersArray.push(data.name)
       passArray.push(data.pass) // милиця, виправити на асоціативний масив, якщо звятиться сенс
       });

       });
    })
}
btn.click( function() {
read()
    .then(ifUserExists())
    .catch(err => console.log(err));
});

send.click(function() {
// $('#list').empty();
list.textContent = '';
set(ref(database, 'messages/' + push(child(ref(database), 'messages/')).key), {
mess: $('#message').val(),
user: user
})


})