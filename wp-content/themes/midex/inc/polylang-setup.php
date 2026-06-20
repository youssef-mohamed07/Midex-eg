<?php
/**
 * Polylang full setup: EN (default), AR, DE.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Translation dictionary: English source => [ ar, de ].
 *
 * @return array<string, array{ar: string, de: string}>
 */
function midex_polylang_translation_map() {
	return array(
		'Home'                          => array( 'ar' => 'الرئيسية', 'de' => 'Startseite' ),
		'About Us'                      => array( 'ar' => 'من نحن', 'de' => 'Über uns' ),
		'Contact Us'                    => array( 'ar' => 'اتصل بنا', 'de' => 'Kontakt' ),
		'Blog'                          => array( 'ar' => 'المدونة', 'de' => 'Blog' ),
		'Products'                      => array( 'ar' => 'المنتجات', 'de' => 'Produkte' ),
		'Solutions'                     => array( 'ar' => 'الحلول', 'de' => 'Lösungen' ),
		'Overall MidEx'                 => array( 'ar' => 'نظرة عامة على ميدكس', 'de' => 'Midex im Überblick' ),
		'History'                       => array( 'ar' => 'تاريخنا', 'de' => 'Geschichte' ),
		'Vision and Mission'            => array( 'ar' => 'الرؤية والرسالة', 'de' => 'Vision und Mission' ),
		'Privacy Policy'                => array( 'ar' => 'سياسة الخصوصية', 'de' => 'Datenschutz' ),
		'Our Clients'                   => array( 'ar' => 'عملاؤنا', 'de' => 'Unsere Kunden' ),
		'Products Library'              => array( 'ar' => 'مكتبة المنتجات', 'de' => 'Produktbibliothek' ),
		'All Solutions'                 => array( 'ar' => 'جميع الحلول', 'de' => 'Alle Lösungen' ),
		'Integrated Engineering'        => array( 'ar' => 'الهندسة المتكاملة', 'de' => 'Integriertes Engineering' ),
		'Our Events'                    => array( 'ar' => 'فعالياتنا', 'de' => 'Unsere Events' ),
		'Our Services Products'         => array( 'ar' => 'خدماتنا ومنتجاتنا', 'de' => 'Unsere Dienstleistungen & Produkte' ),
		'New Products'                  => array( 'ar' => 'منتجات جديدة', 'de' => 'Neue Produkte' ),
		'Our Trade mark'                => array( 'ar' => 'علاماتنا التجارية', 'de' => 'Unsere Marken' ),
		'Exclusive Trade mark'          => array( 'ar' => 'علامات حصرية', 'de' => 'Exklusive Marken' ),
		'Testimonial'                   => array( 'ar' => 'آراء العملاء', 'de' => 'Referenzen' ),
		'Check Out Latest News'         => array( 'ar' => 'آخر الأخبار', 'de' => 'Aktuelle News' ),
		'Check Out Latest BLOG'         => array( 'ar' => 'آخر المقالات', 'de' => 'Aktueller Blog' ),
		'Request'                       => array( 'ar' => 'اطلب عرض سعر', 'de' => 'Anfrage' ),
		'Read more'                     => array( 'ar' => 'اقرأ المزيد', 'de' => 'Mehr lesen' ),
		'Read more →'                   => array( 'ar' => 'اقرأ المزيد ←', 'de' => 'Mehr lesen →' ),
		'View image'                    => array( 'ar' => 'عرض الصورة', 'de' => 'Bild ansehen' ),
		'Close'                         => array( 'ar' => 'إغلاق', 'de' => 'Schließen' ),
		'Service'                       => array( 'ar' => 'خدمة', 'de' => 'Service' ),
		'Language'                      => array( 'ar' => 'اللغة', 'de' => 'Sprache' ),
		'Welcome to MIDEX'              => array( 'ar' => 'مرحباً بكم في ميدكس', 'de' => 'Willkommen bei MIDEX' ),
		'Midex\'s Areas of Expertise'   => array( 'ar' => 'مجالات خبرة ميدكس', 'de' => 'Midex Fachgebiete' ),
		'Engineered for Pharmaceutical Excellence' => array(
			'ar' => 'هندسة للتميز الدوائي',
			'de' => 'Engineering für pharmazeutische Exzellenz',
		),
		'Our Services'                  => array( 'ar' => 'خدماتنا', 'de' => 'Unsere Leistungen' ),
		'View Products'                 => array( 'ar' => 'عرض المنتجات', 'de' => 'Produkte ansehen' ),
		'Exhibitions, project milestones, and industry showcases.' => array(
			'ar' => 'معارض، محطات المشاريع، وعروض صناعية.',
			'de' => 'Messen, Projektmeilensteine und Branchenpräsentationen.',
		),
		'Precision stainless steel services for pharmaceutical and hygienic industries.' => array(
			'ar' => 'خدمات دقيقة من الفولاذ المقاوم للصدأ للصناعات الدوائية والصحية.',
			'de' => 'Präzise Edelstahldienstleistungen für Pharma- und Hygieneindustrien.',
		),
		'Piping and Fitting'            => array( 'ar' => 'الأنابيب والتجهيزات', 'de' => 'Rohrleitungen & Armaturen' ),
		'Valves'                        => array( 'ar' => 'الصمامات', 'de' => 'Ventile' ),
		'Instruments'                   => array( 'ar' => 'الأجهزة', 'de' => 'Instrumente' ),
		'Pumps'                         => array( 'ar' => 'المضخات', 'de' => 'Pumpen' ),
		'UV Units'                      => array( 'ar' => 'وحدات UV', 'de' => 'UV-Einheiten' ),
		'Filters'                       => array( 'ar' => 'الفلاتر', 'de' => 'Filter' ),
		'Stainless Steel Tanks'         => array( 'ar' => 'خزانات الفولاذ المقاوم للصدأ', 'de' => 'Edelstahltanks' ),
		'Hygienic Drain Works'          => array( 'ar' => 'أعمال الصرف الصحي', 'de' => 'Hygienische Abflüsse' ),
		'Systems'                       => array( 'ar' => 'الأنظمة', 'de' => 'Systeme' ),
		'Welding'                       => array( 'ar' => 'اللحام', 'de' => 'Schweißen' ),
		'Installations'                 => array( 'ar' => 'التركيبات', 'de' => 'Installationen' ),
		'Our Clients'                   => array( 'ar' => 'عملاؤنا', 'de' => 'Unsere Kunden' ),
		'Consultations'                 => array( 'ar' => 'الاستشارات', 'de' => 'Beratungen' ),
		'Our Projects'                  => array( 'ar' => 'مشاريعنا', 'de' => 'Unsere Projekte' ),
		'Our Solutions'                 => array( 'ar' => 'حلولنا', 'de' => 'Unsere Lösungen' ),
	);
}

/**
 * Register all theme strings with Polylang.
 */
function midex_polylang_register_all_strings() {
	if ( ! function_exists( 'pll_register_string' ) ) {
		return;
	}

	foreach ( array_keys( midex_polylang_translation_map() ) as $string ) {
		pll_register_string( sanitize_title( $string ), $string, 'Midex Theme', false );
	}
}

/**
 * @return bool
 */
function midex_polylang_is_ready() {
	return function_exists( 'PLL' ) && function_exists( 'pll_set_post_language' );
}

/**
 * Add languages if missing.
 */
function midex_polylang_install_languages() {
	$model = PLL()->model;
	$defs  = array(
		array( 'locale' => 'en_US', 'slug' => 'en', 'name' => 'English', 'rtl' => false, 'term_group' => 0 ),
		array( 'locale' => 'ar', 'slug' => 'ar', 'name' => 'العربية', 'rtl' => true, 'term_group' => 1 ),
		array( 'locale' => 'de_DE', 'slug' => 'de', 'name' => 'Deutsch', 'rtl' => false, 'term_group' => 2 ),
	);

	foreach ( $defs as $def ) {
		if ( $model->get_language( $def['slug'] ) ) {
			continue;
		}

		$result = $model->add_language( $def );

		if ( $result instanceof WP_Error ) {
			continue;
		}
	}

	PLL()->options->set( 'default_lang', 'en' );
	PLL()->options->set( 'force_lang', 1 );
	PLL()->options->set( 'hide_default', 1 );
	PLL()->options->set( 'rewrite', 1 );
	PLL()->options->set( 'redirect_lang', 0 );

	update_option( 'WPLANG', 'en_US' );

	if ( function_exists( 'wp_download_language_pack' ) ) {
		require_once ABSPATH . 'wp-admin/includes/translation-install.php';
		wp_download_language_pack( 'ar' );
		wp_download_language_pack( 'de_DE' );
	}
}

/**
 * Save Polylang string translations for ar/de.
 */
function midex_polylang_save_string_translations() {
	$map = midex_polylang_translation_map();

	foreach ( array( 'ar', 'de' ) as $slug ) {
		$lang = PLL()->model->get_language( $slug );

		if ( ! $lang ) {
			continue;
		}

		$mo = new PLL_MO();
		$mo->import_from_db( $lang );

		foreach ( $map as $source => $translations ) {
			if ( empty( $translations[ $slug ] ) ) {
				continue;
			}

			$mo->add_entry( $mo->make_entry( $source, $translations[ $slug ] ) );
		}

		$mo->export_to_db( $lang );
	}
}

/**
 * Translate a string from the map.
 *
 * @param string $source English source.
 * @param string $lang   ar|de.
 * @return string
 */
function midex_polylang_translate( $source, $lang ) {
	$map = midex_polylang_translation_map();

	return $map[ $source ][ $lang ] ?? $source;
}

/**
 * Duplicate a post for another language.
 *
 * @param WP_Post $post   Source post.
 * @param string  $lang   Language slug.
 * @param string  $title  Translated title.
 * @param int     $parent Translated parent ID.
 * @return int Post ID.
 */
function midex_polylang_duplicate_post( $post, $lang, $title, $parent = 0 ) {
	$new_id = wp_insert_post(
		array(
			'post_title'   => $title,
			'post_content' => $post->post_content,
			'post_excerpt' => $post->post_excerpt,
			'post_status'  => $post->post_status,
			'post_type'    => $post->post_type,
			'post_name'    => $post->post_name,
			'post_parent'  => $parent,
		)
	);

	if ( is_wp_error( $new_id ) || ! $new_id ) {
		return 0;
	}

	pll_set_post_language( (int) $new_id, $lang );

	return (int) $new_id;
}

/**
 * Translate all pages and link translation groups.
 */
function midex_polylang_translate_pages() {
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
		)
	);

	$groups   = array();
	$by_title = array();

	foreach ( $pages as $page ) {
		if ( in_array( $page->post_name, array( 'sample-page', 'hello-world' ), true ) ) {
			continue;
		}

		pll_set_post_language( $page->ID, 'en' );
		$by_title[ $page->post_title ] = $page;
		$groups[ $page->ID ]           = array( 'en' => (int) $page->ID );
	}

	foreach ( $pages as $page ) {
		if ( ! isset( $groups[ $page->ID ] ) ) {
			continue;
		}

		$title = $page->post_title;

		if ( ! isset( midex_polylang_translation_map()[ $title ] ) ) {
			continue;
		}

		$parent_en = (int) $page->post_parent;
		$parent_ar = 0;
		$parent_de = 0;

		if ( $parent_en && isset( $groups[ $parent_en ] ) ) {
			$parent_ar = $groups[ $parent_en ]['ar'] ?? 0;
			$parent_de = $groups[ $parent_en ]['de'] ?? 0;
		}

		foreach ( array( 'ar', 'de' ) as $lang ) {
			$trans_title = midex_polylang_translate( $title, $lang );
			$parent      = 'ar' === $lang ? $parent_ar : $parent_de;
			$new_id      = midex_polylang_duplicate_post( $page, $lang, $trans_title, $parent );

			if ( $new_id ) {
				$groups[ $page->ID ][ $lang ] = $new_id;
			}
		}

		if ( count( $groups[ $page->ID ] ) > 1 ) {
			pll_save_post_translations( $groups[ $page->ID ] );
		}
	}

	$home = get_page_by_path( 'home' );

	if ( $home && isset( $groups[ $home->ID ] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home->ID );

		if ( ! empty( $groups[ $home->ID ]['ar'] ) ) {
			PLL()->model->post->set_language( (int) $groups[ $home->ID ]['ar'], 'ar' );
		}
	}

	$blog = get_page_by_path( 'blog' );

	if ( $blog && isset( $groups[ $blog->ID ] ) ) {
		update_option( 'page_for_posts', $blog->ID );
	}

	$home = get_page_by_path( 'home' );

	if ( $home ) {
		$ar_home = pll_get_post( $home->ID, 'ar' );
		$de_home = pll_get_post( $home->ID, 'de' );

		if ( $ar_home ) {
			wp_update_post(
				array(
					'ID'        => (int) $ar_home,
					'post_name' => 'homepage',
				)
			);
		}

		if ( $de_home ) {
			wp_update_post(
				array(
					'ID'        => (int) $de_home,
					'post_name' => 'startseite',
				)
			);
		}
	}
}

/**
 * Translate taxonomy terms (product categories, solution groups).
 */
function midex_polylang_translate_terms() {
	$taxonomies = array( 'product_category', 'solution_group' );

	foreach ( $taxonomies as $taxonomy ) {
		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
			)
		);

		if ( is_wp_error( $terms ) ) {
			continue;
		}

		foreach ( $terms as $term ) {
			pll_set_term_language( $term->term_id, 'en' );

			$map_key = $term->name;
			if ( ! isset( midex_polylang_translation_map()[ $map_key ] ) ) {
				continue;
			}

			$group = array( 'en' => (int) $term->term_id );

			foreach ( array( 'ar', 'de' ) as $lang ) {
				$translated = midex_polylang_translate( $map_key, $lang );
				$parent_id  = 0;

				if ( $term->parent ) {
					$parent_trans = pll_get_term_translations( $term->parent );
					$parent_id    = (int) ( $parent_trans[ $lang ] ?? 0 );
				}

				$created = wp_insert_term(
					$translated,
					$taxonomy,
					array(
						'slug'   => $term->slug,
						'parent' => $parent_id,
					)
				);

				if ( is_wp_error( $created ) ) {
					continue;
				}

				pll_set_term_language( (int) $created['term_id'], $lang );
				$group[ $lang ] = (int) $created['term_id'];
			}

			if ( count( $group ) > 1 ) {
				pll_save_term_translations( $group );
			}
		}
	}
}

/**
 * Assign languages to products and solutions; duplicate with translated titles where possible.
 */
function midex_polylang_translate_cpt_posts() {
	foreach ( array( 'product', 'solution' ) as $post_type ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
			)
		);

		foreach ( $posts as $post ) {
			pll_set_post_language( $post->ID, 'en' );

			$title = $post->post_title;
			$group = array( 'en' => (int) $post->ID );

			foreach ( array( 'ar', 'de' ) as $lang ) {
				$trans_title = isset( midex_polylang_translation_map()[ $title ] )
					? midex_polylang_translate( $title, $lang )
					: $title;

				$new_id = midex_polylang_duplicate_post( $post, $lang, $trans_title );

				if ( $new_id ) {
					$group[ $lang ] = $new_id;
				}
			}

			if ( count( $group ) > 1 ) {
				pll_save_post_translations( $group );
			}
		}
	}
}

/**
 * Convert a URL to a specific language context.
 *
 * @param string $url  URL.
 * @param string $lang Language slug.
 * @return string
 */
function midex_pll_url_for_lang( $url, $lang ) {
	if ( ! function_exists( 'PLL' ) ) {
		return $url;
	}

	$language = PLL()->model->get_language( $lang );

	if ( ! $language ) {
		return $url;
	}

	return PLL()->links_model->switch_language_in_link( $url, $language );
}

/**
 * Build primary navigation menus for each language.
 */
function midex_polylang_setup_menus() {
	$theme = get_option( 'stylesheet' );
	$map   = midex_polylang_translation_map();

	$menu_ids = array();

	foreach ( array( 'en', 'ar', 'de' ) as $lang ) {
		$menu_name = 'Primary ' . strtoupper( $lang );
		$existing  = wp_get_nav_menu_object( $menu_name );

		if ( $existing ) {
			wp_delete_nav_menu( $existing->term_id );
		}

		$menu_id = wp_create_nav_menu( $menu_name );

		if ( is_wp_error( $menu_id ) ) {
			continue;
		}

		pll_set_term_language( $menu_id, $lang );
		$menu_ids[ $lang ] = (int) $menu_id;

		$label = static function ( $key ) use ( $lang, $map ) {
			if ( 'en' === $lang ) {
				return $key;
			}

			return $map[ $key ][ $lang ] ?? $key;
		};

		$items = array(
			array(
				'title'    => $label( 'Products' ),
				'url'      => midex_pll_url_for_lang( get_post_type_archive_link( 'product' ), $lang ),
				'children' => array(),
			),
		);

		$product_terms = get_terms(
			array(
				'taxonomy'   => 'product_category',
				'hide_empty' => false,
			)
		);

		if ( ! is_wp_error( $product_terms ) ) {
			foreach ( $product_terms as $term ) {
				if ( pll_get_term_language( $term->term_id ) !== $lang ) {
					continue;
				}

				$items[0]['children'][] = array(
					'title' => $term->name,
					'url'   => midex_pll_url_for_lang( get_term_link( $term ), $lang ),
				);
			}
		}

		$solutions = array(
			'title'    => $label( 'Solutions' ),
			'url'      => midex_pll_url_for_lang( get_post_type_archive_link( 'solution' ), $lang ),
			'children' => array(),
		);

		$solution_terms = get_terms(
			array(
				'taxonomy'   => 'solution_group',
				'hide_empty' => false,
				'parent'     => 0,
			)
		);

		if ( ! is_wp_error( $solution_terms ) ) {
			foreach ( $solution_terms as $term ) {
				if ( pll_get_term_language( $term->term_id ) !== $lang ) {
					continue;
				}

				$child_items = array();
				$children    = get_terms(
					array(
						'taxonomy'   => 'solution_group',
						'hide_empty' => false,
						'parent'     => $term->term_id,
					)
				);

				if ( ! is_wp_error( $children ) ) {
					foreach ( $children as $child ) {
						if ( pll_get_term_language( $child->term_id ) !== $lang ) {
							continue;
						}
						$child_items[] = array(
							'title' => $child->name,
							'url'   => midex_pll_url_for_lang( get_term_link( $child ), $lang ),
						);
					}
				}

				$solutions['children'][] = array(
					'title'    => $term->name,
					'url'      => midex_pll_url_for_lang( get_term_link( $term ), $lang ),
					'children' => $child_items,
				);
			}
		}

		$items[] = $solutions;

		$blog_page = get_page_by_path( 'blog' );
		$items[]   = array(
			'title' => $label( 'Blog' ),
			'url'   => $blog_page ? get_permalink( (int) pll_get_post( $blog_page->ID, $lang ) ) : midex_pll_url_for_lang( home_url( '/blog/' ), $lang ),
		);

		$about_page = get_page_by_path( 'about-us' );
		$about_id   = $about_page ? (int) pll_get_post( $about_page->ID, $lang ) : 0;
		$about_children = array();

		if ( $about_id ) {
			$children = get_pages(
				array(
					'child_of'    => $about_id,
					'sort_column' => 'menu_order',
				)
			);
			foreach ( $children as $child ) {
				$about_children[] = array(
					'title' => $child->post_title,
					'url'   => get_permalink( $child ),
				);
			}
		}

		$items[] = array(
			'title'    => $label( 'About Us' ),
			'url'      => $about_id ? get_permalink( $about_id ) : midex_pll_url_for_lang( home_url( '/about-us/' ), $lang ),
			'children' => $about_children,
		);

		$contact_page = get_page_by_path( 'contact' );
		$items[]      = array(
			'title' => $label( 'Contact Us' ),
			'url'   => $contact_page ? get_permalink( (int) pll_get_post( $contact_page->ID, $lang ) ) : midex_pll_url_for_lang( home_url( '/contact/' ), $lang ),
		);

		midex_insert_menu_items( $menu_id, $items );
	}

	$nav_menus = PLL()->options->get( 'nav_menus' );
	$nav_menus[ $theme ]['primary'] = array(
		'en' => $menu_ids['en'] ?? 0,
		'ar' => $menu_ids['ar'] ?? 0,
		'de' => $menu_ids['de'] ?? 0,
	);
	PLL()->options->set( 'nav_menus', $nav_menus );
}

/**
 * Run full Polylang setup once.
 *
 * @return bool
 */
function midex_setup_polylang() {
	if ( ! midex_polylang_is_ready() ) {
		return false;
	}

	if ( (int) get_option( 'midex_polylang_setup_version', 0 ) >= 1 ) {
		return true;
	}

	midex_polylang_install_languages();
	midex_polylang_register_all_strings();
	midex_polylang_translate_pages();
	midex_polylang_translate_terms();
	midex_polylang_translate_cpt_posts();
	midex_polylang_save_string_translations();
	midex_polylang_setup_menus();

	update_option( 'midex_polylang_setup_version', 1, false );
	flush_rewrite_rules();

	return true;
}

add_action(
	'init',
	static function () {
		midex_polylang_register_all_strings();
	},
	20
);

add_action(
	'admin_init',
	static function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		midex_setup_polylang();
	}
);

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'midex polylang-setup',
		static function () {
			if ( midex_setup_polylang() ) {
				WP_CLI::success( 'Polylang setup complete (EN, AR, DE).' );
			} else {
				WP_CLI::error( 'Polylang is not active.' );
			}
		}
	);
}
