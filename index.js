var nameinput = document.getElementById("nameInput");
var emailinput = document.getElementById("emailInput");
var passinput = document.getElementById("passInput");
var LoginBtn = document.getElementById("login");
var loginLink = document.getElementById("loginLink");
var signUpBtn = document.getElementById("signUp");
var signupWord = document.getElementById("signUpWord");
var message = document.getElementById("message");
var paragraph = document.getElementById("paragraph");
var userName = document.getElementById("username");

if (localStorage.getItem("users") == null) {
  var usersList = [];
} else {
  usersList = JSON.parse(localStorage.getItem("users"));
}
// -------------------------------

function changeToSignUp() {
  nameinput.classList.remove("d-none");
  LoginBtn.classList.add("d-none");
  signUpBtn.classList.remove("d-none");

  paragraph.innerHTML = "You have an account? Sign In";
}

// ----------------------------

function changeToLogin() {
  nameinput.classList.add("d-none");
  LoginBtn.classList.remove("d-none");
  signUpBtn.classList.add("d-none");
  paragraph.innerHTML = "Don’t have an account? Sign Up";
}

// ---------------------------------

signupWord.addEventListener("click", function () {
  changeToSignUp();
});

// --------------------------
function validateEmail(mail) {
  var regexEmail = /^([A-Za-z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  if (regexEmail.test(mail)) {
    return true;
  } else {
    return false;
  }
}
// ----------------------------

signUpBtn.addEventListener("click", function () {
  if (emailinput.value == " " || passinput.value == "") {
    message.classList.remove("d-none");
  } else if (validateEmail(emailinput.value) == false) {
    alert("Invalid Email");
  } else {
    var user = {
      Name: nameinput.value,
      Email: emailinput.value,
      Password: passinput.value,
    };

    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    message.classList.remove("d-none");
    message.innerHTML = "Success";
    message.classList.replace("text-danger", "text-success");
  }
  clearData();
  changeToLogin();
});

function clearData() {
  nameinput.value = "";
  emailinput.value = "";
  passinput.value = "";
}

LoginBtn.addEventListener("click", function () {
  var flag = false;
  var cartona = "";
  for (var i = 0; i < usersList.length; i++) {
    if (
      emailinput.value == usersList[i].Email &&
      passinput.value == usersList[i].Password
    ) {
      flag = true;
      cartona = usersList[i].Name;
    }
  }
  if (flag == true) {
    loginLink.setAttribute("href", "home.html");
    userName.innerHTML = cartona;
  } else {
    alert("Incorrect email or password");
    clearData();
  }
});
