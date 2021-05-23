$(".btn-shorten").on("click", () => {
  $(".error-message").html("");
  const inputval = $("#url-field").val();
  if (!inputval) {
    return $(".error-message").html("Link is required");
  }
  $.ajax({
    url: "/api/shorten",
    type: "POST",
    dataType: "JSON",
    data: { url: inputval },
    error: function (xhr, error) {
      const errorMessage = xhr.responseJSON.message;
      $(".error-message").html(errorMessage);
      $("#error-message").hide().fadeIn("slow");
    },
    success(response) {
      debugger;
      const data = response.data;
      const resultHTML = `<a id="shortUrl"  class="result" target="_blank" href="${data.url}">${data.url}</a>`;
      $("#link").html(resultHTML);
      $("#link").hide().fadeIn("slow");
    },
  });
});
