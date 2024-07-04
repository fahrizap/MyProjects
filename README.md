# Mersia
## 1.1 Latar Belakang
Mersia merupakan singkatan dari Media Apresiasi Indonesia, dibuat oleh saya sendiri Fahriza yang semula diperuntukkan untuk memenuhi tugas UAS mata kuliah Algoritma dan pemrograman. Namun saya akan terus mengembangkan web Mersia ini. Seperti yang kita rasakan, media sosial kurang menyorot orang-orang yang menginspirasi dan hal-hal positif lainnya, kebanyakan orang-orang yang sudah berjasa dan memberi contoh baik kurang dihargai dan dilupakan begitu saja, tentu hal tersebut sangat disayangkan. Yang mendominasi media sosial atau bahkan stasiun televisi lebih sering menayangkan hal yang tidak penting atau bahkan hal negatif, sehingga hal negatif tersebut lama kelamaan akan dinormalisasiakan. Contohnya pernah diadakan sebuah ajang penghargaan yang memberikan penghargaan kepada salah satu orang yang viral karena slogannya, atau acara televisi yang lebih suka mengundang narasumber yang kurang bermutu. Seperti namanya, Mersia adalah web media sosial yang berisi konten-konten positif dan menginspirasi, disana kita dapat terinspirasi, menghargai dan mengapresiasi dari orang-orang yang membawa hal positif seperti contohnya Pandawara. Mersia memiliki fitur updown dan dropdown vote untuk memfilter konten positif dan negatif, sehingga web ini akan terus diperuntukkan untuk konten-konten yang positif, menginspirasi, dan patut diapresiasi.

## 1.2 Deskripsi Teknologi Informasi
Website ini menggunakan HTML, CSS, dan Javascript untuk membangun sisi Front end nya. Sedangkan backendnya menggunakan NodeJs, dengan modul http dan DBMS MySQL. Sisi frontend (client) akan memfetching data menggunakan fetch API dan protokol komunikasi HTTP ke backend (server) kemudian akan dikelola untuk memberikan response yang dibutuhkan.

## 1.3 Merk
- Nama: Mersia
- Singkatan: Media Apresiasi Indonesia
- Tujuan: Membangun sebuah media yang dapat menginspirasi dan mengapresiasi orang-orang.

## 2 UI/UX
## 2.1 Register
Membuat akun baru menggunakan email, password, dan username kemudian POST data ke server
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/register.png)

## 2.2 Login
Masuk ke akun yang sudah ada sebelumnya
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/login.png)

## 2.3 Home
Pada tampilan utama terdapat 3 bagian
- bagian kiri: sidebar, list komunitas
- bagian tengah: konten utama (home) berisi postingan-postingan yang sudah diupload
- bagian kanan: widget, list teman
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/content-home.png)

## 2.4 Cari teman
Menggunakan perintah query ke database mencari akun yang usernamenya mengangung huruf dari input
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/content-teman.png)

## 2.5 Buat postingan
mengupload (POST) postingan dan postingan tersebut akan di GET kembali di home
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/content-buat-postingan.png)

## 2.6 Profil
Berisi informasi akun login
![Contoh](https://github.com/fahrizap/MyProjects/blob/main/ui-ux/content-profil.png)



