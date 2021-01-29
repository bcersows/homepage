<?php

include_once '../database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if(isset($_GET['tag'])) {
    $tag = $_GET['tag'];

}

// init DB
$database = new Database();

// get all snippets
$all_snippets= $database->getAllSnippets();

// convert to JSON and return
echo json_encode($all_snippets);