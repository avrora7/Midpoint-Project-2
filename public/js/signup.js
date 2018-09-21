$(document).ready(function() {
  // Getting references to form and input
  var email = $("#email");
  var password1 = $("#password1");
  var password2 = $("#password2");
  var role = 

  // When the signup button is clicked, this validates that the email and password are not blank
  $("#submitForm").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: $("#email").val().trim(),
      password1: $("#password1").val().trim(),
      password2: $("#password2").val().trim(),
      role: $("#roleSelect").val(),
      fullName: $("#fullName").val().trim()
    };

    if (userData.fullName == "") {
      alert("Enter full name");
      return;
    } else if (userData.role == "") {
      alert("Select your role");
      return;
    }  else if (userData.email == "") {
      alert("Enter email");
      return;
    } else if (userData.password1 == "") {
      alert("Enter password");
      return;
    } else if (userData.password2 == "") {
      alert("Re-enter password");
      return;
    } else if (userData.password1 != userData.password2) {
      alert("Password mismatch");
      return;
    }
    signUpUser(userData);
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData).then(function(data) {
      window.location.replace("/login");
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    alert(err.responseJSON);
  }
});
