const tanggal = new Date();
const listHari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
// Fungsi untuk mendapatkan nama hari
function getDayName(date) {
  let dayIndex = date.getDay(); // Mendapatkan nomor hari (0-6)
  return listHari[dayIndex];
}

// Contoh penggunaan
setInterval(() => {
  let sekarang = new Date();
  let namaHari = getDayName(sekarang);
  let jam = sekarang.getHours();
  if (jam < 10) {
    jam = "0" + sekarang.getHours();
  }
  let menit = sekarang.getMinutes();
  if (menit < 10) {
    menit = "0" + sekarang.getMinutes();
  }
  let detik = sekarang.getSeconds();
  if (detik < 10) {
    detik = "0" + sekarang.getSeconds();
  }
  let widgetHari = namaHari + ", " + jam + ":" + menit + ":" + detik;
  let day = document.getElementById("hari");
  let gantiUcapan = document.getElementById("ucapan");
  let rtc = document.getElementById("rtc");

  day.innerText = widgetHari;
  if (jam < 5) {
  } else if (jam < 10) {
    gantiUcapan.innerText = "Selamat pagi";
    rtc.classList.add("widgetBgMorning");
  } else if (jam < 16) {
    gantiUcapan.innerText = "Selamat siang";
    rtc.classList.add("widgetBgAfternoon");
  } else if (jam < 18) {
    gantiUcapan.innerText = "Selamat sore";
    rtc.classList.add("widgetBgSunset");
  } else if (jam < 24) {
    gantiUcapan.innerText = "Selamat malam";
    rtc.classList.add("widgetBgNight");
  }
}, 1000);
