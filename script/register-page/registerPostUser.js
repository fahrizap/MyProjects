let registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", function () {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!username) {
    alert("Username harus diisi");
    return;
  } else if (!email) {
    alert("Email harus diisi");
    return;
  } else if (!password) {
    alert("Password harus diiisi");
    return;
  }
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "login.html";
      } else {
        alert("Registrasi gagal atau email dan username sudah digunakan");
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert("Terjadi kesalahan pada server");
    });
});
