$(document).ready(function() {
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    };

    if (userData.email == "") {
      alert("Enter email");
      return;
    } else if (userData.password == "") {
      alert("Enter password");
      return;
    }

    $.post("/api/login", userData
    ).then(function(role) {
      location.replace("/" + role);
    }).catch(function(err) {
      console.log(err);
    });
  });
});
