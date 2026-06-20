<?php
/**
 * Contact and quote request form.
 *
 * @package Midex
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether the current request is a contact page (any Polylang translation).
 *
 * @return bool
 */
function midex_is_contact_page() {
	if ( ! is_page() ) {
		return false;
	}

	$contact = get_page_by_path( 'contact' );

	if ( ! $contact ) {
		return is_page( 'contact' );
	}

	$current_id = (int) get_queried_object_id();

	if ( $current_id === (int) $contact->ID ) {
		return true;
	}

	if ( function_exists( 'pll_get_post' ) ) {
		foreach ( array( 'en', 'ar', 'de' ) as $lang ) {
			$translated = (int) pll_get_post( $contact->ID, $lang );

			if ( $translated && $translated === $current_id ) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Handle contact form POST submissions.
 */
function midex_handle_contact_form_submission() {
	if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
		return;
	}

	if ( empty( $_POST['midex_contact_form'] ) ) {
		return;
	}

	if ( ! midex_is_contact_page() ) {
		return;
	}

	if ( ! isset( $_POST['midex_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['midex_contact_nonce'] ) ), 'midex_contact_form' ) ) {
		midex_set_contact_form_notice( 'error', __( 'Security check failed. Please refresh the page and try again.', 'midex' ) );
		return;
	}

	if ( ! empty( $_POST['midex_company_website'] ) ) {
		midex_set_contact_form_notice( 'success', __( 'Thank you. Our team will get back to you shortly.', 'midex' ) );
		return;
	}

	$name    = sanitize_text_field( wp_unslash( $_POST['midex_name'] ?? '' ) );
	$email   = sanitize_email( wp_unslash( $_POST['midex_email'] ?? '' ) );
	$phone   = sanitize_text_field( wp_unslash( $_POST['midex_phone'] ?? '' ) );
	$company = sanitize_text_field( wp_unslash( $_POST['midex_company'] ?? '' ) );
	$subject = sanitize_text_field( wp_unslash( $_POST['midex_subject'] ?? '' ) );
	$item    = sanitize_text_field( wp_unslash( $_POST['midex_item'] ?? '' ) );
	$message = sanitize_textarea_field( wp_unslash( $_POST['midex_message'] ?? '' ) );

	$errors = array();

	if ( '' === $name ) {
		$errors[] = __( 'Please enter your name.', 'midex' );
	}

	if ( '' === $email || ! is_email( $email ) ) {
		$errors[] = __( 'Please enter a valid email address.', 'midex' );
	}

	if ( '' === $message ) {
		$errors[] = __( 'Please enter your message.', 'midex' );
	}

	if ( ! empty( $errors ) ) {
		midex_set_contact_form_notice( 'error', implode( ' ', $errors ) );
		return;
	}

	$allowed_subjects = array(
		'quote'   => __( 'Quote request', 'midex' ),
		'product' => __( 'Product inquiry', 'midex' ),
		'general' => __( 'General inquiry', 'midex' ),
	);

	$subject_label = $allowed_subjects[ $subject ] ?? $allowed_subjects['general'];

	$lines = array(
		sprintf( '%s: %s', __( 'Name', 'midex' ), $name ),
		sprintf( '%s: %s', __( 'Email', 'midex' ), $email ),
	);

	if ( $phone ) {
		$lines[] = sprintf( '%s: %s', __( 'Phone', 'midex' ), $phone );
	}

	if ( $company ) {
		$lines[] = sprintf( '%s: %s', __( 'Company', 'midex' ), $company );
	}

	$lines[] = sprintf( '%s: %s', __( 'Subject', 'midex' ), $subject_label );

	if ( $item ) {
		$lines[] = sprintf( '%s: %s', __( 'Product / item', 'midex' ), $item );
	}

	$lines[] = '';
	$lines[] = __( 'Message', 'midex' ) . ':';
	$lines[] = $message;
	$lines[] = '';
	$lines[] = sprintf( '%s: %s', __( 'Sent from', 'midex' ), home_url( add_query_arg( array(), remove_query_arg( 'midex_sent' ) ) ) );

	$mail_subject = sprintf(
		'[%s] %s%s',
		get_bloginfo( 'name' ),
		$subject_label,
		$item ? ' — ' . $item : ''
	);

	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		'Reply-To: ' . $name . ' <' . $email . '>',
	);

	$sent = wp_mail( 'sales@midex-eg.com', $mail_subject, implode( "\n", $lines ), $headers );

	if ( $sent ) {
		midex_set_contact_form_notice( 'success', __( 'Thank you for your message. Our team will respond within one business day.', 'midex' ) );
	} else {
		midex_set_contact_form_notice( 'error', __( 'We could not send your message. Please email us directly at sales@midex-eg.com.', 'midex' ) );
	}
}
add_action( 'template_redirect', 'midex_handle_contact_form_submission', 5 );

/**
 * Store a one-time form notice in a transient keyed to the visitor IP hash.
 *
 * @param string $type success|error.
 * @param string $message Notice text.
 */
function midex_set_contact_form_notice( $type, $message ) {
	set_transient( midex_contact_form_notice_key(), compact( 'type', 'message' ), MINUTE_IN_SECONDS * 5 );
}

/**
 * @return string
 */
function midex_contact_form_notice_key() {
	return 'midex_contact_notice_' . md5( ( $_SERVER['REMOTE_ADDR'] ?? 'unknown' ) . ( $_SERVER['HTTP_USER_AGENT'] ?? '' ) );
}

/**
 * @return array{type?: string, message?: string}|null
 */
function midex_get_contact_form_notice() {
	$key    = midex_contact_form_notice_key();
	$notice = get_transient( $key );

	if ( $notice ) {
		delete_transient( $key );
	}

	return is_array( $notice ) ? $notice : null;
}

/**
 * Default values for the contact form fields.
 *
 * @return array<string, string>
 */
function midex_contact_form_defaults() {
	$defaults = array(
		'name'    => '',
		'email'   => '',
		'phone'   => '',
		'company' => '',
		'subject' => 'quote',
		'item'    => '',
		'message' => '',
	);

	if ( ! empty( $_GET['item'] ) ) {
		$defaults['item']    = sanitize_text_field( wp_unslash( $_GET['item'] ) );
		$defaults['subject'] = 'quote';
	}

	if ( 'POST' === ( $_SERVER['REQUEST_METHOD'] ?? '' ) && ! empty( $_POST['midex_contact_form'] ) ) {
		$defaults['name']    = sanitize_text_field( wp_unslash( $_POST['midex_name'] ?? '' ) );
		$defaults['email']   = sanitize_email( wp_unslash( $_POST['midex_email'] ?? '' ) );
		$defaults['phone']   = sanitize_text_field( wp_unslash( $_POST['midex_phone'] ?? '' ) );
		$defaults['company'] = sanitize_text_field( wp_unslash( $_POST['midex_company'] ?? '' ) );
		$defaults['subject'] = sanitize_text_field( wp_unslash( $_POST['midex_subject'] ?? 'quote' ) );
		$defaults['item']    = sanitize_text_field( wp_unslash( $_POST['midex_item'] ?? '' ) );
		$defaults['message'] = sanitize_textarea_field( wp_unslash( $_POST['midex_message'] ?? '' ) );
	}

	return $defaults;
}

/**
 * Render the contact / quote request form.
 *
 * @return string
 */
function midex_render_contact_form() {
	$defaults = midex_contact_form_defaults();
	$notice   = midex_get_contact_form_notice();

	ob_start();
	?>
	<section class="midex-contact-form-section mx-reveal">
		<div class="midex-contact-form-card">
			<h2 class="font-display text-2xl font-bold text-midex-navy"><?php esc_html_e( 'Send us a message', 'midex' ); ?></h2>
			<p class="mt-2 text-sm text-midex-gray/80"><?php esc_html_e( 'Fill in the form below and our sales team will respond with pricing, availability, or technical guidance.', 'midex' ); ?></p>

			<?php if ( $notice ) : ?>
				<div class="midex-form-notice midex-form-notice--<?php echo esc_attr( $notice['type'] ?? 'success' ); ?>" role="status">
					<?php echo esc_html( $notice['message'] ?? '' ); ?>
				</div>
			<?php endif; ?>

			<?php if ( $defaults['item'] ) : ?>
				<div class="midex-form-context">
					<strong><?php esc_html_e( 'Quote request for:', 'midex' ); ?></strong>
					<?php echo esc_html( $defaults['item'] ); ?>
				</div>
			<?php endif; ?>

			<form class="midex-contact-form" method="post" action="<?php echo esc_url( get_permalink() ); ?>">
				<input type="hidden" name="midex_contact_form" value="1" />
				<?php wp_nonce_field( 'midex_contact_form', 'midex_contact_nonce' ); ?>

				<div class="midex-form-grid">
					<div class="midex-form-field">
						<label for="midex_name"><?php esc_html_e( 'Full name', 'midex' ); ?> <span aria-hidden="true">*</span></label>
						<input type="text" id="midex_name" name="midex_name" value="<?php echo esc_attr( $defaults['name'] ); ?>" required autocomplete="name" />
					</div>

					<div class="midex-form-field">
						<label for="midex_email"><?php esc_html_e( 'Email', 'midex' ); ?> <span aria-hidden="true">*</span></label>
						<input type="email" id="midex_email" name="midex_email" value="<?php echo esc_attr( $defaults['email'] ); ?>" required autocomplete="email" />
					</div>

					<div class="midex-form-field">
						<label for="midex_phone"><?php esc_html_e( 'Phone', 'midex' ); ?></label>
						<input type="tel" id="midex_phone" name="midex_phone" value="<?php echo esc_attr( $defaults['phone'] ); ?>" autocomplete="tel" />
					</div>

					<div class="midex-form-field">
						<label for="midex_company"><?php esc_html_e( 'Company', 'midex' ); ?></label>
						<input type="text" id="midex_company" name="midex_company" value="<?php echo esc_attr( $defaults['company'] ); ?>" autocomplete="organization" />
					</div>

					<div class="midex-form-field midex-form-field--full">
						<label for="midex_subject"><?php esc_html_e( 'Subject', 'midex' ); ?></label>
						<select id="midex_subject" name="midex_subject">
							<option value="quote" <?php selected( $defaults['subject'], 'quote' ); ?>><?php esc_html_e( 'Quote request', 'midex' ); ?></option>
							<option value="product" <?php selected( $defaults['subject'], 'product' ); ?>><?php esc_html_e( 'Product inquiry', 'midex' ); ?></option>
							<option value="general" <?php selected( $defaults['subject'], 'general' ); ?>><?php esc_html_e( 'General inquiry', 'midex' ); ?></option>
						</select>
					</div>

					<div class="midex-form-field midex-form-field--full">
						<label for="midex_item"><?php esc_html_e( 'Product / project (optional)', 'midex' ); ?></label>
						<input type="text" id="midex_item" name="midex_item" value="<?php echo esc_attr( $defaults['item'] ); ?>" placeholder="<?php esc_attr_e( 'e.g. Hygienic UV Unit, PW station, orbital welding', 'midex' ); ?>" />
					</div>

					<div class="midex-form-field midex-form-field--full">
						<label for="midex_message"><?php esc_html_e( 'Message', 'midex' ); ?> <span aria-hidden="true">*</span></label>
						<textarea id="midex_message" name="midex_message" rows="5" required placeholder="<?php esc_attr_e( 'Tell us about your requirements, quantities, timeline, or technical questions…', 'midex' ); ?>"><?php echo esc_textarea( $defaults['message'] ); ?></textarea>
					</div>
				</div>

				<div class="midex-form-honeypot" aria-hidden="true">
					<label for="midex_company_website"><?php esc_html_e( 'Company website', 'midex' ); ?></label>
					<input type="text" id="midex_company_website" name="midex_company_website" tabindex="-1" autocomplete="off" />
				</div>

				<button type="submit" class="mx-btn mx-btn-primary mt-6 w-full sm:w-auto">
					<?php esc_html_e( 'Send message', 'midex' ); ?> →
				</button>
			</form>
		</div>
	</section>
	<?php
	return ob_get_clean();
}

/**
 * Contact form block render callback.
 *
 * @return string
 */
function midex_render_contact_form_block() {
	return midex_render_contact_form();
}
