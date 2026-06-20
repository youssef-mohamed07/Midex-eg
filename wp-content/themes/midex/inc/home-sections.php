<?php
/**
 * Homepage sections — Tailwind redesign, all assets/images used.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register homepage section blocks.
 */
function midex_register_home_blocks() {
	$blocks = array(
		'hero-slider'       => 'midex_render_hero_slider_block',
		'events-gallery'    => 'midex_render_events_gallery_block',
		'collab-banner'     => 'midex_render_collab_banner_block',
		'services-products' => 'midex_render_services_products_block',
		'new-products'      => 'midex_render_new_products_block',
		'trademark-partners'=> 'midex_render_trademark_partners_block',
		'stats-counter'     => 'midex_render_stats_counter_block',
		'testimonials'      => 'midex_render_testimonials_block',
		'latest-news'       => 'midex_render_latest_news_block',
		'latest-blog'       => 'midex_render_latest_blog_block',
		'clients-logos'     => 'midex_render_clients_logos_block',
	);

	foreach ( $blocks as $name => $callback ) {
		register_block_type(
			'midex/' . $name,
			array(
				'render_callback' => $callback,
				'style'           => 'midex-tailwind',
			)
		);
	}
}
add_action( 'init', 'midex_register_home_blocks' );

/**
 * Build hero slides from hero/ folder.
 *
 * @return array<int, array<string, string>>
 */
function midex_get_hero_slides() {
	$images = midex_list_images( 'hero' );
	$meta   = midex_hero_slide_meta();
	$slides = array();

	foreach ( $images as $image ) {
		$copy = $meta[ $image ] ?? array(
			'title'   => midex_image_label( $image ),
			'text'    => __( 'Engineering excellence for pharmaceutical and hygienic industries.', 'midex' ),
			'btn1'    => __( 'About Us', 'midex' ),
			'btn1url' => home_url( '/about-us/' ),
			'btn2'    => __( 'Contact Us', 'midex' ),
			'btn2url' => home_url( '/contact/' ),
		);

		$slides[] = array_merge( $copy, array( 'image' => $image ) );
	}

	return $slides;
}

/**
 * @return array<int, array<string, string>>
 */
function midex_get_service_products() {
	$items = array();

	foreach ( midex_list_images( 'services' ) as $image ) {
		$items[] = array(
			'title'   => midex_service_title( $image ),
			'image'   => $image,
			'excerpt' => midex_service_excerpt( $image ),
		);
	}

	return $items;
}

/**
 * @return array<int, array<string, string>>
 */
function midex_get_featured_products() {
	$items = array();

	foreach ( midex_list_images( 'products' ) as $image ) {
		$items[] = array(
			'title' => midex_product_title( $image ),
			'image' => $image,
		);
	}

	return $items;
}

/**
 * @return array<int, array<string, string>>
 */
function midex_get_trademark_partners() {
	$items = array();

	foreach ( midex_list_images( 'partners' ) as $image ) {
		$items[] = array(
			'name'  => midex_partner_name( $image ),
			'image' => $image,
		);
	}

	return $items;
}

/**
 * @return array<int, array<string, string>>
 */
function midex_get_exclusive_partners() {
	$items = array();

	foreach ( midex_list_images( 'exclusive' ) as $image ) {
		$items[] = array(
			'name'  => midex_partner_name( $image ),
			'image' => $image,
		);
	}

	return $items;
}

/**
 * @return array<int, array<string, string>>
 */
function midex_get_testimonials() {
	return array(
		array( 'name' => 'Sara Walid', 'role' => 'Technical Office Engineer', 'quote' => 'Proud to be part of a company that delivers innovative solutions with the highest standards of quality and reliability.' ),
		array( 'name' => 'Moataz Mohamed', 'role' => 'Purchasing Manager', 'quote' => 'We really appreciate the quality and professionalism of Midex, as they always strive to give the best to their clients.' ),
		array( 'name' => 'Mohamed Hossam', 'role' => 'Maintenance Engineer', 'quote' => 'They don’t just supply products; they stand by us every step of the way until the project is completed to the highest standard.' ),
		array( 'name' => 'Bahaa', 'role' => 'Production Engineer', 'quote' => 'MIDEX brings real value to any project they are involved in.' ),
	);
}

/**
 * Hero slider.
 *
 * @return string
 */
function midex_render_hero_slider_block() {
	$slides = midex_get_hero_slides();

	if ( empty( $slides ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="relative min-h-screen overflow-hidden bg-midex-navy-dark" data-midex-slider>
		<div class="absolute inset-0">
			<?php foreach ( $slides as $index => $slide ) : ?>
				<div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out <?php echo 0 === $index ? 'opacity-100 z-10' : 'opacity-0 z-0'; ?>" data-slide-panel="<?php echo esc_attr( (string) $index ); ?>">
					<div class="absolute inset-0 animate-ken-burns bg-cover bg-center" style="background-image:url('<?php echo esc_url( midex_asset_url( $slide['image'] ) ); ?>')"></div>
					<div class="absolute inset-0 bg-gradient-to-r from-midex-navy/95 via-midex-navy/75 to-midex-navy/30"></div>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-midex-mint/20 blur-3xl animate-float"></div>
		<div class="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-midex-blue/15 blur-3xl animate-float" style="animation-delay:-3s"></div>

		<div class="relative z-20 mx-container flex min-h-screen items-center pb-24 pt-[5.5rem] lg:pt-28">
			<?php foreach ( $slides as $index => $slide ) : ?>
				<div class="hero-content max-w-3xl <?php echo 0 === $index ? '' : 'hidden'; ?>" data-slide-content="<?php echo esc_attr( (string) $index ); ?>">
					<span class="mx-badge mb-6 animate-fade-in border-white/20 bg-white/10 text-white"><?php esc_html_e( 'Integrated Engineering', 'midex' ); ?></span>
					<h1 class="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up"><?php echo esc_html( $slide['title'] ); ?></h1>
					<p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 animate-fade-up" style="animation-delay:0.15s"><?php echo esc_html( $slide['text'] ); ?></p>
					<div class="mt-10 flex flex-wrap gap-4 animate-fade-up" style="animation-delay:0.3s">
						<a class="mx-btn mx-btn-primary" href="<?php echo esc_url( $slide['btn1url'] ); ?>"><?php echo esc_html( $slide['btn1'] ); ?></a>
						<a class="mx-btn mx-btn-outline" href="<?php echo esc_url( $slide['btn2url'] ); ?>"><?php echo esc_html( $slide['btn2'] ); ?></a>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( count( $slides ) > 1 ) : ?>
			<div class="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
				<?php foreach ( $slides as $index => $slide ) : ?>
					<button type="button" class="hero-dot h-2 rounded-full transition-all duration-300 <?php echo 0 === $index ? 'w-8 bg-midex-mint' : 'w-2 bg-white/40 hover:bg-white/70'; ?>" data-slide="<?php echo esc_attr( (string) $index ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Slide %d', 'midex' ), $index + 1 ) ); ?>"></button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Our Events — uses every file in assets/images/events/.
 *
 * @return string
 */
function midex_render_events_gallery_block() {
	$events = midex_list_images( 'events' );

	if ( empty( $events ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-section bg-white" data-midex-events>
		<div class="mx-container">
			<?php echo midex_section_heading( __( 'Our Events', 'midex' ), __( 'Exhibitions, project milestones, and industry showcases.', 'midex' ) ); ?>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<?php foreach ( $events as $i => $image ) : ?>
					<figure class="mx-reveal group relative overflow-hidden rounded-2xl <?php echo 0 === $i % 5 ? 'sm:col-span-2 sm:row-span-2' : ''; ?>" style="transition-delay:<?php echo esc_attr( (string) ( $i * 60 ) ); ?>ms">
						<button type="button" class="block w-full text-left" data-event-open="<?php echo esc_url( midex_asset_url( $image ) ); ?>" aria-label="<?php echo esc_attr( midex_event_caption( $image ) ); ?>">
							<img class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 <?php echo 0 === $i % 5 ? 'sm:aspect-auto sm:min-h-[420px]' : ''; ?>" src="<?php echo esc_url( midex_asset_url( $image ) ); ?>" alt="<?php echo esc_attr( midex_event_caption( $image ) ); ?>" loading="lazy" />
							<div class="absolute inset-0 bg-gradient-to-t from-midex-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							<figcaption class="absolute bottom-0 left-0 right-0 translate-y-full p-4 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
								<?php echo esc_html( midex_event_caption( $image ) ); ?>
								<span class="mt-1 block text-xs text-white/70"><?php esc_html_e( 'View image', 'midex' ); ?></span>
							</figcaption>
						</button>
					</figure>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="fixed inset-0 z-[100] hidden items-center justify-center bg-midex-navy/90 p-4 backdrop-blur-sm" data-event-lightbox aria-hidden="true">
			<button type="button" class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" data-event-close aria-label="<?php esc_attr_e( 'Close', 'midex' ); ?>">✕</button>
			<img class="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl" src="" alt="" data-event-lightbox-img />
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Collaboration banner with event image.
 *
 * @return string
 */
function midex_render_collab_banner_block() {
	$events   = midex_list_images( 'events' );
	$side_img = ! empty( $events ) ? $events[ min( 3, count( $events ) - 1 ) ] : '';

	ob_start();
	?>
	<section class="mx-reveal mx-container -mt-8 relative z-30">
		<div class="overflow-hidden rounded-2xl border border-midex-mint/30 bg-gradient-to-r from-midex-mint via-midex-mint-light to-midex-mint p-[1px] shadow-2xl shadow-midex-mint/20">
			<div class="grid overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm lg:grid-cols-[1fr_auto]">
				<div class="flex flex-col justify-center gap-6 px-8 py-8 lg:px-12">
					<div>
						<p class="text-xs font-semibold uppercase tracking-widest text-midex-blue"><?php esc_html_e( 'Announcement', 'midex' ); ?></p>
						<h2 class="mt-2 font-display text-2xl font-bold text-midex-navy lg:text-3xl"><?php esc_html_e( 'New Line In Collaboration With Midex', 'midex' ); ?></h2>
					</div>
					<a class="mx-btn mx-btn-primary w-fit shrink-0" href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Read more', 'midex' ); ?> →</a>
				</div>
				<?php if ( $side_img ) : ?>
					<div class="relative hidden min-h-[200px] w-full max-w-md overflow-hidden lg:block">
						<img class="h-full w-full object-cover" src="<?php echo esc_url( midex_asset_url( $side_img ) ); ?>" alt="" loading="lazy" />
						<div class="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Services grid — all assets/images/services/.
 *
 * @return string
 */
function midex_render_services_products_block() {
	$items = midex_get_service_products();

	if ( empty( $items ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-section mx-mesh-bg">
		<div class="mx-container">
			<?php echo midex_section_heading( __( 'Our Services Products', 'midex' ), __( 'Precision stainless steel services for pharmaceutical and hygienic industries.', 'midex' ) ); ?>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<?php foreach ( $items as $i => $item ) : ?>
					<article class="mx-card mx-reveal group" style="transition-delay:<?php echo esc_attr( (string) ( $i * 80 ) ); ?>ms">
						<a href="<?php echo esc_url( home_url( '/products/' ) ); ?>" class="relative block aspect-[4/3] overflow-hidden">
							<img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src="<?php echo esc_url( midex_asset_url( $item['image'] ) ); ?>" alt="<?php echo esc_attr( $item['title'] ); ?>" loading="lazy" />
							<div class="absolute inset-0 bg-gradient-to-t from-midex-navy/80 via-midex-navy/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"></div>
							<span class="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-midex-navy backdrop-blur-sm"><?php esc_html_e( 'Service', 'midex' ); ?></span>
						</a>
						<div class="p-6">
							<h3 class="font-display text-lg font-semibold text-midex-navy">
								<a class="transition-colors hover:text-midex-blue" href="<?php echo esc_url( home_url( '/products/' ) ); ?>"><?php echo esc_html( $item['title'] ); ?></a>
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-midex-gray/75"><?php echo esc_html( $item['excerpt'] ); ?></p>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * New products — all assets/images/products/.
 *
 * @return string
 */
function midex_render_new_products_block() {
	$items = midex_get_featured_products();

	if ( empty( $items ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-section bg-midex-navy relative overflow-hidden">
		<div class="pointer-events-none absolute inset-0 opacity-30" style="background-image:radial-gradient(circle at 1px 1px,rgba(132,206,205,0.15) 1px,transparent 0);background-size:32px 32px"></div>
		<div class="mx-container relative">
			<?php echo midex_section_heading( __( 'New Products', 'midex' ), __( 'Latest hygienic equipment — request a quote for pricing and lead times.', 'midex' ), 'text-center mx-auto', 'dark' ); ?>
			<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				<?php foreach ( $items as $i => $item ) : ?>
					<article class="mx-reveal group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-midex-mint/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-midex-mint/10" style="transition-delay:<?php echo esc_attr( (string) ( $i * 60 ) ); ?>ms">
						<div class="overflow-hidden rounded-xl bg-white/90 p-4">
							<img class="mx-auto h-36 w-full object-contain transition-transform duration-500 group-hover:scale-105" src="<?php echo esc_url( midex_asset_url( $item['image'] ) ); ?>" alt="<?php echo esc_attr( $item['title'] ); ?>" loading="lazy" />
						</div>
						<h3 class="mt-4 min-h-[3rem] font-display text-sm font-semibold leading-snug text-white"><?php echo esc_html( $item['title'] ); ?></h3>
						<a class="mx-btn mx-btn-mint mt-4 w-full text-center text-xs" href="<?php echo esc_url( add_query_arg( 'item', rawurlencode( $item['title'] ), midex_get_quote_url() ) ); ?>"><?php esc_html_e( 'Request', 'midex' ); ?></a>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * All partner + exclusive logos.
 *
 * @return string
 */
function midex_render_trademark_partners_block() {
	$trademark = midex_get_trademark_partners();
	$exclusive = midex_get_exclusive_partners();
	$all       = array_merge( $trademark, $exclusive );

	if ( empty( $all ) ) {
		return '';
	}

	$dup = array_merge( $all, $all );

	ob_start();
	?>
	<section class="mx-section overflow-hidden bg-midex-surface">
		<div class="mx-container mb-10">
			<?php echo midex_section_heading( __( 'Our Trade mark', 'midex' ), __( 'Trusted global partners in process technology.', 'midex' ) ); ?>
		</div>
		<div class="relative mb-16">
			<div class="flex w-max animate-marquee gap-8 px-4">
				<?php foreach ( $dup as $partner ) : ?>
					<div class="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-midex-navy/5 bg-white px-6 shadow-sm transition-transform duration-300 hover:scale-105">
						<img class="max-h-12 max-w-full object-contain" src="<?php echo esc_url( midex_asset_url( $partner['image'] ) ); ?>" alt="<?php echo esc_attr( $partner['name'] ); ?>" loading="lazy" />
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php if ( ! empty( $exclusive ) ) : ?>
			<div class="mx-container">
				<?php echo midex_section_heading( __( 'Exclusive Trade mark', 'midex' ), '', 'text-center mx-auto' ); ?>
				<div class="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
					<?php foreach ( $exclusive as $partner ) : ?>
						<div class="mx-reveal flex h-28 w-48 items-center justify-center rounded-2xl border border-midex-mint/30 bg-white p-6 shadow-lg">
							<img class="max-h-16 object-contain" src="<?php echo esc_url( midex_asset_url( $partner['image'] ) ); ?>" alt="<?php echo esc_attr( $partner['name'] ); ?>" loading="lazy" />
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Animated stats.
 *
 * @return string
 */
function midex_render_stats_counter_block() {
	$stats = array(
		array( 'value' => 465, 'label' => __( 'Our Clients', 'midex' ) ),
		array( 'value' => 255, 'label' => __( 'Consultations', 'midex' ) ),
		array( 'value' => 363, 'label' => __( 'Our Projects', 'midex' ) ),
		array( 'value' => 122, 'label' => __( 'Our Solutions', 'midex' ) ),
	);

	ob_start();
	?>
	<section class="mx-reveal relative overflow-hidden bg-gradient-to-br from-midex-navy via-midex-navy-dark to-midex-navy py-16">
		<div class="mx-container relative grid grid-cols-2 gap-8 lg:grid-cols-4">
			<?php foreach ( $stats as $stat ) : ?>
				<div class="text-center">
					<strong class="font-display text-5xl font-bold text-midex-mint lg:text-6xl" data-count="<?php echo esc_attr( (string) $stat['value'] ); ?>">0</strong>
					<span class="mt-2 block text-sm font-medium uppercase tracking-wider text-white/70"><?php echo esc_html( $stat['label'] ); ?></span>
				</div>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Testimonials.
 *
 * @return string
 */
function midex_render_testimonials_block() {
	ob_start();
	?>
	<section class="mx-section">
		<div class="mx-container">
			<?php echo midex_section_heading( __( 'Testimonial', 'midex' ), __( 'What our clients and team say about Midex.', 'midex' ) ); ?>
			<div class="grid gap-6 md:grid-cols-2">
				<?php foreach ( midex_get_testimonials() as $i => $item ) : ?>
					<blockquote class="mx-reveal relative rounded-2xl border border-midex-navy/5 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style="transition-delay:<?php echo esc_attr( (string) ( $i * 100 ) ); ?>ms">
						<p class="text-base leading-relaxed text-midex-gray/90 italic"><?php echo esc_html( $item['quote'] ); ?></p>
						<footer class="mt-6 flex items-center gap-3 border-t border-midex-surface pt-6">
							<div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-midex-mint to-midex-blue font-display text-sm font-bold text-white"><?php echo esc_html( mb_substr( $item['name'], 0, 1 ) ); ?></div>
							<div>
								<strong class="block font-display text-sm font-semibold text-midex-navy"><?php echo esc_html( $item['name'] ); ?></strong>
								<span class="text-xs text-midex-gray/70"><?php echo esc_html( $item['role'] ); ?></span>
							</div>
						</footer>
					</blockquote>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Latest news — project highlights with dedicated images.
 *
 * @return string
 */
function midex_render_latest_news_block() {
	$items = midex_get_news_items();

	if ( empty( $items ) ) {
		return '';
	}

	ob_start();
	?>
	<section class="mx-section bg-midex-surface">
		<div class="mx-container">
			<?php echo midex_section_heading( __( 'Check Out Latest News', 'midex' ), __( 'Recent project completions and upgrades across Egypt.', 'midex' ) ); ?>
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<?php foreach ( $items as $i => $item ) : ?>
					<article class="mx-card mx-reveal group flex flex-col overflow-hidden" style="transition-delay:<?php echo esc_attr( (string) ( $i * 80 ) ); ?>ms">
						<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="relative block aspect-video overflow-hidden">
							<img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src="<?php echo esc_url( midex_asset_url( $item['image'] ) ); ?>" alt="<?php echo esc_attr( $item['title'] ); ?>" loading="lazy" />
							<span class="absolute left-4 top-4 rounded-full bg-midex-navy/90 px-3 py-1 text-xs font-semibold text-white"><?php echo esc_html( $item['date'] ); ?></span>
						</a>
						<div class="flex flex-1 flex-col p-6">
							<h3 class="font-display text-lg font-semibold text-midex-navy">
								<a class="transition-colors hover:text-midex-blue" href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php echo esc_html( $item['title'] ); ?></a>
							</h3>
							<p class="mt-2 flex-1 text-sm text-midex-gray/75"><?php echo esc_html( $item['excerpt'] ); ?></p>
							<a class="mt-4 text-sm font-semibold text-midex-blue" href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Read more →', 'midex' ); ?></a>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Client logos — all assets/images/clients/.
 *
 * @return string
 */
function midex_render_clients_logos_block() {
	$images = midex_list_images( 'clients' );

	if ( empty( $images ) ) {
		return '';
	}

	$row = array();

	foreach ( $images as $image ) {
		$row[] = midex_asset_url( $image );
	}

	$row = array_merge( $row, $row );

	ob_start();
	?>
	<section class="mx-section overflow-hidden bg-white">
		<div class="mx-container mb-12">
			<?php echo midex_section_heading( __( 'Our Clients', 'midex' ), __( 'Leading pharmaceutical, food, and industrial brands trust Midex.', 'midex' ) ); ?>
		</div>
		<div class="flex w-max animate-marquee gap-10 px-4">
			<?php foreach ( $row as $url ) : ?>
				<div class="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-midex-navy/5 bg-midex-surface p-4 shadow-sm">
					<img class="max-h-12 max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0" src="<?php echo esc_url( $url ); ?>" alt="" loading="lazy" />
				</div>
			<?php endforeach; ?>
		</div>
		<div class="mt-8 flex w-max animate-marquee-reverse gap-10 px-4" style="animation-duration:45s">
			<?php foreach ( array_reverse( $row ) as $url ) : ?>
				<div class="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-midex-navy/5 bg-midex-surface p-4 shadow-sm">
					<img class="max-h-12 max-w-full object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0" src="<?php echo esc_url( $url ); ?>" alt="" loading="lazy" />
				</div>
			<?php endforeach; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Latest blog — fallback thumbnails from asset pool.
 *
 * @return string
 */
function midex_render_latest_blog_block() {
	$posts = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 4,
			'post_status'    => 'publish',
		)
	);

	ob_start();
	?>
	<section class="mx-section">
		<div class="mx-container">
			<?php echo midex_section_heading( __( 'Check Out Latest BLOG', 'midex' ), __( 'Insights on pharmaceutical water systems, welding, and hygienic design.', 'midex' ) ); ?>
			<?php if ( empty( $posts ) ) : ?>
				<p class="text-center text-midex-gray/70"><?php esc_html_e( 'No blog posts yet.', 'midex' ); ?></p>
			<?php else : ?>
				<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<?php foreach ( $posts as $i => $post ) : ?>
						<article class="mx-card mx-reveal group flex flex-col" style="transition-delay:<?php echo esc_attr( (string) ( $i * 80 ) ); ?>ms">
							<a href="<?php echo esc_url( get_permalink( $post ) ); ?>" class="block aspect-video overflow-hidden bg-midex-surface">
								<?php if ( has_post_thumbnail( $post ) ) : ?>
									<?php echo get_the_post_thumbnail( $post, 'medium_large', array( 'class' => 'h-full w-full object-cover transition-transform duration-700 group-hover:scale-110' ) ); ?>
								<?php else : ?>
									<img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src="<?php echo esc_url( midex_blog_fallback_image( $i ) ); ?>" alt="" loading="lazy" />
								<?php endif; ?>
							</a>
							<div class="flex flex-1 flex-col p-6">
								<time class="text-xs font-semibold uppercase tracking-wider text-midex-blue"><?php echo esc_html( get_the_date( 'M j, Y', $post ) ); ?></time>
								<h3 class="mt-2 font-display text-base font-semibold leading-snug text-midex-navy">
									<a class="transition-colors hover:text-midex-blue" href="<?php echo esc_url( get_permalink( $post ) ); ?>"><?php echo esc_html( get_the_title( $post ) ); ?></a>
								</h3>
								<p class="mt-2 flex-1 text-sm text-midex-gray/75 line-clamp-3"><?php echo esc_html( wp_trim_words( get_the_excerpt( $post ), 18 ) ); ?></p>
								<a class="mt-4 text-sm font-semibold text-midex-blue transition-colors hover:text-midex-navy" href="<?php echo esc_url( get_permalink( $post ) ); ?>"><?php esc_html_e( 'Read more →', 'midex' ); ?></a>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Enqueue animations script site-wide.
 */
function midex_enqueue_home_scripts() {
	wp_enqueue_script(
		'midex-home',
		midex_asset_url( 'js/home.js' ),
		array(),
		MIDEX_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'midex_enqueue_home_scripts' );
