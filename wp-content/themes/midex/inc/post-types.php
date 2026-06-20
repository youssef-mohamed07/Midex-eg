<?php
/**
 * Custom post types and taxonomies.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Midex post types and taxonomies.
 */
function midex_register_post_types() {
	register_post_type(
		'product',
		array(
			'labels'              => array(
				'name'          => __( 'Products', 'midex' ),
				'singular_name' => __( 'Product', 'midex' ),
				'add_new_item'  => __( 'Add Product', 'midex' ),
				'edit_item'     => __( 'Edit Product', 'midex' ),
				'view_item'     => __( 'View Product', 'midex' ),
				'search_items'  => __( 'Search Products', 'midex' ),
				'not_found'     => __( 'No products found.', 'midex' ),
			),
			'public'              => true,
			'has_archive'         => true,
			'rewrite'             => array( 'slug' => 'products' ),
			'menu_icon'           => 'dashicons-cart',
			'show_in_rest'        => true,
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
			'template'            => array(
				array( 'core/paragraph', array( 'placeholder' => 'Product description…' ) ),
			),
		)
	);

	register_post_type(
		'solution',
		array(
			'labels'              => array(
				'name'          => __( 'Solutions', 'midex' ),
				'singular_name' => __( 'Solution', 'midex' ),
				'add_new_item'  => __( 'Add Solution', 'midex' ),
				'edit_item'     => __( 'Edit Solution', 'midex' ),
				'view_item'     => __( 'View Solution', 'midex' ),
				'search_items'  => __( 'Search Solutions', 'midex' ),
				'not_found'     => __( 'No solutions found.', 'midex' ),
			),
			'public'              => true,
			'has_archive'         => true,
			'rewrite'             => array( 'slug' => 'solutions' ),
			'menu_icon'           => 'dashicons-admin-tools',
			'show_in_rest'        => true,
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);

	register_taxonomy(
		'product_category',
		'product',
		array(
			'labels'            => array(
				'name'          => __( 'Product Categories', 'midex' ),
				'singular_name' => __( 'Product Category', 'midex' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'products/category' ),
			'show_admin_column' => true,
		)
	);

	register_taxonomy(
		'solution_group',
		'solution',
		array(
			'labels'            => array(
				'name'          => __( 'Solution Groups', 'midex' ),
				'singular_name' => __( 'Solution Group', 'midex' ),
			),
			'public'            => true,
			'hierarchical'      => true,
			'show_in_rest'      => true,
			'rewrite'           => array( 'slug' => 'solutions/group' ),
			'show_admin_column' => true,
		)
	);
}
add_action( 'init', 'midex_register_post_types' );

/**
 * Short description for product category archive pages.
 *
 * @param string $slug Category slug.
 * @return string
 */
function midex_product_category_description( $slug ) {
	$descriptions = array(
		'piping-and-fitting'    => __( 'Stainless steel piping, fittings, and hygienic connections for process lines.', 'midex' ),
		'valves'                => __( 'Sanitary valves for flow control in pharmaceutical and food-grade systems.', 'midex' ),
		'instruments'           => __( 'Process instrumentation for monitoring pressure, flow, and quality.', 'midex' ),
		'pumps'                 => __( 'Centrifugal and positive-displacement pumps for hygienic applications.', 'midex' ),
		'uv-units'              => __( 'UV sterilization units for purified water and WFI systems.', 'midex' ),
		'filters'               => __( 'Filtration housings and cartridges for process and utility streams.', 'midex' ),
		'stainless-steel-tanks' => __( 'Jacketed and storage tanks engineered for validated production.', 'midex' ),
		'hygienic-drains'       => __( 'Floor drains and drainage systems meeting hygienic design standards.', 'midex' ),
	);

	return $descriptions[ $slug ] ?? '';
}

/**
 * Display label for a solution group in navigation.
 *
 * @param WP_Term $term Term object.
 * @return string
 */
function midex_solution_group_menu_label( $term ) {
	$groups = midex_get_solution_groups();

	if ( isset( $groups[ $term->slug ]['menu_label'] ) ) {
		return $groups[ $term->slug ]['menu_label'];
	}

	return $term->name;
}

/**
 * Product category definitions.
 *
 * @return array<string, string>
 */
function midex_get_product_categories() {
	return array(
		'piping-and-fitting'   => __( 'Piping and Fitting', 'midex' ),
		'valves'               => __( 'Valves', 'midex' ),
		'instruments'          => __( 'Instruments', 'midex' ),
		'pumps'                => __( 'Pumps', 'midex' ),
		'uv-units'             => __( 'UV Units', 'midex' ),
		'filters'              => __( 'Filters', 'midex' ),
		'stainless-steel-tanks'=> __( 'Stainless Steel Tanks', 'midex' ),
		'hygienic-drains'      => __( 'Hygienic Drain Works', 'midex' ),
	);
}

/**
 * Solution group tree (supports nested second level).
 *
 * @return array<string, array<string, string>|string>
 */
function midex_get_solution_groups() {
	return array(
		'systems' => array(
			'label'    => __( 'Systems', 'midex' ),
			'children' => array(
				'soft-water-station'           => __( 'Soft water station', 'midex' ),
				'cleaning-in-place-system'     => __( 'Cleaning in Place system', 'midex' ),
				'sanitization-in-place-system' => __( 'Sanitization in place system', 'midex' ),
				'purified-water-station'       => __( 'Purified Water Station', 'midex' ),
				'distribution-skids'           => __( 'Distribution Skids', 'midex' ),
			),
		),
		'solutions' => array(
			'label'      => __( 'Solutions', 'midex' ),
			'menu_label' => __( 'Modifications', 'midex' ),
			'children'   => array(
				'pw-station-modification'      => __( 'Purified water station modification', 'midex' ),
				'distribution-skids-modification' => __( 'Distribution skids Modification', 'midex' ),
				'loop-design-modification'     => __( 'Loop Design Modification in PW/ WFI Systems', 'midex' ),
			),
		),
		'welding' => array(
			'label'    => __( 'Welding', 'midex' ),
			'children' => array(
				'manual-welding'           => __( 'Manual welding', 'midex' ),
				'automatic-orbital-welding'=> __( 'Automatic Orbital welding', 'midex' ),
			),
		),
		'installations' => array(
			'label'    => __( 'Installations', 'midex' ),
			'children' => array(
				'purified-loop-system'              => __( 'Purified loop system', 'midex' ),
				'preparation-pipe-line'             => __( 'Preparation pipe line', 'midex' ),
				'sanitary-drain-pipeline'           => __( 'Sanitary drain pipeline', 'midex' ),
				'compressed-air-pipe-line-installation' => __( 'Compressed air pipe line installation', 'midex' ),
			),
		),
	);
}
