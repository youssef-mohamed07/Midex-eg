<?php
/**
 * Block patterns.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme block patterns.
 */
function midex_register_block_patterns() {
	$patterns_dir = get_template_directory() . '/patterns/';

	if ( ! is_dir( $patterns_dir ) ) {
		return;
	}

	foreach ( glob( $patterns_dir . '*.php' ) as $file ) {
		$pattern = include $file;

		if ( is_array( $pattern ) && ! empty( $pattern['content'] ) ) {
			register_block_pattern( $pattern['slug'], $pattern );
		}
	}
}
add_action( 'init', 'midex_register_block_patterns' );
