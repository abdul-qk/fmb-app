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

$sql = "SELECT packqty, count(packqty) AS packqtyCount
        FROM tbl_scan s
        LEFT JOIN tbl_registrations r ON r.debcode = s.debcode
        WHERE s.debcode
        IN (
            SELECT r.debcode
            FROM tbl_registrations r
            WHERE confirmed = 0 OR tiffinsts NOT LIKE 'taking'
        )
        AND DATE(scan_time) = '$dateformatted'
        GROUP BY packqty";

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
