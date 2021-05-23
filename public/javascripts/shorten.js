$(".btn-shorten").on("click", () => {
  $.ajax({
    url: "/api/shorten",
    type: "POST",
    dataType: "JSON",
    data: { url: $("#url-field").val() },
    success(response) {
      debugger;
      const data = response.data;
      const resultHTML = `<a class="result" target="_blank" href="${data.url}">${data.url}</a>`;
      $("#link").html(resultHTML);
      $("#link").hide().fadeIn("slow");
    },
  });
});
