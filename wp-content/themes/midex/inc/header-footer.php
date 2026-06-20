<?php
/**
 * Site header and footer (PHP — avoids broken block navigation layout).
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Replace block template parts with PHP header/footer.
 *
 * @param string $block_content Block HTML.
 * @param array  $block         Block data.
 * @return string
 */
function midex_render_template_part( $block_content, $block ) {
	$slug = $block['attrs']['slug'] ?? '';

	if ( 'header' === $slug ) {
		return midex_render_site_header();
	}

	if ( 'footer' === $slug ) {
		return midex_render_site_footer();
	}

	return $block_content;
}
add_filter( 'render_block_core/template-part', 'midex_render_template_part', 10, 2 );

/**
 * Render site header.
 *
 * @return string
 */
function midex_render_site_header() {
	$overlay = is_front_page();

	$header_class = $overlay
		? 'midex-header midex-header--overlay fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent shadow-none transition-all duration-300'
		: 'midex-header sticky top-0 z-50 border-b border-midex-mint/30 bg-white/95 shadow-sm backdrop-blur-md';

	ob_start();
	?>
	<header class="<?php echo esc_attr( $header_class ); ?>" data-midex-header>
		<div class="mx-container">
			<div class="flex h-[72px] items-center justify-between gap-4">
				<a href="<?php echo esc_url( midex_home_url() ); ?>" class="midex-header__brand shrink-0">
					<img src="<?php echo esc_url( midex_asset_url( 'images/brand/logo-white.png' ) ); ?>" alt="<?php esc_attr_e( 'Midex', 'midex' ); ?>" class="midex-header__logo midex-header__logo--light h-12 w-auto max-w-[200px] sm:h-14 lg:h-[58px]" width="242" height="117" decoding="async" />
					<img src="<?php echo esc_url( midex_asset_url( 'images/brand/logo-dark.png' ) ); ?>" alt="<?php esc_attr_e( 'Midex', 'midex' ); ?>" class="midex-header__logo midex-header__logo--dark h-12 w-auto max-w-[200px] sm:h-14 lg:h-[58px]" width="242" height="117" decoding="async" />
				</a>

				<nav class="midex-header__nav hidden flex-1 items-center justify-center lg:flex" aria-label="<?php esc_attr_e( 'Primary', 'midex' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container'      => false,
							'menu_class'     => 'midex-menu flex flex-wrap items-center justify-center gap-1 xl:gap-2',
							'fallback_cb'    => 'midex_fallback_menu',
							'depth'          => 0,
							'walker'         => new Midex_Nav_Walker(),
						)
					);
					?>
				</nav>

				<div class="flex items-center gap-3">
					<?php echo midex_render_language_switcher( 'hidden sm:block' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="mx-btn mx-btn-primary hidden !py-2.5 !px-5 !text-sm sm:inline-flex">
						<?php esc_html_e( 'Contact Us', 'midex' ); ?>
					</a>
					<button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-midex-navy/10 text-midex-navy lg:hidden" data-midex-nav-toggle aria-expanded="false" aria-label="<?php esc_attr_e( 'Menu', 'midex' ); ?>">
						<svg class="h-5 w-5" data-icon-open fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
						<svg class="hidden h-5 w-5" data-icon-close fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
					</button>
				</div>
			</div>
		</div>

		<div class="midex-header__mobile fixed inset-x-0 top-[72px] z-40 hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-midex-navy/10 bg-white shadow-xl lg:hidden" data-midex-nav-panel>
			<nav class="mx-container py-3" aria-label="<?php esc_attr_e( 'Mobile navigation', 'midex' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'midex-menu-mobile',
						'fallback_cb'    => 'midex_fallback_menu',
						'depth'          => 0,
						'walker'         => new Midex_Nav_Walker( true ),
					)
				);
				?>
				<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="mx-btn mx-btn-primary mt-4 w-full justify-center">
					<?php esc_html_e( 'Contact Us', 'midex' ); ?>
				</a>
				<?php echo midex_render_language_switcher( 'mt-4 justify-center' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</nav>
		</div>
	</header>
	<?php
	return ob_get_clean();
}

/**
 * Render site footer.
 *
 * @return string
 */
function midex_render_site_footer() {
	ob_start();
	?>
	<footer class="midex-footer bg-midex-navy text-white">
		<div class="mx-container py-14 lg:py-16">
			<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
				<div>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-block">
						<img src="<?php echo esc_url( midex_asset_url( 'images/brand/logo-dark.png' ) ); ?>" alt="<?php esc_attr_e( 'Midex', 'midex' ); ?>" class="h-10 brightness-0 invert" />
					</a>
					<p class="mt-4 text-sm leading-relaxed text-white/60">
						<?php esc_html_e( 'Midex for Integrated Projects and Contracting — pharmaceutical, food & cosmetics engineering.', 'midex' ); ?>
					</p>
				</div>

				<div>
					<h3 class="font-display text-xs font-semibold uppercase tracking-widest text-midex-mint"><?php esc_html_e( 'Services', 'midex' ); ?></h3>
					<ul class="mt-4 space-y-2 text-sm">
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( get_post_type_archive_link( 'solution' ) ); ?>"><?php esc_html_e( 'All Solutions', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( get_post_type_archive_link( 'product' ) ); ?>"><?php esc_html_e( 'Products', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/solutions/group/systems/' ) ); ?>"><?php esc_html_e( 'Systems', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/solutions/group/welding/' ) ); ?>"><?php esc_html_e( 'Welding', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/solutions/group/installations/' ) ); ?>"><?php esc_html_e( 'Installations', 'midex' ); ?></a></li>
					</ul>
				</div>

				<div>
					<h3 class="font-display text-xs font-semibold uppercase tracking-widest text-midex-mint"><?php esc_html_e( 'Useful Links', 'midex' ); ?></h3>
					<ul class="mt-4 space-y-2 text-sm">
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>"><?php esc_html_e( 'About Us', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact Us', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/about-us/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'midex' ); ?></a></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Blog', 'midex' ); ?></a></li>
					</ul>
				</div>

				<div>
					<h3 class="font-display text-xs font-semibold uppercase tracking-wider text-midex-mint"><?php esc_html_e( 'Contact us', 'midex' ); ?></h3>
					<ul class="mt-4 space-y-2 text-sm leading-relaxed text-white/75">
						<li><?php esc_html_e( '29 Al Mehwar Al Markazi, 6th of October City, Giza', 'midex' ); ?></li>
						<li><a class="text-white/75 transition-colors hover:text-midex-mint" href="tel:+201026228403">01026228403</a> / <a class="text-white/75 transition-colors hover:text-midex-mint" href="tel:+201006683803">01006683803</a></li>
						<li><a class="text-midex-mint transition-colors hover:text-white" href="mailto:sales@midex-eg.com">sales@midex-eg.com</a></li>
					</ul>
				</div>
			</div>

			<div class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
				<?php esc_html_e( '© Midex for Integrated Projects and Contracting. All rights reserved.', 'midex' ); ?>
			</div>
		</div>
	</footer>
	<?php
	return ob_get_clean();
}

/**
 * Simple fallback menu.
 */
function midex_fallback_menu() {
	echo '<ul class="midex-menu flex items-center gap-4"><li><a href="' . esc_url( home_url( '/' ) ) . '">Home</a></li></ul>';
}

/**
 * Tailwind nav walker.
 */
class Midex_Nav_Walker extends Walker_Nav_Menu {

	/** @var bool */
	private $mobile;

	/** @var WP_Post|null */
	private $mobile_parent;

	/**
	 * @param bool $mobile Mobile layout.
	 */
	public function __construct( $mobile = false ) {
		$this->mobile = $mobile;
	}

	/**
	 * @param string   $output Output.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 * @param int      $id     ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$has_children = in_array( 'menu-item-has-children', $item->classes, true );
		$is_active    = in_array( 'current-menu-item', $item->classes, true ) || in_array( 'current-menu-ancestor', $item->classes, true );

		if ( $this->mobile ) {
			$this->start_el_mobile( $output, $item, $depth, $has_children, $is_active );
			return;
		}

		if ( 0 === $depth ) {
			$li_class = 'relative group';
			$output  .= '<li class="' . esc_attr( $li_class ) . '">';

			$link_class = 'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' . ( $is_active ? 'bg-midex-surface text-midex-navy' : 'text-midex-navy hover:bg-midex-surface hover:text-midex-blue' );

			$output .= '<a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">';
			$output .= esc_html( $item->title );
			if ( $has_children ) {
				$output .= '<svg class="h-3.5 w-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';
			}
			$output .= '</a>';
			return;
		}

		if ( 1 === $depth ) {
			$li_class = $has_children ? 'relative group/sub' : '';
			$output  .= '<li class="' . esc_attr( trim( $li_class ) ) . '">';

			$link_class = 'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ' . ( $is_active ? 'bg-midex-surface text-midex-blue font-medium' : 'text-midex-gray hover:bg-midex-surface hover:text-midex-navy' );

			$output .= '<a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">';
			$output .= esc_html( $item->title );
			if ( $has_children ) {
				$output .= '<svg class="h-3.5 w-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
			}
			$output .= '</a>';
			return;
		}

		$link_class = 'block rounded-md px-3 py-2 text-sm transition-colors ' . ( $is_active ? 'bg-midex-surface text-midex-blue font-medium' : 'text-midex-gray hover:bg-midex-surface hover:text-midex-navy' );
		$output    .= '<li><a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
	}

	/**
	 * Mobile menu item markup.
	 *
	 * @param string   $output       Output.
	 * @param WP_Post  $item         Item.
	 * @param int      $depth        Depth.
	 * @param bool     $has_children Has children.
	 * @param bool     $is_active    Is active.
	 */
	private function start_el_mobile( &$output, $item, $depth, $has_children, $is_active ) {
		if ( 0 === $depth ) {
			if ( $has_children ) {
				$this->mobile_parent = $item;
				$is_open             = $is_active;

				$output .= '<li class="midex-mobile-nav__item border-b border-midex-navy/8">';
				$output .= '<div class="flex items-stretch">';
				$output .= '<a class="flex flex-1 items-center px-4 py-3 font-display text-[15px] font-semibold text-midex-navy no-underline' . ( $is_active ? ' text-midex-blue' : '' ) . '" href="' . esc_url( $item->url ) . '">';
				$output .= esc_html( $item->title );
				$output .= '</a>';
				$output .= '<button type="button" class="midex-mobile-nav__toggle flex w-11 shrink-0 items-center justify-center border-l border-midex-navy/8 text-midex-navy/50 transition-colors hover:bg-midex-surface hover:text-midex-navy" data-mobile-nav-toggle aria-expanded="' . ( $is_open ? 'true' : 'false' ) . '" aria-label="' . esc_attr( sprintf( __( 'Toggle %s submenu', 'midex' ), $item->title ) ) . '">';
				$output .= '<svg class="h-4 w-4 transition-transform duration-200' . ( $is_open ? ' rotate-180' : '' ) . '" data-chevron fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';
				$output .= '</button>';
				$output .= '</div>';
				return;
			}

			$this->mobile_parent = null;
			$link_class          = 'block px-4 py-3 font-display text-[15px] font-semibold text-midex-navy no-underline transition-colors hover:bg-midex-surface/80' . ( $is_active ? ' bg-midex-surface text-midex-blue' : '' );

			$output .= '<li class="border-b border-midex-navy/8">';
			$output .= '<a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">';
			$output .= esc_html( $item->title );
			$output .= '</a></li>';
			return;
		}

		if ( 1 === $depth ) {
			if ( $has_children ) {
				$output .= '<li class="pt-2 first:pt-0">';
				$output .= '<a class="block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-midex-navy/55 no-underline transition-colors hover:text-midex-blue' . ( $is_active ? ' text-midex-blue' : '' ) . '" href="' . esc_url( $item->url ) . '">';
				$output .= esc_html( $item->title );
				$output .= '</a>';
				return;
			}

			$link_class = 'block rounded-md px-3 py-2 text-sm text-midex-gray no-underline transition-colors hover:bg-white hover:text-midex-navy' . ( $is_active ? ' bg-white font-medium text-midex-blue' : '' );
			$output    .= '<li><a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
			return;
		}

		$link_class = 'block rounded-md px-3 py-1.5 text-sm text-midex-gray/90 no-underline transition-colors hover:bg-white hover:text-midex-navy' . ( $is_active ? ' bg-white font-medium text-midex-blue' : '' );
		$output    .= '<li><a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a></li>';
	}

	/**
	 * @param string   $output Output.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		if ( $this->mobile ) {
			if ( 1 === $depth && in_array( 'menu-item-has-children', $item->classes, true ) ) {
				$output .= '</li>';
				return;
			}

			if ( 0 === $depth && in_array( 'menu-item-has-children', $item->classes, true ) ) {
				$output .= '</li>';
				$this->mobile_parent = null;
			}
			return;
		}

		if ( $depth < 2 ) {
			$output .= '</li>';
		}
	}

	/**
	 * @param string   $output Output.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		if ( $this->mobile ) {
			if ( 0 === $depth ) {
				$is_open = $this->mobile_parent && (
					in_array( 'current-menu-item', $this->mobile_parent->classes, true )
					|| in_array( 'current-menu-ancestor', $this->mobile_parent->classes, true )
				);

				$output .= '<ul class="midex-mobile-nav__sub space-y-0.5 bg-midex-surface/60 px-2 pb-3 pt-1' . ( $is_open ? '' : ' hidden' ) . '">';
				return;
			}

			$output .= '<ul class="mt-0.5 space-y-0.5 pb-1 pl-1">';
			return;
		}

		if ( 0 === $depth ) {
			$output .= '<ul class="invisible absolute left-0 top-full z-50 min-w-[240px] translate-y-2 rounded-xl border border-midex-navy/5 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">';
			return;
		}

		$output .= '<ul class="invisible absolute left-full top-0 z-50 ml-1 min-w-[240px] rounded-xl border border-midex-navy/5 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">';
	}

	/**
	 * @param string   $output Output.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '</ul>';
	}
}
