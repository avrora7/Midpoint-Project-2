$(document).ready(function () {
  $("#jobPost").click(function () {

    var languageFromId = $("#languageFromId").val();
    var languageToId = $("#languageToId").val();
    var title = $("#title").val();
    var description = $("#description").val();

    if (languageFromId == -1) {
      displayError("Choose Source Language");
      return;
    }

    if (languageToId == -1) {
      displayError("Choose Target Language");
      return;
    }

    if (languageToId == languageFromId) {
      displayError("Source and Target language can not be the same");
      return;
    }

    if (title.trim() == "") {
      displayError("Enter title");
      return;
    }

    if (description.trim() == "") {
      displayError("Enter description");
      return;
    }
    var newJob = {
      languageFromId: languageFromId,
      languageToId: languageToId,
      title: title,
      description: description
    }
    $.ajax("/api/jobs", {
      type: "POST",
      data: newJob
    }).then(
      function () {
        console.log("created new job");
        // Reload the page to get the updated list
        location.reload();
      });
  });

});

function displayError(error) {
  alert(error);
}