<?php
require 'koneksi.php';

$pesan = [];
$id = $_GET['id'];
$query = mysqli_query($koneksi, "DELETE FROM inventory WHERE id='$id'");

if ($query) {
    http_response_code(201);
    $pesan['status'] = 'sukses';
} else {
    http_response_code(422);
    $pesan['status'] = 'gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
?>
