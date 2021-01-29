<?php

/** A single snippet, representing a. */
class Snippet {
    // DB table name
    public const DB_TABLE = "hp_snippets";

    /** The ID of the snippet. */
    public $id;
    /** The */
    public $title;
    public $content;
    public $img;
    public $time;
}