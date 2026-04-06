$(".start-order").click(function (e) {
  e.preventDefault(); // 🔥 important (form submit reload rokega)

  let value = $("#editResult").val();

  // ✅ empty handle
  if (!value || value.trim() === "") {
    value = 0;
  }

  // ✅ number me convert
  value = Number(value);

  // ✅ update label
  $("#ketQua").text("Next result: " + value);

  console.log("Result:", value);
});