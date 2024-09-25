const $wrapper = $(".wrapper"),
  $form = $("form"),
  $fileInp = $form.find("input"),
  $infoText = $form.find("p"),
  $closeBtn = $(".close"),
  $copyBtn = $(".copy");

const fetchRequest = (file, formData) => {
  $infoText.text("Scanning QR Code...");
  $.ajax({
    type: "POST",
    url: "http://api.qrserver.com/v1/read-qr-code/",
    data: formData,
    processData: false,
    contentType: false,
  })
    .then((result) => {
      const data = result[0].symbol[0].data;
      $infoText.text(data ? "Upload QR Code to Scan" : "Couldn't scan QR Code");
      if (!data) return;
      $("textarea").text(data);
      $form.find("img").attr("src", URL.createObjectURL(file));
      $wrapper.addClass("active");
    })
    .catch(() => {
      $infoText.text("Couldn't scan QR Code");
    });
};

$fileInp.on("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

$copyBtn.on("click", () => {
  const text = $("textarea").text();
  navigator.clipboard.writeText(text);
});

$form.on("click", () => $fileInp.click());
$closeBtn.on("click", () => $wrapper.removeClass("active"));