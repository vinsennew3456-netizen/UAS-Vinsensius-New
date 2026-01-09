// Navigasi Halaman
const navLinks = document.querySelectorAll("nav a, a[data-page]");
const pages = document.querySelectorAll(".page");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = link.getAttribute("data-page");
    pages.forEach((page) => {
      page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
    if (pageId === "transaction-list") {
      loadTransactions();
    }
  });
});

// Fungsi untuk memuat transaksi dari localStorage
function loadTransactions() {
  const transactionTableBody = document.querySelector(
    "#transactionTable tbody"
  );
  transactionTableBody.innerHTML = "";
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.forEach((transaction) => {
    const newRow = transactionTableBody.insertRow();
    newRow.insertCell(0).textContent = transaction.nama;
    newRow.insertCell(1).textContent = transaction.jumlah;
    newRow.insertCell(2).textContent = transaction.kategori;
  });
}

// Validasi Form Transaksi
const transactionForm = document.getElementById("transactionForm");
const namaTransaksi = document.getElementById("namaTransaksi");
const jumlah = document.getElementById("jumlah");
const kategori = document.getElementById("kategori");
const errorNama = document.getElementById("errorNama");
const errorJumlah = document.getElementById("errorJumlah");
const errorKategori = document.getElementById("errorKategori");

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Reset errors
  errorNama.textContent = "";
  errorJumlah.textContent = "";
  errorKategori.textContent = "";

  if (!namaTransaksi.value.trim()) {
    errorNama.textContent = "Nama Transaksi wajib diisi.";
    isValid = false;
  }
  if (!jumlah.value.trim()) {
    errorJumlah.textContent = "Jumlah wajib diisi.";
    isValid = false;
  }
  if (!kategori.value) {
    errorKategori.textContent = "Kategori wajib dipilih.";
    isValid = false;
  }

  if (isValid) {
    // Simpan ke localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
      nama: namaTransaksi.value,
      jumlah: jumlah.value,
      kategori: kategori.value,
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Reset form
    transactionForm.reset();
    alert("Transaksi berhasil disimpan!");
  }
});

// Form Login (sederhana, tanpa backend)
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login berhasil! (Simulasi)");
});

// Load transaksi saat halaman dimuat jika diperlukan
window.addEventListener("load", () => {
  if (
    document.getElementById("transaction-list").classList.contains("active")
  ) {
    loadTransactions();
  }
});
