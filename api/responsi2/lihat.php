<?php
require 'koneksi.php';

$data = [];
$id = $_GET['id'];
$query = mysqli_query($koneksi, "SELECT * FROM inventory WHERE id ='$id'");
$jumlah = mysqli_num_rows($query);

if ($jumlah == 1) {
    $row = mysqli_fetch_object($query);
    $data = $row;
}

echo json_encode($data);
echo mysqli_error($koneksi);
?>
