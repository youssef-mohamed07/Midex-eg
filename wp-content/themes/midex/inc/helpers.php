<?php
/**
 * Tailwind markup helpers.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Section heading markup.
 *
 * @param string $title    Title.
 * @param string $subtitle Optional subtitle.
 * @param string $align    Alignment class suffix.
 * @param string $variant  light|dark.
 * @return string
 */
function midex_section_heading( $title, $subtitle = '', $align = 'text-center mx-auto', $variant = 'light' ) {
	$is_dark = 'dark' === $variant;
	$title_class   = $is_dark ? 'text-white' : 'text-midex-navy';
	$subtitle_class = $is_dark ? 'text-white/70' : 'text-midex-gray/80';
	$badge_class   = $is_dark ? 'border-white/20 bg-white/10 text-white' : '';

	ob_start();
	?>
	<div class="mx-reveal mb-14 <?php echo esc_attr( $align ); ?>">
		<span class="mx-badge mb-4 <?php echo esc_attr( $badge_class ); ?>"><?php esc_html_e( 'Midex', 'midex' ); ?></span>
		<h2 class="mx-section-title <?php echo esc_attr( $title_class ); ?>"><?php echo esc_html( $title ); ?></h2>
		<?php if ( $subtitle ) : ?>
			<p class="mx-section-subtitle <?php echo esc_attr( $align . ' ' . $subtitle_class ); ?>"><?php echo esc_html( $subtitle ); ?></p>
		<?php endif; ?>
		<div class="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue"></div>
	</div>
	<?php
	return ob_get_clean();
}
