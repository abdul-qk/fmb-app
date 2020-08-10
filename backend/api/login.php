<?php

/**
 * Returns the list of policies.
 */
require 'database.php';

$user = $_GET['username'];
$pass = $_GET['pass'];

$userList = [];
$sql = "SELECT user_id, user_name, user_pwd, user_fullname, user_power 
        FROM tbl_users
        WHERE user_name = '$user'
        AND user_pwd = '$pass'
        LIMIT 1";

if ($result = mysqli_query($con, $sql)) {

    $row = mysqli_fetch_assoc($result);

    $userList['user_id']        = $row['user_id'];
    $userList['user_name']      = $row['user_name'];
    $userList['user_fullname']  = $row['user_fullname'];
    $userList['user_power']     = $row['user_power'];

    echo json_encode($userList);
} else {
    http_response_code(404);
}
