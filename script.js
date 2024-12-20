// Daftar video dan gambar
var videoList = ["1.mp4", "2.mp4", "3.mp4", "4.mp4", "6.mp4", "7.mp4", "8.mp4", "9.mp4", "10.mp4", "11.mp4"]; // Ganti dengan nama file video yang ada di folder
var imageList = ["Abu.jpg", "biru 2.jpg", "Biru.jpg", "coklat.jpg", "hijau.jpg", 
                 "hitam 2.jpg", "hitam.jpg", "kuning 2.jpg", "kuning.jpg", "merah 2.jpg", 
                 "merah.jpg", "orange.jpg", "pink 2.jpg", "pink.jpg", "ungu.jpg"]; // Ganti dengan nama file gambar yang ada di folder
var warnaList = ["Abu", "Biru", "Biru", "Coklat", "Hijau", 
                 "Hitam", "Hitam", "Kuning", "Kuning", "Merah", 
                 "Merah", "Orange", "Pink", "Pink", "Ungu"]; // Daftar warna sesuai dengan gambar

                 if ('speechSynthesis' in window) {
                    console.log('Speech Synthesis API is supported.');
                } else {
                    console.log('Speech Synthesis API is not supported in this browser.');
                }
                
                // Fungsi untuk mengeluarkan suara
                function speak(text) {
                    const utterance = new SpeechSynthesisUtterance(text); // Membuat objek untuk suara
                    utterance.lang = 'id-ID'; // Atur bahasa ke Bahasa Indonesia
                    speechSynthesis.speak(utterance); // Mengeluarkan suara
                }

                 // Daftar semua gambar yang akan digunakan dalam permainan
const colors = [
    { image: 'Abu.jpg', answerKey: 'ABU'},
    { image: 'biru 2.jpg', answerKey: 'BIRU'},
    { image: 'Biru.jpg', answerKey: 'BIRU'},
    { image: 'coklat.jpg', answerKey: 'COKLAT'},
    { image: 'hijau.jpg', answerKey: 'HIJAU'},
    { image: 'hitam 2.jpg', answerKey: 'HITAM'},
    { image: 'hitam.jpg', answerKey: 'HITAM'},
    { image: 'kuning 2.jpg', answerKey: 'KUNING'},
    { image: 'kuning.jpg', answerKey: 'KUNING'},
    { image: 'merah 2.jpg', answerKey: 'MERAH'},
    { image: 'merah.jpg', answerKey: 'MERAH'},
    { image: 'orange.jpg', answerKey: 'ORANGE'},
    { image: 'pink 2.jpg', answerKey: 'PINK'},
    { image: 'pink.jpg', answerKey: 'PINK'},
    { image: 'ungu.jpg', answerKey: 'UNGU'},
];

var gambarDitampilkan = []; // Array untuk menyimpan gambar yang sudah ditampilkan
var warnaDitampilkan = []; // Array untuk menyimpan warna yang sesuai dengan gambar
var currentIndex = 0; // Indeks gambar saat ini
var countdown; // Variabel untuk menyimpan interval countdown

// Event listener untuk tombol bermain
document.getElementById("tombol-bermain").addEventListener("click", function() {
    document.getElementById("halaman-1").style.display = "none";
    document.getElementById("halaman-2").style.display = "block";
});

// Event listener untuk tombol gowgow
document.getElementById("tombol-gowgow").addEventListener("click", function() {
    document.getElementById("halaman-2").style.display = "none";
    document.getElementById("halaman-3").style.display = "block";

    // Pilih video secara acak
    var videoRandom = videoList[Math.floor(Math.random() * videoList.length)];
    var audioElement = document.getElementById("suara");
    audioElement.src = videoRandom; // Atur sumber audio
    audioElement.play(); // Putar audio

    // Setelah audio selesai, mulai menampilkan gambar
    audioElement.onended = function() {
        console.log("Audio selesai diputar."); // Debugging
        document.getElementById("halaman-3").style.display = "none";
        document.getElementById("halaman-4").style.display = "block";

        // Acak urutan gambar
        acakGambar();

        // Mulai menampilkan gambar
        tampilkanGambar();
    };
});

// Fungsi untuk mengacak urutan gambar
function acakGambar() {
    for (let i = imageList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageList[i], imageList[j]] = [imageList[j], imageList[i]]; // Tukar elemen
    }
}

var kunciJawabanDitampilkan = []; // Array untuk menyimpan kunci jawaban yang sesuai

// Fungsi untuk menampilkan gambar secara berurutan
function tampilkanGambar() {
    if (currentIndex < imageList.length) {
        // Tampilkan gambar saat ini
        document.getElementById("gambar").src = imageList[currentIndex];
        console.log("Gambar ditampilkan: " + imageList[currentIndex]); // Debugging

        // Mengubah latar belakang menjadi FILE 2.JPG
        document.body.style.backgroundImage = "url('FILE 2.JPG')"; // Ganti dengan path yang sesuai
        document.body.style.backgroundSize = "cover"; // Mengatur gambar agar memenuhi area
        document.body.style.backgroundPosition = "center"; // Memusatkan gambar
        document.body.style.backgroundRepeat = "no-repeat"; // Menghindari pengulangan gambar

        // Simpan gambar yang ditampilkan
        gambarDitampilkan.push(imageList[currentIndex]);

        // Mencari kunci jawaban yang sesuai dengan gambar yang ditampilkan
        const color = colors.find(c => c.image === imageList[currentIndex]);
        if (color) {
            kunciJawabanDitampilkan.push(color.answerKey); // Simpan kunci jawaban
        }

        // Reset dan mulai hitungan mundur
        let timeLeft = 2; // Waktu tersisa dalam detik
        document.getElementById("time-left").textContent = "Waktu tersisa: " + timeLeft + " detik"; // Tampilkan waktu tersisa

        // Memanggil fungsi untuk mengeluarkan suara nama warna yang berbeda
        let differentColor;
        do {
            differentColor = getRandomColors(1, color.answerKey)[0]; // Pastikan tidak sama dengan warna yang benar
        } while (!differentColor); // Pastikan ada warna yang berbeda

        // Pindahkan pemanggilan speak ke sini agar suara diputar segera setelah gambar ditampilkan
        speak(differentColor.answerKey); // Membacakan nama warna yang berbeda

        // Set interval untuk hitungan mundur
        countdown = setInterval(function() {
            timeLeft--;
            document.getElementById("time-left").textContent = "Waktu tersisa: " + timeLeft + " detik"; // Perbarui tampilan waktu tersisa

            if (timeLeft <= 0) {
                clearInterval(countdown); // Hentikan interval ketika waktu habis
                currentIndex++; // Increment indeks untuk gambar berikutnya
                tampilkanGambar(); // Pindah ke gambar berikutnya
            }
        }, 800); // Update setiap detik
    } else {
    // Jika semua gambar sudah ditampilkan, tampilkan kunci jawaban
    tampilkanKunciJawaban();
    endGame(); // Jika tidak ada pertanyaan lagi, akhiri permainan
}
}

// Fungsi untuk mendapatkan warna acak yang tidak sama dengan warna yang sudah digunakan
function getRandomColors(num, excludeColor) {
const randomColors = [];
while (randomColors.length < num) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    // Pastikan warna tidak sama dengan warna yang benar dan tidak ada duplikat
    if (!randomColors.includes(randomColor) && randomColor.name !== excludeColor) {
        randomColors.push(randomColor);
    }
}
return randomColors;
}

// Fungsi untuk mendapatkan warna ```javascript
function getColorBackground(colorName) {
switch (colorName) {
    case 'Merah':
        return 'green';
    case 'Hijau':
        return 'blue';
    case 'Biru':
        return 'yellow';
    case 'Kuning':
        return 'purple';
    case 'Ungu':
        return 'orange';
    case 'Orange':
        return 'brown';
    case 'Coklat':
        return 'gray';
    case 'Abu-abu':
        return 'pink';
    case 'Pink':
        return 'black';
    case 'Hitam':
        return 'red';
    default:
        return 'white';
}
}


// Fungsi untuk menampilkan kunci jawaban
function tampilkanKunciJawaban() {
    console.log("Kunci jawaban yang ditampilkan: ", kunciJawabanDitampilkan); // Tampilkan kunci jawaban
    document.getElementById("halaman-4").style.display = "none"; // Sembunyikan halaman 4
    document.getElementById("halaman-5").style.display = "block"; // Tampilkan halaman 5


    // Tampilkan kunci jawaban
    displayAnswerKey();
}

// Fungsi untuk menampilkan kunci jawaban
function displayAnswerKey() {
    const answerKeyContainer = document.getElementById('answer-key');
    answerKeyContainer.innerHTML = `<h3>Kunci Jawaban:</h3><ul>${kunciJawabanDitampilkan.map(warna => `<li>${warna}</li>`).join('')}</ul>`;
    answerKeyContainer.style.display = 'block'; // Tampilkan kunci jawaban
}

