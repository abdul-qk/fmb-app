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

$sql2 = "UPDATE tbl_users
        SET user_last_login = NOW()
        WHERE user_name = '$user'";

if (($result = mysqli_query($con, $sql)) && ($update = mysqli_query($con, $sql2))) {

    $row = mysqli_fetch_assoc($result);

    if ($row['user_power'] == 4 && $row['user_id'] != null) {
        $error = "Pass";
    } else if ($row['user_id'] == null) {
        $error =  "User not found. Try again!";
    } else if ($row['user_power'] != 4) {
        $error =  "You don't have access to this module! Please contact admin.";
    } else {
        $error =  "Error! Try Again";
    }

    $userList['user_id']        = $row['user_id'];
    $userList['user_name']      = $row['user_name'];
    $userList['user_fullname']  = $row['user_fullname'];
    $userList['user_power']     = $row['user_power'];
    $userList['error']          = $error;

    echo json_encode($userList);
} else {
    http_response_code(404);
}
