<?php
/**
 * Fallback template for block theme.
 *
 * @package Midex
 */

block_template_part( 'header' );
?>

<main class="wp-block-group">
	<?php
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			the_title( '<h1>', '</h1>' );
			the_content();
		}
	}
	?>
</main>

<?php
block_template_part( 'footer' );
