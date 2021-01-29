<?php
include_once 'envreader.php';
include_once 'snippet.php';

/** The connection against the database. Configuration is done via a .env file located at the HP root. */
class Database {
    
    /** Configured host. */
    private $host;
    /** The user name for the DB. */
    private $username;
    /** The PWD for the DB. */
    private $password;

    public function __construct() {
        // extract the data from the .env file
        (new DotEnv(__DIR__ . '/../.env'))->load();
        $this->host = getenv('DATABASE_DNS');
        $this->username = getenv('DATABASE_USER');
        $this->password = getenv('DATABASE_PASSWORD');
    }

    private function getConnection(){
        try{
            $conn = new PDO($this->host, $this->username, $this->password);
            $conn->exec("set names utf8");

            return $conn;
        } catch(PDOException $exception){
            die("Database could not be connected: " . $exception->getMessage());
        }
    }

    public function getAllSnippets() {
        // get the DB connection
        $conn = $this->getConnection();

        try {
            $sqlQuery = "SELECT id, title, content, img, time FROM " . Snippet::DB_TABLE . "";
            $stmt = $conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_CLASS, "snippet");
        } finally {
            // close the DB connection
            $conn = null;
        }
    }
}