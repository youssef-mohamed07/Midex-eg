<?php
/**
 * Product archive, category, and single product layouts.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register product page blocks.
 */
function midex_register_product_page_blocks() {
	register_block_type(
		'midex/products-catalog',
		array(
			'render_callback' => 'midex_render_products_catalog_block',
			'style'           => 'midex-tailwind',
		)
	);

	register_block_type(
		'midex/single-product-page',
		array(
			'render_callback' => 'midex_render_single_product_page_block',
			'style'           => 'midex-tailwind',
		)
	);
}
add_action( 'init', 'midex_register_product_page_blocks' );

/**
 * Product categories in catalog order.
 *
 * @return WP_Term[]
 */
function midex_get_ordered_product_categories() {
	$ordered = array();

	foreach ( array_keys( midex_get_product_categories() ) as $slug ) {
		$term = get_term_by( 'slug', $slug, 'product_category' );

		if ( $term && ! is_wp_error( $term ) ) {
			$ordered[] = $term;
		}
	}

	return $ordered;
}

/**
 * Category filter pills.
 *
 * @return string
 */
function midex_render_product_category_nav() {
	$terms   = midex_get_ordered_product_categories();
	$current = is_tax( 'product_category' ) ? get_queried_object_id() : 0;

	if ( empty( $terms ) ) {
		return '';
	}

	ob_start();
	?>
	<nav class="flex flex-wrap gap-2" aria-label="<?php esc_attr_e( 'Product categories', 'midex' ); ?>">
		<a class="<?php echo esc_attr( midex_product_pill_class( is_post_type_archive( 'product' ) ) ); ?>" href="<?php echo esc_url( get_post_type_archive_link( 'product' ) ); ?>">
			<?php esc_html_e( 'All Products', 'midex' ); ?>
		</a>
		<?php foreach ( $terms as $term ) : ?>
			<a class="<?php echo esc_attr( midex_product_pill_class( (int) $current === (int) $term->term_id ) ); ?>" href="<?php echo esc_url( get_term_link( $term ) ); ?>">
				<?php echo esc_html( $term->name ); ?>
			</a>
		<?php endforeach; ?>
	</nav>
	<?php
	return ob_get_clean();
}

/**
 * @param bool $active Active state.
 * @return string
 */
function midex_product_pill_class( $active ) {
	$base = 'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 no-underline';

	if ( $active ) {
		return $base . ' bg-midex-navy text-white shadow-md';
	}

	return $base . ' bg-midex-surface text-midex-navy hover:bg-midex-mint/30';
}

/**
 * Breadcrumb trail for product pages.
 *
 * @param string|null $current Current page label.
 * @return string
 */
function midex_render_product_breadcrumb( $current = null ) {
	$items = array(
		array(
			'label' => __( 'Home', 'midex' ),
			'url'   => home_url( '/' ),
		),
		array(
			'label' => __( 'Products', 'midex' ),
			'url'   => get_post_type_archive_link( 'product' ),
		),
	);

	if ( is_tax( 'product_category' ) ) {
		$term = get_queried_object();

		if ( $term && ! is_wp_error( $term ) ) {
			$items[] = array(
				'label' => $term->name,
				'url'   => null,
			);
		}
	} elseif ( is_singular( 'product' ) && $current ) {
		$terms = get_the_terms( get_the_ID(), 'product_category' );

		if ( $terms && ! is_wp_error( $terms ) ) {
			$term    = $terms[0];
			$items[] = array(
				'label' => $term->name,
				'url'   => get_term_link( $term ),
			);
		}

		$items[] = array(
			'label' => $current,
			'url'   => null,
		);
	} elseif ( $current ) {
		$items[] = array(
			'label' => $current,
			'url'   => null,
		);
	}

	ob_start();
	?>
	<nav class="midex-breadcrumb mb-6 text-sm text-midex-gray/80" aria-label="<?php esc_attr_e( 'Breadcrumb', 'midex' ); ?>">
		<ol class="flex flex-wrap items-center gap-2">
			<?php foreach ( $items as $i => $item ) : ?>
				<?php if ( $i > 0 ) : ?>
					<li class="text-midex-mint" aria-hidden="true">/</li>
				<?php endif; ?>
				<li>
					<?php if ( ! empty( $item['url'] ) ) : ?>
						<a class="text-midex-blue transition-colors hover:text-midex-navy no-underline" href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
					<?php else : ?>
						<span class="font-medium text-midex-navy"><?php echo esc_html( $item['label'] ); ?></span>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ol>
	</nav>
	<?php
	return ob_get_clean();
}

/**
 * Single product card for catalog grids.
 *
 * @param WP_Post|int $post Post object or ID.
 * @return string
 */
function midex_render_product_card( $post ) {
	$post = get_post( $post );

	if ( ! $post || 'product' !== $post->post_type ) {
		return '';
	}

	$post_id  = $post->ID;
	$thumb    = midex_product_thumbnail_url( $post_id );
	$excerpt  = has_excerpt( $post_id ) ? get_the_excerpt( $post_id ) : wp_trim_words( wp_strip_all_tags( $post->post_content ), 18 );
	$terms    = get_the_terms( $post_id, 'product_category' );
	$category = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0]->name : '';

	ob_start();
	?>
	<article class="mx-card group flex flex-col">
		<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" class="relative block aspect-[4/3] overflow-hidden bg-midex-surface">
			<?php if ( $thumb ) : ?>
				<img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src="<?php echo esc_url( $thumb ); ?>" alt="<?php echo esc_attr( get_the_title( $post_id ) ); ?>" loading="lazy" />
			<?php endif; ?>
			<div class="absolute inset-0 bg-gradient-to-t from-midex-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
			<?php if ( $category ) : ?>
				<span class="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-midex-navy backdrop-blur-sm"><?php echo esc_html( $category ); ?></span>
			<?php endif; ?>
		</a>
		<div class="flex flex-1 flex-col p-6">
			<h3 class="font-display text-lg font-semibold leading-snug text-midex-navy">
				<a class="no-underline transition-colors hover:text-midex-blue" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( get_the_title( $post_id ) ); ?></a>
			</h3>
			<?php if ( $excerpt ) : ?>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-midex-gray/80"><?php echo esc_html( $excerpt ); ?></p>
			<?php endif; ?>
			<div class="mt-5 flex flex-wrap gap-2">
				<a class="mx-btn mx-btn-primary !px-4 !py-2 !text-xs" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php esc_html_e( 'View details', 'midex' ); ?></a>
				<a class="mx-btn mx-btn-mint !px-4 !py-2 !text-xs" href="<?php echo esc_url( midex_get_quote_url( $post_id ) ); ?>"><?php esc_html_e( 'Request a Quote', 'midex' ); ?></a>
			</div>
		</div>
	</article>
	<?php
	return ob_get_clean();
}

/**
 * Products archive + category taxonomy catalog.
 *
 * @return string
 */
function midex_render_products_catalog_block() {
	global $wp_query;

	if ( ! is_post_type_archive( 'product' ) && ! is_tax( 'product_category' ) ) {
		return '';
	}

	if ( is_tax( 'product_category' ) ) {
		$term     = get_queried_object();
		$title    = $term->name;
		$subtitle = $term->description ? wp_strip_all_tags( $term->description ) : __( 'Browse hygienic equipment in this category. Request a quote for pricing and lead times.', 'midex' );
	} else {
		$title    = __( 'Products', 'midex' );
		$subtitle = __( 'Browse our product catalog by category. Each item links to a detail page with specifications and a Request a Quote action.', 'midex' );
	}

	ob_start();
	?>
	<section class="midex-products-page">
		<div class="midex-page-hero bg-gradient-to-br from-midex-navy via-midex-navy to-midex-navy-dark text-white">
			<div class="mx-container py-14 lg:py-16">
				<?php echo midex_render_product_breadcrumb( $title ); ?>
				<span class="mx-badge mb-4 border-white/20 bg-white/10 text-white"><?php esc_html_e( 'Product Catalog', 'midex' ); ?></span>
				<h1 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"><?php echo esc_html( $title ); ?></h1>
				<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"><?php echo esc_html( $subtitle ); ?></p>
			</div>
		</div>

		<div class="mx-container py-12 lg:py-16">
			<?php echo midex_render_product_category_nav(); ?>

			<?php if ( $wp_query->have_posts() ) : ?>
				<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<?php
					while ( $wp_query->have_posts() ) :
						$wp_query->the_post();
						echo midex_render_product_card( get_the_ID() );
					endwhile;
					wp_reset_postdata();
					?>
				</div>

				<?php
				$pagination = paginate_links(
					array(
						'total'   => $wp_query->max_num_pages,
						'current' => max( 1, get_query_var( 'paged' ) ),
						'type'    => 'list',
					)
				);

				if ( $pagination ) :
					?>
					<nav class="midex-pagination mt-12" aria-label="<?php esc_attr_e( 'Products pagination', 'midex' ); ?>">
						<?php echo wp_kses_post( $pagination ); ?>
					</nav>
				<?php endif; ?>
			<?php else : ?>
				<div class="mt-12 rounded-2xl border border-midex-navy/10 bg-midex-surface px-8 py-16 text-center">
					<h2 class="font-display text-xl font-semibold text-midex-navy"><?php esc_html_e( 'No products in this category yet', 'midex' ); ?></h2>
					<p class="mt-2 text-midex-gray/80"><?php esc_html_e( 'Contact our team for availability and custom sourcing.', 'midex' ); ?></p>
					<a class="mx-btn mx-btn-primary mt-6" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'midex' ); ?></a>
				</div>
			<?php endif; ?>
		</div>

		<?php echo midex_render_request_quote_cta_section(); ?>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Single product detail layout.
 *
 * @return string
 */
function midex_render_single_product_page_block() {
	if ( ! is_singular( 'product' ) ) {
		return '';
	}

	$post_id  = get_the_ID();
	$thumb    = midex_product_thumbnail_url( $post_id );
	$terms    = get_the_terms( $post_id, 'product_category' );
	$category = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;
	$content  = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );

	ob_start();
	?>
	<article class="midex-single-product">
		<div class="midex-page-hero bg-gradient-to-br from-midex-surface via-white to-midex-surface">
			<div class="mx-container py-10 lg:py-12">
				<?php echo midex_render_product_breadcrumb( get_the_title( $post_id ) ); ?>
			</div>
		</div>

		<div class="mx-container pb-16 lg:pb-20">
			<div class="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
				<div class="overflow-hidden rounded-2xl border border-midex-navy/5 bg-white p-4 shadow-sm lg:sticky lg:top-24">
					<?php if ( $thumb ) : ?>
						<img class="w-full rounded-xl object-contain" src="<?php echo esc_url( $thumb ); ?>" alt="<?php echo esc_attr( get_the_title( $post_id ) ); ?>" />
					<?php endif; ?>
				</div>

				<div>
					<?php if ( $category ) : ?>
						<a class="inline-flex rounded-full bg-midex-mint/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-midex-navy no-underline transition-colors hover:bg-midex-mint/40" href="<?php echo esc_url( get_term_link( $category ) ); ?>">
							<?php echo esc_html( $category->name ); ?>
						</a>
					<?php endif; ?>

					<h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-midex-navy sm:text-4xl"><?php echo esc_html( get_the_title( $post_id ) ); ?></h1>

					<?php if ( has_excerpt( $post_id ) ) : ?>
						<p class="mt-4 text-lg leading-relaxed text-midex-gray/85"><?php echo esc_html( get_the_excerpt( $post_id ) ); ?></p>
					<?php endif; ?>

					<div class="mt-8 flex flex-wrap gap-3">
						<a class="mx-btn mx-btn-primary" href="<?php echo esc_url( midex_get_quote_url( $post_id ) ); ?>"><?php esc_html_e( 'Request a Quote', 'midex' ); ?></a>
						<a class="mx-btn border-2 border-midex-navy/15 bg-white text-midex-navy hover:border-midex-mint hover:bg-midex-surface" href="<?php echo esc_url( get_post_type_archive_link( 'product' ) ); ?>"><?php esc_html_e( '← All Products', 'midex' ); ?></a>
					</div>

					<?php if ( $content ) : ?>
						<div class="midex-product-content prose prose-midex mt-10 max-w-none text-midex-gray/90">
							<h2 class="font-display text-xl font-bold text-midex-navy"><?php esc_html_e( 'Overview', 'midex' ); ?></h2>
							<?php echo $content; ?>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>

		<?php echo midex_render_request_quote_cta_section( get_the_title( $post_id ) ); ?>
	</article>
	<?php
	return ob_get_clean();
}

/**
 * Shared quote CTA strip.
 *
 * @param string|null $item Optional item name for quote URL.
 * @return string
 */
function midex_render_request_quote_cta_section( $item = null ) {
	$url = $item ? midex_get_quote_url( get_the_ID() ) : midex_get_quote_url();

	ob_start();
	?>
	<section class="mx-section relative overflow-hidden">
		<div class="pointer-events-none absolute inset-0 mx-mesh-bg"></div>
		<div class="mx-container relative">
			<div class="overflow-hidden rounded-3xl border border-midex-mint/20 bg-gradient-to-br from-midex-navy via-midex-navy to-midex-navy-dark px-8 py-14 text-center shadow-xl lg:px-16 lg:py-16">
				<h2 class="font-display text-2xl font-bold text-white sm:text-3xl"><?php esc_html_e( 'Request a Quote', 'midex' ); ?></h2>
				<p class="mx-auto mt-3 max-w-xl text-white/75"><?php esc_html_e( 'Tell us about your project and our team will respond with pricing and lead times.', 'midex' ); ?></p>
				<a class="mx-btn mx-btn-mint mt-8 inline-flex" href="<?php echo esc_url( $url ); ?>">
					<?php esc_html_e( 'Request a Quote', 'midex' ); ?> →
				</a>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
