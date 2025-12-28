# 💎 Gacha Complexity Analysis

> **Analisis Perbandingan Efisiensi Algoritma Iteratif vs Rekursif pada Perhitungan Probabilitas Gacha.**

![Language](https://img.shields.io/badge/Language-JavaScript-yellow)
![Style](https://img.shields.io/badge/Style-Comic%20Pop-ff6b6b)
![Course](https://img.shields.io/badge/Course-Analisis%20Kompleksitas%20Algoritma-blue)

## 📖 Tentang Proyek
Aplikasi web ini dibuat sebagai **Tugas Besar Mata Kuliah Analisis Kompleksitas Algoritma (AKA)**. Tujuan utamanya adalah mensimulasikan dan menganalisis perbedaan performa (Time & Space Complexity) antara pendekatan **Iteratif** dan **Rekursif** dalam menghitung peluang mendapatkan item langka (SSR) pada game gacha.

Studi kasus yang diangkat adalah rumus probabilitas binomial:
$$P = 1 - (1 - rate)^n$$

Dimana:
- `rate` = Persentase peluang item (contoh: 0.6%)
- `n` = Jumlah percobaan (pulls)

## ✨ Fitur Utama
- **Custom Input:** Pengguna dapat mengatur Rate (%) dan Jumlah Pull (N).
- **Stress Test Benchmark:** Melakukan pengulangan eksekusi sebanyak **2000x** untuk mendapatkan pengukuran waktu yang presisi pada input kecil.
- **Stack Overflow Detection:** Mendeteksi batas memori browser saat algoritma Rekursif mengalami *crash* pada input N yang sangat besar.
- **Real-time Visualization:** Grafik perbandingan performa menggunakan **Chart.js**.

## 📸 Screenshots
| Tampilan Awal | Hasil Analisis (N=1000) | Rekursif Crash (N=15.000) |
|:---:|:---:|:---:|
| <img width="820" height="939" alt="image" src="https://github.com/user-attachments/assets/1293e0bc-8a6a-42cd-8494-c65a7c25301c" />
| ![Analysis](https://via.placeholder.com/300x200?text=Graph+Result) | ![Crash](https://via.placeholder.com/300x200?text=Stack+Overflow) |

## 🚀 Cara Menjalankan
Karena proyek ini berbasis web statis (HTML/CSS/JS), cara menjalankannya sangat mudah:

1. **Clone Repository**
   ```bash
   git clone [https://github.com/username-kalian/Gacha-Complexity-Analysis.git](https://github.com/username-kalian/Gacha-Complexity-Analysis.git)
