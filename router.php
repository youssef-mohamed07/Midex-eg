<?php
/**
 * Router for PHP built-in server (pretty permalinks).
 *
 * @package Midex
 */

$root = __DIR__;
$uri  = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
$path = $root . $uri;

if ( $uri !== '/' && is_file( $path ) ) {
	return false;
}

require $root . '/index.php';
