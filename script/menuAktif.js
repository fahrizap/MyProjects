document.addEventListener("DOMContentLoaded", (event) => {
  const menuItems = document.querySelectorAll(".menu-button");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Hapus kelas 'active' dari semua elemen
      menuItems.forEach((el) => el.classList.remove("active"));

      // Tambahkan kelas 'active' ke elemen yang diklik
      this.classList.add("active");
    });
  });
});
