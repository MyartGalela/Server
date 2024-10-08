#!/bin/bash

# Fungsi untuk menampilkan perubahan secara otomatis
function detect_changes() {
    # Menampilkan perubahan yang terdeteksi
    echo "Perubahan yang terdeteksi:"
    git status -s

    # Buat pesan commit otomatis berdasarkan perubahan yang ada
    local commit_message=""
    local modified_files=$(git diff --name-only)
    local new_files=$(git ls-files --others --exclude-standard)
    local deleted_files=$(git ls-files --deleted)

    # Tambahkan pesan untuk file yang dimodifikasi
    if [ -n "$modified_files" ]; then
        commit_message+="Modified: $(echo $modified_files | tr '\n' ', ') "
    fi

    # Tambahkan pesan untuk file baru
    if [ -n "$new_files" ]; then
        commit_message+="Added: $(echo $new_files | tr '\n' ', ') "
    fi

    # Tambahkan pesan untuk file yang dihapus
    if [ -n "$deleted_files" ]; then
        commit_message+="Deleted: $(echo $deleted_files | tr '\n' ', ') "
    fi

    # Jika tidak ada perubahan
    if [ -z "$commit_message" ]; then
        echo "Tidak ada perubahan yang terdeteksi."
        exit 0
    fi

    # Commit dengan pesan otomatis
    echo "Pesan commit otomatis: $commit_message"
    echo $commit_message
}

# Menampilkan pilihan untuk menambahkan file
echo "Pilih opsi:"
echo "1) Tambah semua perubahan"
echo "2) Tambah file dari folder tertentu"
echo "3) Deteksi dan commit otomatis"
read -p "Masukkan pilihan (1/2/3): " choice

if [ "$choice" -eq 1 ]; then
    # Tambahkan semua perubahan
    git add .
    read -p "Masukkan pesan commit: " commit_message
elif [ "$choice" -eq 2 ]; then
    # Mulai dari direktori saat ini dan biarkan pengguna memilih folder
    display_folders
    # Menambahkan semua file dari folder yang dipilih ke staging area
    git add .
    read -p "Masukkan pesan commit: " commit_message
elif [ "$choice" -eq 3 ]; then
    # Deteksi perubahan dan buat commit otomatis
    git add -A # Tambahkan semua perubahan ke staging area
    commit_message=$(detect_changes)
else
    echo "Pilihan tidak valid. Skrip dihentikan."
    exit 1
fi

# Commit dengan pesan
git commit -m "$commit_message"

# Pull dari repository remote terlebih dahulu untuk menghindari konflik
git pull origin main

# Push ke branch main
git push origin main
