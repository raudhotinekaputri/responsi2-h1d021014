<?php
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Terima data dari mobile
$id = trim($data['id']);
$name = trim($data['name']);
$description = trim($data['description']);
$quantity = isset($data['quantity']) ? (int)$data['quantity'] : 0;

http_response_code(201);

if ($name != '' && $description != '') {
    $query = mysqli_query($koneksi, "UPDATE inventory SET name='$name', description='$description', quantity='$quantity' WHERE id='$id'");

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
