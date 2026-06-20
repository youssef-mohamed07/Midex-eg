<?php
/**
 * Enqueue Midex brand fonts and Tailwind styles.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme asset URL helper.
 *
 * @param string $path Path relative to theme assets/.
 * @return string
 */
function midex_asset_url( $path ) {
	return get_template_directory_uri() . '/assets/' . ltrim( $path, '/' );
}

/**
 * Enqueue Tailwind and fonts.
 */
function midex_enqueue_brand_assets() {
	wp_enqueue_style(
		'midex-fonts-poppins',
		'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'midex-tailwind',
		midex_asset_url( 'css/tailwind.css' ),
		array( 'midex-fonts-poppins' ),
		MIDEX_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'midex_enqueue_brand_assets', 10 );

/**
 * Site favicon from Midex assets.
 */
function midex_site_icon() {
	echo '<link rel="icon" href="' . esc_url( midex_asset_url( 'images/brand/favicon.svg' ) ) . '" type="image/svg+xml" />' . "\n";
}
add_action( 'wp_head', 'midex_site_icon', 5 );

/**
 * Custom logo defaults.
 */
function midex_custom_logo_setup() {
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 80,
			'width'       => 220,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
}
add_action( 'after_setup_theme', 'midex_custom_logo_setup' );

/**
 * Set custom logo on brand sync if not set.
 */
function midex_maybe_set_custom_logo() {
	if ( get_theme_mod( 'custom_logo' ) ) {
		return;
	}

	$logo_path = get_template_directory() . '/assets/images/brand/logo-dark.png';

	if ( ! file_exists( $logo_path ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$upload = wp_upload_bits( 'midex-logo-dark.png', null, file_get_contents( $logo_path ) );

	if ( ! empty( $upload['error'] ) ) {
		return;
	}

	$attachment_id = wp_insert_attachment(
		array(
			'post_title'     => 'Midex Logo',
			'post_mime_type' => 'image/png',
			'post_status'    => 'inherit',
			'guid'           => $upload['url'],
		),
		$upload['file']
	);

	if ( ! is_wp_error( $attachment_id ) ) {
		wp_generate_attachment_metadata( $attachment_id, $upload['file'] );
		set_theme_mod( 'custom_logo', $attachment_id );
	}
}
