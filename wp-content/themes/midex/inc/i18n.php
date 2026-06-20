<?php
/**
 * Internationalization — English default, Arabic & German via Polylang.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load theme translations from /languages.
 */
function midex_load_textdomain() {
	load_theme_textdomain( 'midex', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'midex_load_textdomain' );

/**
 * Default site language: English.
 */
function midex_set_default_locale() {
	if ( get_option( 'WPLANG' ) ) {
		return;
	}

	update_option( 'WPLANG', 'en_US' );
}
add_action( 'after_switch_theme', 'midex_set_default_locale', 5 );

/**
 * Polylang: register theme strings for the String translations screen.
 */
function midex_register_polylang_strings() {
	if ( ! function_exists( 'pll_register_string' ) ) {
		return;
	}

	$strings = function_exists( 'midex_polylang_translation_map' )
		? array_keys( midex_polylang_translation_map() )
		: array(
			'Contact Us',
			'About Us',
			'Integrated Engineering',
			'Our Events',
			'Our Services Products',
			'New Products',
			'Request',
			'Read more',
		);

	foreach ( $strings as $string ) {
		pll_register_string( sanitize_title( $string ), $string, 'Midex Theme', false );
	}
}
add_action( 'init', 'midex_register_polylang_strings' );

/**
 * Current language slug (en, ar, de) or empty.
 *
 * @return string
 */
function midex_current_language() {
	if ( function_exists( 'pll_current_language' ) ) {
		return (string) pll_current_language( 'slug' );
	}

	$locale = determine_locale();

	if ( str_starts_with( $locale, 'ar' ) ) {
		return 'ar';
	}

	if ( str_starts_with( $locale, 'de' ) ) {
		return 'de';
	}

	return 'en';
}

/**
 * Whether the active language is RTL (Arabic).
 *
 * @return bool
 */
function midex_is_rtl() {
	if ( function_exists( 'pll_current_language' ) ) {
		return (bool) pll_current_language( 'is_rtl' );
	}

	return is_rtl();
}

/**
 * Language-aware home URL.
 *
 * @return string
 */
function midex_home_url() {
	if ( function_exists( 'pll_home_url' ) ) {
		return pll_home_url();
	}

	return home_url( '/' );
}

/**
 * @param string[] $classes Body classes.
 * @return string[]
 */
function midex_body_language_classes( $classes ) {
	$classes[] = 'lang-' . midex_current_language();

	if ( midex_is_rtl() ) {
		$classes[] = 'midex-rtl';
	}

	return $classes;
}
add_filter( 'body_class', 'midex_body_language_classes' );

/**
 * Set document text direction for Arabic.
 *
 * @param string $attributes HTML attributes on <html>.
 * @return string
 */
function midex_html_language_attributes( $attributes ) {
	if ( ! midex_is_rtl() ) {
		return $attributes;
	}

	if ( str_contains( $attributes, 'dir=' ) ) {
		return preg_replace( '/dir="[^"]*"/', 'dir="rtl"', $attributes );
	}

	return $attributes . ' dir="rtl"';
}
add_filter( 'language_attributes', 'midex_html_language_attributes' );

/**
 * Route theme strings through Polylang when a translation exists.
 *
 * @param string $translation Translated text.
 * @param string $text        Source text.
 * @param string $domain      Text domain.
 * @return string
 */
function midex_pll_gettext( $translation, $text, $domain ) {
	if ( 'midex' !== $domain || ! function_exists( 'pll__' ) ) {
		return $translation;
	}

	if ( ! function_exists( 'midex_polylang_translation_map' ) ) {
		return $translation;
	}

	if ( ! isset( midex_polylang_translation_map()[ $text ] ) ) {
		return $translation;
	}

	$translated = pll__( $text );

	return $translated ?: $text;
}
add_filter( 'gettext', 'midex_pll_gettext', 20, 3 );

/**
 * Render header language switcher (requires Polylang).
 *
 * @param string $class Extra CSS classes.
 * @return string
 */
function midex_render_language_switcher( $class = '' ) {
	if ( ! function_exists( 'pll_the_languages' ) ) {
		return '';
	}

	$languages = pll_the_languages(
		array(
			'raw'                   => 1,
			'hide_if_empty'         => 0,
			'hide_if_no_translation'=> 0,
			'display_names_as'      => 'slug',
		)
	);

	if ( empty( $languages ) || ! is_array( $languages ) ) {
		return '';
	}

	ob_start();
	?>
	<nav class="midex-lang-switcher flex <?php echo esc_attr( $class ); ?>" aria-label="<?php esc_attr_e( 'Language', 'midex' ); ?>">
		<ul class="flex items-center gap-0.5 rounded-full border border-midex-navy/10 bg-white/80 p-0.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
			<?php foreach ( $languages as $lang ) : ?>
				<li>
					<a
						class="block rounded-full px-2.5 py-1.5 transition-colors <?php echo ! empty( $lang['current_lang'] ) ? 'bg-midex-navy text-white' : 'text-midex-navy/70 hover:bg-midex-surface hover:text-midex-navy'; ?>"
						href="<?php echo esc_url( $lang['url'] ); ?>"
						hreflang="<?php echo esc_attr( $lang['locale'] ); ?>"
						lang="<?php echo esc_attr( $lang['slug'] ); ?>"
						<?php echo ! empty( $lang['current_lang'] ) ? 'aria-current="true"' : ''; ?>
					><?php echo esc_html( strtoupper( $lang['slug'] ) ); ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
	</nav>
	<?php
	return ob_get_clean();
}
