<?php
/*Get images path and name from a given folder*/

$images = $_POST['images'];

//most recent are first in the array
function sort_by_mtime($file1,$file2) {
    $time1 = filemtime($file1);
    $time2 = filemtime($file2);
    if ($time1 == $time2) {
        return 0;
    }
    return ($time1 > $time2) ? 1 : -1;
}

usort($images,"sort_by_mtime");

echo json_encode($images);
die;