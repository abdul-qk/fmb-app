<?php

/**
 * Returns the list of policies.
 */
require '../api/database.php';
require_once '../api/date.php';

$sql_fri = "AND tiffinfreq <> 'F'";
if (date("l", strtotime($dateformatted)) == "Friday") {
    $sql_fri = "";
}

$userlist = [];

$sql = "SELECT COUNT(debcode) as count FROM tbl_registrations
        WHERE tiffinfreq = 'F'
        AND debcode IN (SELECT debcode FROM tbl_scan WHERE DATE(scan_time) = '$dateformatted')";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $userlist[$i]['count']        = $row['count'];
        $i++;
    }

    echo json_encode($userlist);
} else {
    http_response_code(404);
}
