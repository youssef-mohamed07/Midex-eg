<?php
/**
 * Theme image asset discovery and helpers.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Absolute path to theme images directory.
 *
 * @return string
 */
function midex_images_path() {
	return get_template_directory() . '/assets/images';
}

/**
 * List image files in a subdirectory (relative to assets/images).
 *
 * @param string $subdir Subdirectory e.g. "events".
 * @return array<int, string> Relative paths like "images/events/foo.jpg".
 */
function midex_list_images( $subdir = '' ) {
	$base = midex_images_path();
	$dir  = $subdir ? trailingslashit( $base ) . ltrim( $subdir, '/' ) : $base;

	if ( ! is_dir( $dir ) ) {
		return array();
	}

	$extensions = array( 'jpg', 'jpeg', 'png', 'webp', 'gif', 'svg' );
	$files      = array();

	foreach ( glob( trailingslashit( $dir ) . '*', GLOB_NOSORT ) as $path ) {
		if ( ! is_file( $path ) ) {
			continue;
		}

		$ext = strtolower( pathinfo( $path, PATHINFO_EXTENSION ) );

		if ( ! in_array( $ext, $extensions, true ) ) {
			continue;
		}

		$relative = 'images/' . ( $subdir ? trim( $subdir, '/' ) . '/' : '' ) . basename( $path );
		$files[]  = $relative;
	}

	sort( $files );

	return $files;
}

/**
 * Human-readable label from image filename.
 *
 * @param string $relative Relative image path.
 * @return string
 */
function midex_image_label( $relative ) {
	$basename = pathinfo( $relative, PATHINFO_FILENAME );
	$basename = preg_replace( '/^(product|partner|client|event|slide)-/', '', $basename );
	$basename = preg_replace( '/-\d+$/', '', $basename );
	$basename = str_replace( array( '-', '_' ), ' ', $basename );

	return ucwords( trim( $basename ) );
}

/**
 * Known titles for product images (fallback to filename label).
 *
 * @param string $relative Relative path.
 * @return string
 */
function midex_product_title( $relative ) {
	$map = array(
		'images/products/product-1724113383.jpg'   => 'Automatic Orbital welding',
		'images/products/product-1725277641.webp'  => 'Sanitary Centrifugal Self-Priming Pump',
		'images/products/product-1725277634.jpg'   => 'Sanitary Non-Self Priming Pump',
		'images/products/product-1725239313.jpeg'  => 'Hygienic UV Unit',
		'images/products/product-1725239365.jpg'   => 'Sanitary Vent Filter Housing',
		'images/products/product-1725277406.webp'  => 'Reverse Osmosis (RO) double pass station',
		'images/products/product-1725277497.webp'  => 'Super-Heated Water Sanitization',
		'images/products/product-1725238681.webp'  => 'Sanitary Drain',
	);

	return $map[ $relative ] ?? midex_image_label( $relative );
}

/**
 * Known titles for service images.
 *
 * @param string $relative Relative path.
 * @return string
 */
function midex_service_title( $relative ) {
	$map = array(
		'images/services/mechanical-polishing.png'  => 'Mechanical polishing',
		'images/services/mirror-finish.png'         => 'Mirror finish',
		'images/services/pickling-passivation.png'  => 'Pickling and passivation',
		'images/services/bore-scoping.png'          => 'Bore scoping',
		'images/services/orbital-welding.png'       => 'Orbital Welding',
		'images/services/roughness-test.png'        => 'Roughness test',
		'images/services/spray-ball.png'            => 'Spray Ball Coverage Test',
		'images/services/passivation-test.png'      => 'Passivation Test',
		'images/services/welding-docs.png'          => 'Welding documentation',
	);

	return $map[ $relative ] ?? midex_image_label( $relative );
}

/**
 * Service excerpt by slug.
 *
 * @param string $relative Relative path.
 * @return string
 */
function midex_service_excerpt( $relative ) {
	$slug = pathinfo( $relative, PATHINFO_FILENAME );

	$map = array(
		'mechanical-polishing'  => 'Refining stainless steel surfaces to achieve a smooth hygienic finish.',
		'mirror-finish'         => 'Meticulous multi-step polishing for mirror-grade stainless steel.',
		'pickling-passivation'  => 'Remove contaminants and restore corrosion resistance.',
		'bore-scoping'          => 'Internal pipe inspection with flexible borescope technology.',
		'orbital-welding'       => 'Automated circular welding for validated hygienic systems.',
		'roughness-test'        => 'Surface smoothness assessment against pharma standards.',
		'spray-ball'            => 'CIP spray ball coverage verification inside tanks.',
		'passivation-test'      => 'Chemical validation for corrosion protection.',
		'welding-docs'          => 'WPS, PQR, and complete inspection records.',
	);

	return $map[ $slug ] ?? __( 'Professional hygienic process service from Midex.', 'midex' );
}

/**
 * Partner display name.
 *
 * @param string $relative Relative path.
 * @return string
 */
function midex_partner_name( $relative ) {
	$map = array(
		'images/partners/partner-1755761833.png'  => 'GEA',
		'images/partners/partner-1755701549.png'  => 'HRS',
		'images/partners/partner-1755771798.png'  => 'EVOGUARD',
		'images/partners/partner-1756043795.png'  => 'Burkert',
		'images/partners/partner-1756043967.png'  => 'Valex',
		'images/partners/partner-1756044128.jpeg' => 'SenTec',
		'images/exclusive/sing-tao.png'           => 'SING TAO',
		'images/exclusive/truvia.png'             => 'Truvia',
		'images/exclusive/eternal-water.png'      => 'Eternal Water',
	);

	return $map[ $relative ] ?? midex_image_label( $relative );
}

/**
 * Hero slide copy keyed by image path.
 *
 * @return array<string, array<string, string>>
 */
function midex_hero_slide_meta() {
	return array(
		'images/hero/slide-1.png' => array(
			'title' => __( 'Welcome to MIDEX', 'midex' ),
			'text'  => __( 'Midex is a specialized engineering company serving the pharmaceutical, food, and cosmetics industries. We provide purified water systems, WFI storage and distribution, and hygienic process controls.', 'midex' ),
			'btn1'  => __( 'About Us', 'midex' ), 'btn1url' => home_url( '/about-us/' ),
			'btn2'  => __( 'Our Services', 'midex' ), 'btn2url' => home_url( '/products/' ),
		),
		'images/hero/slide-2.png' => array(
			'title' => __( 'Midex’s Areas of Expertise', 'midex' ),
			'text'  => __( 'Compliance with FDA, ISPE, ASME BPE, and EHEDG. Turnkey projects that provide reliable, efficient, and safe solutions for critical operations.', 'midex' ),
			'btn1'  => __( 'About Us', 'midex' ), 'btn1url' => home_url( '/about-us/' ),
			'btn2'  => __( 'Our Services', 'midex' ), 'btn2url' => home_url( '/solutions/group/systems/' ),
		),
		'images/hero/slide-3.png' => array(
			'title' => __( 'Engineered for Pharmaceutical Excellence', 'midex' ),
			'text'  => __( 'From purified water stations to orbital welding and hygienic installations — validated systems built to GMP standards.', 'midex' ),
			'btn1'  => __( 'Contact Us', 'midex' ), 'btn1url' => home_url( '/contact/' ),
			'btn2'  => __( 'View Products', 'midex' ), 'btn2url' => home_url( '/products/' ),
		),
	);
}

/**
 * News cards from project images (events + products not in main product grid).
 *
 * @return array<int, array<string, string>>
 */
function midex_get_news_items() {
	$items = array(
		array(
			'title'   => __( 'Delta Care Purified Water Station', 'midex' ),
			'date'    => 'Jul 9, 2024',
			'excerpt' => __( 'Design and execution of a Reverse Osmosis purified water station.', 'midex' ),
			'image'   => 'images/news/news-1725286541.webp',
		),
		array(
			'title'   => __( 'VACSERA Upgraded RO-EDI Station', 'midex' ),
			'date'    => 'Sep 2, 2024',
			'excerpt' => __( 'Successfully upgraded the RO-EDI purified water station capacity.', 'midex' ),
			'image'   => 'images/news/news-1725287028.webp',
		),
		array(
			'title'   => __( 'Future Pharma Installations Success', 'midex' ),
			'date'    => 'Sep 2, 2024',
			'excerpt' => __( 'Major success implementing compressed air and pure gas systems.', 'midex' ),
			'image'   => 'images/news/news-1725287019.webp',
		),
		array(
			'title'   => __( 'MEVAC Five — Water & Steam Distribution', 'midex' ),
			'date'    => 'Aug 21, 2025',
			'excerpt' => __( 'Integrated water and steam piping in compliance with GMP standards.', 'midex' ),
			'image'   => 'images/news/news-1755767513.png',
		),
		array(
			'title'   => __( 'MARS WRIGLEY Soft Water Line', 'midex' ),
			'date'    => 'Aug 24, 2025',
			'excerpt' => __( '1,500 meters of stainless-steel soft water distribution installed.', 'midex' ),
			'image'   => 'images/news/news-1756042052.png',
		),
		array(
			'title'   => __( 'SPIMACO Pharmaceutical Water Network', 'midex' ),
			'date'    => 'Aug 26, 2025',
			'excerpt' => __( 'Purified Water Station with 2.5 m³/h capacity and advanced monitoring.', 'midex' ),
			'image'   => 'images/news/news-1756207804.png',
		),
		array(
			'title'   => __( 'Otsuka PW Piping Network', 'midex' ),
			'date'    => 'Apr 22, 2026',
			'excerpt' => __( 'Stainless steel piping works for a new production line within the PW network.', 'midex' ),
			'image'   => 'images/news/news-1776871937.png',
		),
	);

	$valid = array();

	foreach ( $items as $item ) {
		$path = midex_images_path() . '/' . str_replace( 'images/', '', $item['image'] );

		if ( file_exists( $path ) ) {
			$valid[] = $item;
		}
	}

	return $valid;
}

/**
 * Event gallery labels.
 *
 * @param string $relative Image path.
 * @return string
 */
function midex_event_caption( $relative ) {
	$map = array(
		'images/events/event-1755506196.jpg' => __( 'Industry exhibition', 'midex' ),
		'images/events/event-1755506209.jpg' => __( 'Project showcase', 'midex' ),
		'images/events/event-1755506225.jpg' => __( 'On-site commissioning', 'midex' ),
		'images/events/event-1755506266.jpg' => __( 'Engineering team', 'midex' ),
		'images/events/event-1755506276.jpg' => __( 'Facility visit', 'midex' ),
		'images/events/event-1755759833.jpg' => __( 'Trade fair booth', 'midex' ),
		'images/events/event-1756814991.jpg' => __( 'Purified water project', 'midex' ),
		'images/events/event-1756820572.png' => __( 'Project commissioning', 'midex' ),
	);

	return $map[ $relative ] ?? midex_image_label( $relative );
}

/**
 * Attach a theme asset as the featured image for a post.
 *
 * @param int    $post_id Post ID.
 * @param string $relative Relative path under assets/ e.g. images/products/foo.png.
 */
function midex_attach_theme_image( $post_id, $relative ) {
	$path = get_template_directory() . '/assets/' . ltrim( str_replace( 'images/', '', $relative ), '/' );

	if ( ! file_exists( $path ) || has_post_thumbnail( $post_id ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$upload = wp_upload_bits( basename( $path ), null, file_get_contents( $path ) );

	if ( ! empty( $upload['error'] ) ) {
		return;
	}

	$attachment_id = wp_insert_attachment(
		array(
			'post_title'     => sanitize_file_name( basename( $path ) ),
			'post_mime_type' => wp_check_filetype( $path )['type'],
			'post_status'    => 'inherit',
			'guid'           => $upload['url'],
		),
		$upload['file'],
		$post_id
	);

	if ( ! is_wp_error( $attachment_id ) ) {
		wp_generate_attachment_metadata( $attachment_id, $upload['file'] );
		set_post_thumbnail( $post_id, $attachment_id );
	}
}

/**
 * Product thumbnail from assets folder by title match.
 *
 * @param int $post_id Product post ID.
 * @return string URL or empty.
 */
function midex_product_thumbnail_url( $post_id ) {
	if ( has_post_thumbnail( $post_id ) ) {
		return get_the_post_thumbnail_url( $post_id, 'medium_large' );
	}

	$title = get_the_title( $post_id );

	foreach ( midex_list_images( 'products' ) as $image ) {
		if ( midex_product_title( $image ) === $title ) {
			return midex_asset_url( $image );
		}
	}

	$images = midex_list_images( 'products' );

	return ! empty( $images ) ? midex_asset_url( $images[ $post_id % count( $images ) ] ) : '';
}

/**
 * Fallback blog thumbnail from asset pool.
 *
 * @param int $index Post index.
 * @return string URL.
 */
function midex_blog_fallback_image( $index ) {
	$pool = array_merge(
		midex_list_images( 'blog' ),
		midex_list_images( 'events' ),
		midex_list_images( 'products' )
	);

	if ( empty( $pool ) ) {
		return '';
	}

	$pick = $pool[ $index % count( $pool ) ];

	return midex_asset_url( $pick );
}
