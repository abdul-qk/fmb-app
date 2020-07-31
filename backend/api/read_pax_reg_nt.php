<?php

/**
 * Returns the list of policies.
 */
require 'database.php';
require_once 'date.php';

$sql_fri = "AND tiffinfreq <> 'F'";
if (date("l", strtotime($dateformatted)) == "Friday") {
    $sql_fri = "";
}

$userlist = [];

$sql = "SELECT packqty, count(packqty) as packqtyCount from tbl_registrations 
        WHERE tiffinsts LIKE 'NOT TAKING'
        AND confirmed = 1
        AND debcode IN (SELECT debcode FROM tbl_scan WHERE DATE(scan_time) = '$dateformatted') $sql_fri
        Group by packqty";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $userlist[$i]['packqty']        = $row['packqty'];
        $userlist[$i]['packqtyCount']   = $row['packqtyCount'];
        $i++;
    }

    echo json_encode($userlist);
} else {
    http_response_code(404);
}
