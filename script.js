const getS = (selector) => document.querySelector(selector);

let loginRegExp = /^\w{4,16}$/i;
let passRegExp = /^[a-z|0-9|\.|_|-]{4,16}$/i;
let emailRegExp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;
let login;
let passWord;
let email;
let edit;
let userIndex;

const form = getS(".newUser_form");

const usersList = [];

getS(".newUser_login").oninput = function () {
  login = loginRegExp.test(getS(".newUser_login").value);
  if (login) {
    this.style.border = "1px solid green";
    this.style.boxShadow = "0 0 2px 2px rgb(43, 199, 38)";
    this.style.borderRadius = "5px";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0 0 2px 2px red";
    this.style.borderRadius = "5px";
  }
};

getS(".newUser_login").onblur = function () {
  this.style.border = "1px solid gray";
  this.style.boxShadow = "none";
  this.style.borderRadius = "5px";
};

getS(".newUser_password").oninput = function () {
  passWord = passRegExp.test(getS(".newUser_password").value);
  if (passWord) {
    this.style.border = "1px solid green";
    this.style.boxShadow = "0 0 2px 2px rgb(43, 199, 38)";
    this.style.borderRadius = "5px";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0 0 2px 2px red";
    this.style.borderRadius = "5px";
  }
};

getS(".newUser_password").onblur = function () {
  this.style.border = "1px solid gray";
  this.style.boxShadow = "none";
  this.style.borderRadius = "5px";
};

getS(".newUser_email").oninput = function () {
  email = emailRegExp.test(getS(".newUser_email").value);
  if (email) {
    this.style.border = "1px solid green";
    this.style.boxShadow = "0 0 2px 2px rgb(43, 199, 38)";
    this.style.borderRadius = "5px";
  } else {
    this.style.border = "1px solid red";
    this.style.boxShadow = "0 0 2px 2px red";
    this.style.borderRadius = "5px";
  }
};

getS(".newUser_email").onblur = function () {
  this.style.border = "1px solid gray";
  this.style.boxShadow = "none";
  this.style.borderRadius = "5px";
};

function addUser() {
  if (login && passWord && email) {
    const login = form.querySelector('[name="login"]');
    const password = form.querySelector('[name="password"]');
    const email = form.querySelector('[name="email"]');

    const newUser = {
      login: login.value,
      password: password.value,
      email: email.value,
    };

    usersList.push(newUser);
    document.forms.user.reset();    
  }
  render();
}

function render() {
    document.querySelector("tbody").innerHTML = "";
    for (let i = 0; i < usersList.length; i++) {
      let row = document.createElement("tr");
      row.innerHTML = `
            <td>${i + 1}</td>
            <td>${usersList[i].login}</td>
            <td>${usersList[i].password}</td>
            <td>${usersList[i].email}</td>
            <td><input type='button' class='edit-btn btn' name='edit' onclick='editUser()' value='Edit'></td>
            <td><input type='button' class='dlt-btn btn' name='delete' onclick='deleteUser()' value='Delete'></td>`;
      getS(".userList").append(row);
    }
  
}

function deleteUser() {
  let index =
    event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  usersList.splice(index, 1);
  render();
}

function editUser() {
  let userIndex =
    event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  edit = usersList[userIndex];
  getS(".newUser_login").value = edit.login;
  getS(".newUser_password").value = edit.password;
  getS(".newUser_email").value = edit.email;
  getS(".newUser_btn_addUser").classList.add("hide");
  getS(".user-edit-btn").classList.remove("hide");
  getS(".edit-btn").disabled = true;
  getS(".dlt-btn").disabled = true;
}

function saveEditUser() {
  if (login && passWord && email) {
    btn();
    edit.login = getS(".newUser_login").value;
    edit.password = getS(".newUser_password").value;
    edit.email = getS(".newUser_email").value;
    getS(".newUser_btn_addUser").classList.remove("hide");
    getS(".user-edit-btn").classList.add("hide");
    render();
    document.forms.user.reset();
  }
}

function btn() {
  if (login && passWord && email) {
    getS(".newUser_btn_addUser").disabled = false;
    getS(".user-edit-btn").disabled = false;
  }
}
