<?php
/**
 * Midex theme functions.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MIDEX_VERSION', '3.0.0' );

require get_template_directory() . '/inc/post-types.php';
require get_template_directory() . '/inc/meta-fields.php';
require get_template_directory() . '/inc/brand.php';
require get_template_directory() . '/inc/assets.php';
require get_template_directory() . '/inc/helpers.php';
require get_template_directory() . '/inc/blocks.php';
require get_template_directory() . '/inc/home-sections.php';
require get_template_directory() . '/inc/patterns.php';
require get_template_directory() . '/inc/header-footer.php';
require get_template_directory() . '/inc/product-pages.php';
require get_template_directory() . '/inc/site-setup.php';

/**
 * Enqueue theme styles (Tailwind handles most styling).
 */
function midex_enqueue_styles() {
	wp_enqueue_style(
		'midex-style',
		get_stylesheet_uri(),
		array( 'midex-tailwind' ),
		MIDEX_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'midex_enqueue_styles', 15 );

/**
 * Register theme supports and menus.
 */
function midex_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'midex' ),
			'footer'  => __( 'Footer Menu', 'midex' ),
		)
	);
}
add_action( 'after_setup_theme', 'midex_setup' );

/**
 * Register block pattern category.
 */
function midex_register_pattern_category() {
	register_block_pattern_category(
		'midex',
		array(
			'label' => __( 'Midex', 'midex' ),
		)
	);
}
add_action( 'init', 'midex_register_pattern_category' );

/**
 * Pre-fill contact page quote context from query string.
 *
 * @param string $content Post content.
 * @return string
 */
function midex_contact_quote_context( $content ) {
	if ( ! is_page( 'contact' ) || empty( $_GET['item'] ) ) {
		return $content;
	}

	$item = sanitize_text_field( wp_unslash( $_GET['item'] ) );
	$note = sprintf(
		'<div class="midex-contact-card"><p><strong>%s</strong> %s</p></div>',
		esc_html__( 'Quote request for:', 'midex' ),
		esc_html( $item )
	);

	return $note . $content;
}
add_filter( 'the_content', 'midex_contact_quote_context', 5 );
