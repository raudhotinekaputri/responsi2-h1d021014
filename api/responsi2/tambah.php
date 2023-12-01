<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Terima data dari mobile
$name = trim($data['name']);
$description = trim($data['description']);
$quantity = intval($data['quantity']); // pastikan quantity dalam bentuk integer

http_response_code(201);

if ($name != '' && $description != '' && is_int($quantity)) {
    $query = mysqli_query($koneksi, "INSERT INTO inventory (name, description, quantity) VALUES ('$name', '$description', $quantity)");

    if ($query) {
        $pesan = true;
    } else {
        $pesan = false;
    }
} else {
    $pesan = false;
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>
