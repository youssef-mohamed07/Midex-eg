<?php
/**
 * Seed pages, terms, and navigation on theme activation.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Run site structure setup / Midex brand sync.
 */
function midex_setup_site_structure() {
	$version = (int) get_option( 'midex_site_setup_version', 0 );

	if ( $version >= 3 ) {
		return;
	}

	midex_create_terms();
	$pages = midex_create_pages();
	midex_assign_reading_settings( $pages );
	midex_rebuild_primary_menu( $pages );
	midex_create_sample_content();
	midex_sync_home_page();
	midex_maybe_set_custom_logo();

	update_option( 'blogname', 'Midex' );
	update_option( 'midex_site_setup_version', 3, false );
	delete_option( 'midex_site_setup_complete' );
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'midex_setup_site_structure' );

/**
 * Force brand sync via WP-CLI or admin.
 */
function midex_force_brand_sync() {
	delete_option( 'midex_site_setup_version' );
	midex_setup_site_structure();
}

/**
 * Create product and solution taxonomy terms.
 */
function midex_create_terms() {
	foreach ( midex_get_product_categories() as $slug => $name ) {
		if ( ! term_exists( $slug, 'product_category' ) ) {
			wp_insert_term(
				$name,
				'product_category',
				array(
					'slug'        => $slug,
					'description' => midex_product_category_description( $slug ),
				)
			);
		}
	}

	foreach ( midex_get_solution_groups() as $parent_slug => $group ) {
		$parent = term_exists( $parent_slug, 'solution_group' );

		if ( ! $parent ) {
			$parent = wp_insert_term(
				$group['label'],
				'solution_group',
				array( 'slug' => $parent_slug )
			);
		}

		$parent_id = is_array( $parent ) ? (int) $parent['term_id'] : (int) $parent;

		if ( empty( $group['children'] ) || ! is_array( $group['children'] ) ) {
			continue;
		}

		foreach ( $group['children'] as $child_slug => $child_name ) {
			if ( ! term_exists( $child_slug, 'solution_group' ) ) {
				wp_insert_term(
					$child_name,
					'solution_group',
					array(
						'slug'   => $child_slug,
						'parent' => $parent_id,
					)
				);
			}
		}
	}
}

/**
 * @return array<string, int>
 */
function midex_create_pages() {
	$definitions = array(
		'home'     => array(
			'title'     => __( 'Home', 'midex' ),
			'slug'      => 'home',
			'content'   => '',
		),
		'about'    => array(
			'title'     => __( 'About Us', 'midex' ),
			'slug'      => 'about-us',
			'content'   => '<!-- wp:paragraph --><p>Midex is a specialized engineering company serving the pharmaceutical, food, and cosmetics industries with purified water systems, WFI storage and distribution, and hygienic process controls.</p><!-- /wp:paragraph -->',
		),
		'overall'  => array(
			'title'     => __( 'Overall MidEx', 'midex' ),
			'slug'      => 'overall-midex',
			'parent'    => 'about',
			'content'   => '<!-- wp:paragraph --><p>Overview of Midex integrated projects and contracting capabilities.</p><!-- /wp:paragraph -->',
		),
		'history'  => array(
			'title'     => __( 'History', 'midex' ),
			'slug'      => 'history',
			'parent'    => 'about',
			'content'   => '<!-- wp:paragraph --><p>Midex history serving pharmaceutical and hygienic industries.</p><!-- /wp:paragraph -->',
		),
		'vision'   => array(
			'title'     => __( 'Vision and Mission', 'midex' ),
			'slug'      => 'vision-and-mission',
			'parent'    => 'about',
			'content'   => '<!-- wp:paragraph --><p>Our vision and mission to deliver validated turnkey solutions.</p><!-- /wp:paragraph -->',
		),
		'privacy'  => array(
			'title'     => __( 'Privacy Policy', 'midex' ),
			'slug'      => 'privacy-policy',
			'parent'    => 'about',
			'content'   => '<!-- wp:paragraph --><p>Privacy policy for midex-eg.com visitors and clients.</p><!-- /wp:paragraph -->',
		),
		'clients'  => array(
			'title'     => __( 'Our Clients', 'midex' ),
			'slug'      => 'our-clients',
			'parent'    => 'about',
			'content'   => '<!-- wp:midex/clients-logos /-->',
		),
		'library'  => array(
			'title'     => __( 'Products Library', 'midex' ),
			'slug'      => 'products-library',
			'parent'    => 'about',
			'content'   => '<!-- wp:paragraph --><p>Download product and solution documentation.</p><!-- /wp:paragraph -->',
		),
		'contact'  => array(
			'title'     => __( 'Contact Us', 'midex' ),
			'slug'      => 'contact',
			'content'   => '<!-- wp:pattern {"slug":"midex/contact-page"} /-->',
		),
		'blog'     => array(
			'title'     => __( 'Blog', 'midex' ),
			'slug'      => 'blog',
			'content'   => '',
		),
	);

	$pages = array();

	foreach ( $definitions as $key => $page ) {
		$path     = ! empty( $page['parent'] ) ? $definitions[ $page['parent'] ]['slug'] . '/' . $page['slug'] : $page['slug'];
		$existing = get_page_by_path( $path );

		if ( $existing ) {
			$pages[ $key ] = (int) $existing->ID;
			continue;
		}

		$parent_id = 0;

		if ( ! empty( $page['parent'] ) && isset( $pages[ $page['parent'] ] ) ) {
			$parent_id = $pages[ $page['parent'] ];
		}

		$pages[ $key ] = wp_insert_post(
			array(
				'post_title'   => $page['title'],
				'post_name'    => $page['slug'],
				'post_content' => $page['content'],
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_parent'  => $parent_id,
			)
		);
	}

	return $pages;
}

/**
 * @param array<string, int> $pages Page IDs.
 */
function midex_assign_reading_settings( $pages ) {
	if ( ! empty( $pages['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $pages['home'] );
	}

	if ( ! empty( $pages['blog'] ) ) {
		update_option( 'page_for_posts', $pages['blog'] );
	}
}

/**
 * @param array<string, int> $pages Page IDs.
 */
function midex_rebuild_primary_menu( $pages ) {
	$menu_name = 'Primary';
	$existing  = wp_get_nav_menu_object( $menu_name );

	if ( $existing ) {
		wp_delete_nav_menu( $existing->term_id );
	}

	$menu_id = wp_create_nav_menu( $menu_name );

	if ( is_wp_error( $menu_id ) ) {
		return;
	}

	$items = array(
		array(
			'title'    => __( 'Products', 'midex' ),
			'url'      => get_post_type_archive_link( 'product' ),
			'children' => midex_menu_terms( 'product_category' ),
		),
		array(
			'title'    => __( 'Solutions', 'midex' ),
			'url'      => get_post_type_archive_link( 'solution' ),
			'children' => midex_menu_solution_groups(),
		),
	);

	$about_children = array();

	foreach ( array( 'overall', 'about', 'history', 'vision', 'privacy', 'clients', 'library' ) as $page_key ) {
		if ( empty( $pages[ $page_key ] ) ) {
			continue;
		}

		$about_children[] = array(
			'title' => get_the_title( $pages[ $page_key ] ),
			'url'   => get_permalink( $pages[ $page_key ] ),
		);
	}

	$items[] = array(
		'title' => __( 'Blog', 'midex' ),
		'url'   => ! empty( $pages['blog'] ) ? get_permalink( $pages['blog'] ) : home_url( '/blog/' ),
	);
	$items[] = array(
		'title'    => __( 'About Us', 'midex' ),
		'url'      => ! empty( $pages['about'] ) ? get_permalink( $pages['about'] ) : home_url( '/about-us/' ),
		'children' => $about_children,
	);
	$items[] = array(
		'title' => __( 'Contact Us', 'midex' ),
		'url'   => ! empty( $pages['contact'] ) ? get_permalink( $pages['contact'] ) : home_url( '/contact/' ),
	);

	midex_insert_menu_items( $menu_id, $items );

	$locations            = get_theme_mod( 'nav_menu_locations', array() );
	$locations['primary'] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
}

/**
 * @param int $parent_id Parent term ID.
 * @return array<int, array<string, mixed>>
 */
function midex_menu_group_children( $parent_id ) {
	$children = get_terms(
		array(
			'taxonomy'   => 'solution_group',
			'hide_empty' => false,
			'parent'     => $parent_id,
		)
	);

	if ( is_wp_error( $children ) ) {
		return array();
	}

	$items = array();

	foreach ( $children as $child ) {
		$items[] = array(
			'title' => $child->name,
			'url'   => get_term_link( $child ),
		);
	}

	return $items;
}

/**
 * Sync front page to block template content marker.
 */
function midex_sync_home_page() {
	$home = get_page_by_path( 'home' );

	if ( ! $home ) {
		return;
	}

	wp_update_post(
		array(
			'ID'           => $home->ID,
			'post_content' => '<!-- Front page uses front-page.html template -->',
		)
	);
}

/**
 * @param array<string, int> $pages Page IDs.
 * @deprecated Use midex_rebuild_primary_menu().
 */
function midex_create_primary_menu( $pages ) {
	midex_rebuild_primary_menu( $pages );
}

/**
 * @param string $taxonomy Taxonomy slug.
 * @return array<int, array<string, mixed>>
 */
function midex_menu_terms( $taxonomy ) {
	$terms = get_terms(
		array(
			'taxonomy'   => $taxonomy,
			'hide_empty' => false,
		)
	);

	if ( is_wp_error( $terms ) ) {
		return array();
	}

	$items = array();

	foreach ( $terms as $term ) {
		$items[] = array(
			'title' => $term->name,
			'url'   => get_term_link( $term ),
		);
	}

	return $items;
}

/**
 * Build nested solution menu (2 levels).
 *
 * @return array<int, array<string, mixed>>
 */
function midex_menu_solution_groups() {
	$ordered_slugs = array_keys( midex_get_solution_groups() );

	$items = array(
		array(
			'title' => __( 'All Solutions', 'midex' ),
			'url'   => get_post_type_archive_link( 'solution' ),
		),
	);

	foreach ( $ordered_slugs as $slug ) {
		$parent = get_term_by( 'slug', $slug, 'solution_group' );

		if ( ! $parent || is_wp_error( $parent ) ) {
			continue;
		}

		$children = get_terms(
			array(
				'taxonomy'   => 'solution_group',
				'hide_empty' => false,
				'parent'     => $parent->term_id,
			)
		);

		$child_items = array();

		if ( ! is_wp_error( $children ) ) {
			foreach ( $children as $child ) {
				$child_items[] = array(
					'title' => $child->name,
					'url'   => get_term_link( $child ),
				);
			}
		}

		$items[] = array(
			'title'    => midex_solution_group_menu_label( $parent ),
			'url'      => get_term_link( $parent ),
			'children' => $child_items,
		);
	}

	return $items;
}

/**
 * @param int                  $menu_id Menu ID.
 * @param array<int, mixed>    $items   Menu items.
 * @param int                  $parent  Parent menu item ID.
 */
function midex_insert_menu_items( $menu_id, $items, $parent = 0 ) {
	foreach ( $items as $item ) {
		$item_id = wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'  => $item['title'],
				'menu-item-url'    => $item['url'],
				'menu-item-status' => 'publish',
				'menu-item-type'   => 'custom',
				'menu-item-parent-id' => $parent,
			)
		);

		if ( ! empty( $item['children'] ) && ! is_wp_error( $item_id ) ) {
			midex_insert_menu_items( $menu_id, $item['children'], (int) $item_id );
		}
	}
}

/**
 * Create starter products and one sample solution.
 */
function midex_create_sample_content() {
	if ( get_posts( array( 'post_type' => 'product', 'posts_per_page' => 1, 'fields' => 'ids' ) ) ) {
		return;
	}

	$sample_products = array(
		'piping-and-fitting'    => __( 'Automatic Orbital welding', 'midex' ),
		'valves'                => __( 'Sanitary Centrifugal Self-Priming Pump', 'midex' ),
		'instruments'           => __( 'Sanitary Non-Self Priming Pump', 'midex' ),
		'pumps'                 => __( 'Hygienic UV Unit', 'midex' ),
		'uv-units'              => __( 'Sanitary Vent Filter Housing', 'midex' ),
		'filters'               => __( 'Reverse Osmosis (RO) double pass station', 'midex' ),
		'stainless-steel-tanks' => __( 'Super-Heated Water Sanitization', 'midex' ),
		'hygienic-drains'       => __( 'Sanitary Drain', 'midex' ),
	);

	foreach ( $sample_products as $category => $title ) {
		$post_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_content' => __( 'High-quality component engineered for hygienic process applications. Contact us for specifications and availability.', 'midex' ),
				'post_excerpt' => __( 'Engineered for reliability in demanding process environments.', 'midex' ),
				'post_status'  => 'publish',
				'post_type'    => 'product',
			)
		);

		if ( $post_id && ! is_wp_error( $post_id ) ) {
			wp_set_object_terms( $post_id, $category, 'product_category' );

			foreach ( midex_list_images( 'products' ) as $image ) {
				if ( midex_product_title( $image ) === $title ) {
					midex_attach_theme_image( $post_id, $image );
					break;
				}
			}
		}
	}

	$solution_id = wp_insert_post(
		array(
			'post_title'   => __( 'Integrated CIP System', 'midex' ),
			'post_content' => '',
			'post_excerpt' => __( 'Automated clean-in-place system for pharmaceutical and food production lines.', 'midex' ),
			'post_status'  => 'publish',
			'post_type'    => 'solution',
		)
	);

	if ( $solution_id && ! is_wp_error( $solution_id ) ) {
		wp_set_object_terms( $solution_id, 'cleaning-in-place-system', 'solution_group' );

		update_post_meta(
			$solution_id,
			'_midex_intro',
			__( 'Our integrated CIP systems reduce downtime while meeting strict hygienic validation requirements.', 'midex' )
		);

		update_post_meta(
			$solution_id,
			'_midex_specs',
			array(
				array( 'label' => __( 'Capacity', 'midex' ), 'value' => '500–5,000 L/h' ),
				array( 'label' => __( 'Material', 'midex' ), 'value' => '316L Stainless Steel' ),
				array( 'label' => __( 'Control', 'midex' ), 'value' => 'PLC with audit trail' ),
			)
		);

		update_post_meta(
			$solution_id,
			'_midex_featured_in',
			array(
				array( 'label' => __( 'Pharma Plant A', 'midex' ), 'value' => __( 'Validation 2024', 'midex' ) ),
				array( 'label' => __( 'Food Facility B', 'midex' ), 'value' => __( 'Commissioning 2025', 'midex' ) ),
			)
		);

		update_post_meta(
			$solution_id,
			'_midex_faq',
			array(
				array(
					'question' => __( 'What industries do you support?', 'midex' ),
					'answer'   => __( 'Pharmaceutical, biotech, food & beverage, and industrial hygienic applications.', 'midex' ),
				),
				array(
					'question' => __( 'Do you provide installation?', 'midex' ),
					'answer'   => __( 'Yes. We offer site survey, installation, commissioning, and validation support.', 'midex' ),
				),
			)
		);
	}
}
