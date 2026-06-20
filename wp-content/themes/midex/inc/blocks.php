<?php
/**
 * Dynamic theme blocks.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register dynamic blocks.
 */
function midex_register_blocks() {
	$style = 'midex-tailwind';

	$blocks = array(
		'contact-form'       => 'midex_render_contact_form_block',
		'request-quote'      => 'midex_render_request_quote_block',
		'solution-intro'     => 'midex_render_solution_intro_block',
		'solution-specs'     => 'midex_render_solution_specs_block',
		'solution-featured'  => 'midex_render_solution_featured_block',
		'solution-faq'       => 'midex_render_solution_faq_block',
		'product-categories' => 'midex_render_product_categories_block',
		'product-actions'    => 'midex_render_product_actions_block',
	);

	foreach ( $blocks as $name => $callback ) {
		register_block_type(
			'midex/' . $name,
			array(
				'render_callback' => $callback,
				'style'           => $style,
			)
		);
	}
}
add_action( 'init', 'midex_register_blocks' );

/**
 * Request a quote CTA block.
 *
 * @param array<string, mixed> $attributes Attributes.
 * @return string
 */
function midex_render_request_quote_block( $attributes ) {
	if ( midex_is_contact_page() ) {
		return midex_render_contact_form();
	}

	$post_id  = get_the_ID();
	$headline = isset( $attributes['headline'] ) ? $attributes['headline'] : __( 'Request a Quote', 'midex' );
	$text     = isset( $attributes['text'] ) ? $attributes['text'] : __( 'Tell us about your project and our team will respond with pricing and lead times.', 'midex' );
	$button   = isset( $attributes['buttonLabel'] ) ? $attributes['buttonLabel'] : __( 'Request a Quote', 'midex' );
	$url      = midex_get_quote_url( $post_id );

	ob_start();
	?>
	<section class="mx-reveal mx-section relative overflow-hidden">
		<div class="pointer-events-none absolute inset-0 mx-mesh-bg"></div>
		<div class="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-midex-mint/20 blur-3xl"></div>
		<div class="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-midex-blue/15 blur-3xl"></div>
		<div class="mx-container relative">
			<div class="overflow-hidden rounded-3xl border border-midex-mint/20 bg-gradient-to-br from-midex-navy via-midex-navy to-midex-navy-dark px-8 py-16 text-center shadow-2xl shadow-midex-navy/30 lg:px-20 lg:py-20">
				<h2 class="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"><?php echo esc_html( $headline ); ?></h2>
				<p class="mx-auto mt-4 max-w-2xl text-lg text-white/75"><?php echo esc_html( $text ); ?></p>
				<a class="mx-btn mx-btn-mint mt-10 inline-flex text-base" href="<?php echo esc_url( $url ); ?>">
					<?php echo esc_html( $button ); ?> →
				</a>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Solution intro block.
 *
 * @return string
 */
function midex_render_solution_intro_block() {
	$post_id = get_the_ID();
	$intro   = get_post_meta( $post_id, '_midex_intro', true );

	if ( ! $intro ) {
		$intro = get_the_excerpt( $post_id );
	}

	if ( ! $intro ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-reveal mx-section border-t border-midex-surface pt-12">
		<h2 class="font-display text-2xl font-bold text-midex-navy"><?php esc_html_e( 'Introduction', 'midex' ); ?></h2>
		<div class="prose prose-lg mt-4 max-w-none text-midex-gray/85"><?php echo wp_kses_post( wpautop( $intro ) ); ?></div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Solution specs block.
 *
 * @return string
 */
function midex_render_solution_specs_block() {
	$rows = midex_get_meta_rows( get_the_ID(), '_midex_specs' );

	if ( empty( $rows ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-reveal mx-section border-t border-midex-surface pt-12">
		<h2 class="font-display text-2xl font-bold text-midex-navy"><?php esc_html_e( 'Specifications', 'midex' ); ?></h2>
		<div class="mt-6 overflow-hidden rounded-2xl border border-midex-navy/5 shadow-sm">
			<table class="w-full text-left text-sm">
				<tbody>
					<?php foreach ( $rows as $i => $row ) : ?>
						<tr class="<?php echo 0 === $i % 2 ? 'bg-white' : 'bg-midex-surface/50'; ?>">
							<th class="w-2/5 px-6 py-4 font-semibold text-midex-navy" scope="row"><?php echo esc_html( $row['label'] ); ?></th>
							<td class="px-6 py-4 text-midex-gray/85"><?php echo esc_html( $row['value'] ); ?></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Solution featured-in block.
 *
 * @return string
 */
function midex_render_solution_featured_block() {
	$rows = midex_get_meta_rows( get_the_ID(), '_midex_featured_in' );

	if ( empty( $rows ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="midex-section midex-section--featured">
		<h2><?php esc_html_e( 'Featured In', 'midex' ); ?></h2>
		<ul class="midex-featured-list">
			<?php foreach ( $rows as $row ) : ?>
				<li>
					<strong><?php echo esc_html( $row['label'] ); ?></strong>
					<?php if ( ! empty( $row['value'] ) ) : ?>
						<span><?php echo esc_html( $row['value'] ); ?></span>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Solution FAQ block.
 *
 * @return string
 */
function midex_render_solution_faq_block() {
	$rows = get_post_meta( get_the_ID(), '_midex_faq', true );
	$rows = is_array( $rows ) ? $rows : array();

	if ( empty( $rows ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="midex-section midex-section--faq">
		<h2><?php esc_html_e( 'FAQ', 'midex' ); ?></h2>
		<div class="midex-faq">
			<?php foreach ( $rows as $index => $row ) : ?>
				<details class="midex-faq__item" <?php echo 0 === $index ? 'open' : ''; ?>>
					<summary><?php echo esc_html( $row['question'] ?? '' ); ?></summary>
					<div class="midex-faq__answer"><?php echo wp_kses_post( wpautop( $row['answer'] ?? '' ) ); ?></div>
				</details>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Product category navigation block.
 *
 * @return string
 */
function midex_render_product_categories_block() {
	return midex_render_product_category_nav();
}

/**
 * Product card action buttons for catalog loops.
 *
 * @return string
 */
function midex_render_product_actions_block() {
	$post_id = get_the_ID();

	if ( ! $post_id || 'product' !== get_post_type( $post_id ) ) {
		return '';
	}

	ob_start();
	?>
	<div class="flex flex-wrap gap-3">
		<a class="mx-btn mx-btn-primary text-xs" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>">
			<?php esc_html_e( 'View details', 'midex' ); ?>
		</a>
		<a class="mx-btn border border-midex-mint bg-midex-surface text-midex-navy text-xs hover:bg-midex-mint" href="<?php echo esc_url( midex_get_quote_url( $post_id ) ); ?>">
			<?php esc_html_e( 'Request a Quote', 'midex' ); ?>
		</a>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Render solution group directory for archive page.
 *
 * @return string
 */
function midex_render_solution_groups_shortcode() {
	$parents = get_terms(
		array(
			'taxonomy'   => 'solution_group',
			'hide_empty' => false,
			'parent'     => 0,
		)
	);

	if ( is_wp_error( $parents ) || empty( $parents ) ) {
		return '';
	}

	ob_start();
	echo '<div class="midex-solution-groups">';

	foreach ( $parents as $parent ) {
		$children = get_terms(
			array(
				'taxonomy'   => 'solution_group',
				'hide_empty' => false,
				'parent'     => $parent->term_id,
			)
		);

		echo '<div class="midex-solution-group-card">';
		echo '<h3><a href="' . esc_url( get_term_link( $parent ) ) . '">' . esc_html( $parent->name ) . '</a></h3>';

		if ( ! empty( $parent->description ) ) {
			echo '<p>' . esc_html( $parent->description ) . '</p>';
		}

		if ( ! is_wp_error( $children ) && ! empty( $children ) ) {
			echo '<ul>';
			foreach ( $children as $child ) {
				echo '<li><a href="' . esc_url( get_term_link( $child ) ) . '">' . esc_html( $child->name ) . '</a></li>';
			}
			echo '</ul>';
		}

		echo '</div>';
	}

	echo '</div>';
	return ob_get_clean();
}
add_shortcode( 'midex_solution_groups', 'midex_render_solution_groups_shortcode' );
