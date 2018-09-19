$(document).ready(function () {
  $(".applyBtn").click(function(event) {

    var jobUpdate = {
      action: "apply",
      id: $(this).data("id")
    }
    console.log(jobUpdate)
    $.ajax("/api/jobs", {
      type: "PUT",
      data: jobUpdate
    }).then(
      function () {
        console.log("updated job");
        // Reload the page to get the updated list
        location.reload();
      });
  });

});

$(document).ready(function () {
  $(".closeBtn").click(function(event) {

    var jobUpdate = {
      action: "close",
      id: $(this).data("id")
    }
    console.log(jobUpdate)
    $.ajax("/api/jobs", {
      type: "PUT",
      data: jobUpdate
    }).then(
      function () {
        console.log("updated job");
        // Reload the page to get the updated list
        location.reload();
      });
  });

});

function displayError(error) {
  alert(error);
}
