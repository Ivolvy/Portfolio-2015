<?php
/*Get images path and name from a given folder*/
$images = glob($_POST["folder"].'/*.{jpg,png,gif}', GLOB_BRACE);
echo json_encode($images);
die;