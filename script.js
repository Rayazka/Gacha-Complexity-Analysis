// SETUP GRAFIK (Chart.js)
let myChart = null;

// Fungsi untuk membuat/inisialisasi grafik awal
function initChart() {
    const ctx = document.getElementById('complexityChart').getContext('2d');
    
    // Konfigurasi Chart 
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Iteratif (Looping)',
                    data: [],
                    borderColor: '#4ecdc4',
                    backgroundColor: '#4ecdc4',
                    borderWidth: 4,
                    pointRadius: 6,
                    tension: 0,
                    fill: false
                },
                {
                    label: 'Rekursif (Fungsi)',
                    data: [],
                    borderColor: '#ff6b6b',
                    backgroundColor: '#ff6b6b',
                    borderWidth: 4,
                    pointRadius: 6,
                    tension: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: { color: '#000', font: { size: 14, weight: 'bold' } }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Jumlah Pull (N)', color: '#000', font: { weight: 'bold' } },
                    grid: { color: '#ccc', lineWidth: 2 }
                },
                y: {
                    title: { display: true, text: 'Total Waktu (ms)', color: '#000', font: { weight: 'bold' } },
                    grid: { color: '#ccc', lineWidth: 2 },
                    beginAtZero: true
                }
            }
        }
    });
}

// Panggil fungsi init saat halaman dimuat
document.addEventListener("DOMContentLoaded", initChart);


// LOGIKA MATEMATIKA

// Algoritma Iteratif
function hitungPeluangIteratif(rateDesimal, n) {
    let peluangGagal = 1 - rateDesimal;
    let totalGagal = 1;
    for(let i = 0; i < n; i++) {
        totalGagal *= peluangGagal;
    }
    return 1 - totalGagal;
}

// Algoritma Rekursif
function hitungPeluangRekursif(peluangGagal, n) {
    if (n === 0) return 1;
    return peluangGagal * hitungPeluangRekursif(peluangGagal, n - 1);
}


// CONTROLLER

function jalankanAnalisis() {
    const rateInput = document.getElementById('rate').value;
    const pullsInput = document.getElementById('pulls').value;
    const outputContainer = document.getElementById('outputContainer');
    const resultText = document.getElementById('resultPercentage');
    const timeIterText = document.getElementById('timeIteratif');
    const timeRekurText = document.getElementById('timeRekursif');
    const errorMsg = document.getElementById('errorMsg');

    // Validasi Input
    if (rateInput === '' || pullsInput === '') {
        alert("Harap isi semua kolom input!");
        return;
    }

    // Parsing Input
    const rate = parseFloat(rateInput) / 100;
    const n = parseInt(pullsInput);
    const peluangGagal = 1 - rate;

    // Reset Error & Tampilkan Kotak Output
    errorMsg.innerText = "";
    outputContainer.classList.remove('hidden');

    const ITERATION_LIMIT = 2000; // Mengulang rumus 2000 kali biar berasa berat

    // 1. UJI ITERATIF
    const startIter = performance.now();
    let hasilIter = 0;
    for(let i=0; i<ITERATION_LIMIT; i++){
        hasilIter = hitungPeluangIteratif(rate, n);
    }
    const endIter = performance.now();
    const durationIter = (endIter - startIter).toFixed(4);

    // 2. UJI REKURSIF
    let durationRekur = 0;
    let hasilRekur = 0;

    try {
        const startRekur = performance.now();
        // Hati-hati: Kita loop pemanggilan rekursifnya
        for(let i=0; i<ITERATION_LIMIT; i++){
            const totalGagalRekur = hitungPeluangRekursif(peluangGagal, n);
            hasilRekur = 1 - totalGagalRekur;
        }
        const endRekur = performance.now();
        durationRekur = (endRekur - startRekur).toFixed(4);
        
        timeRekurText.innerText = durationRekur + " ms";
        timeRekurText.style.color = "black";
    } catch (error) {
        console.error("Stack Overflow:", error);
        durationRekur = null; // Error code
        timeRekurText.innerText = "CRASH (Stack Overflow)";
        timeRekurText.style.color = "red";
        errorMsg.innerText = `⚠️ PERINGATAN: Rekursif gagal pada N=${n}. Stack Overflow terjadi karena memori penuh.`;
    }

    // Update Teks Hasil
    resultText.innerText = (hasilIter * 100).toFixed(5) + "%";
    timeIterText.innerText = durationIter + " ms";

    // Update Grafik
    updateChartData("N=" + n, durationIter, durationRekur);
}

function updateChartData(label, valIter, valRekur) {

    // Tambah Label (Sumbu X)
    myChart.data.labels.push(label);

    // Tambah Data Iteratif (Sumbu Y1)
    myChart.data.datasets[0].data.push(valIter);

    // Tambah Data Rekursif (Sumbu Y2)
    myChart.data.datasets[1].data.push(valRekur);

    // Perintahkan Chart untuk render ulang
    myChart.update();
}

function resetData() {
    // Hapus isi array data di dalam object chart
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    myChart.data.datasets[1].data = [];
    
    // Update tampilan kosong
    myChart.update();
    
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('pulls').value = "100";
}