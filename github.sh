#!/bin/bash

# Fungsi untuk menampilkan isi folder saat ini
function display_folders() {
    echo "Folder yang tersedia di direktori saat ini:"
    # Menampilkan hanya folder yang ada di direktori saat ini
    select folder in */ ".. (Kembali ke folder sebelumnya)" "Pilih folder ini"; do
        if [ "$folder" == "Pilih folder ini" ]; then
            echo "Anda memilih folder: $(pwd)"
            break
        elif [ "$folder" == ".. (Kembali ke folder sebelumnya)" ]; then
            cd ..
            display_folders
            return
        elif [ -n "$folder" ]; then
            echo "Masuk ke folder: $folder"
            cd "$folder"
            display_folders
            return
        else
            echo "Pilihan tidak valid, coba lagi."
        fi
    done
}

# Menampilkan pilihan untuk menambahkan file
echo "Pilih opsi:"
echo "1) Tambah semua perubahan"
echo "2) Tambah file dari folder tertentu"
read -p "Masukkan pilihan (1/2): " choice

if [ "$choice" -eq 1 ]; then
    # Tambahkan semua perubahan
    git add .
elif [ "$choice" -eq 2 ]; then
    # Mulai dari direktori saat ini dan biarkan pengguna memilih folder
    display_folders
    # Menambahkan semua file dari folder yang dipilih ke staging area
    git add .
else
    echo "Pilihan tidak valid. Skrip dihentikan."
    exit 1
fi

# Commit dengan pesan
read -p "Masukkan pesan commit: " commit_message
git commit -m "$commit_message"

# Tambahkan remote repository (ganti <URL-Repo-Anda> dengan URL repositori)
git remote add origin <URL-Repo-Anda>

# Push ke branch main
git push -u origin main
