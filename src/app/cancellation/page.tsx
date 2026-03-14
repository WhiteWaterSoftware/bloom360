import PolicyLayout from "@/components/PolicyLayout";

export default function CancellationPolicyPage() {
  return (
    <PolicyLayout
      title="Membership Cancellation Policy"
      lastUpdated="Last Updated: May 1, 2026"
    >
      <p>
        We understand that circumstances change. This Cancellation Policy explains how to cancel your Bloom360 membership,
        what to expect during and after the cancellation process, and how billing is handled.
      </p>

      <h2>How to Cancel</h2>
      <p>
        You may cancel your Bloom360 membership at any time through one of the following methods:
      </p>
      <ul>
        <li><strong>Account Settings:</strong> Log in to your Bloom360 account and navigate to your membership settings to initiate cancellation.</li>
        <li><strong>Email:</strong> Send a cancellation request to <a href="mailto:care@bloom360.com">care@bloom360.com</a> from the email address associated with your account.</li>
      </ul>
      <p>
        You will receive a confirmation of your cancellation request within two (2) business days. If you do not receive a
        confirmation, please contact us to ensure your request was received.
      </p>

      <h2>30-Day Notice Requirement</h2>
      <p>
        Because Bloom360 provides relationship-based care, we require a minimum of thirty (30) days&apos; notice before your
        cancellation takes effect. This notice period allows your care team to wrap up any ongoing care, provide referrals if
        needed, and ensure a smooth transition.
      </p>
      <p>
        During the 30-day notice period, you will continue to have full access to all of your membership benefits, including
        scheduled telehealth visits, asynchronous messaging with your care team, care coordination, and health records.
      </p>

      <h2>When Cancellation Takes Effect</h2>
      <p>
        Your cancellation will take effect at the end of your current billing cycle after the 30-day notice period has been
        fulfilled. For example, if your billing cycle renews on the 15th of each month and you submit a cancellation request
        on March 1st, your 30-day notice period ends on March 31st, and your membership will remain active through the end of
        the billing cycle that includes March 31st (April 15th in this example).
      </p>

      <h2>Billing During the Notice Period</h2>
      <p>
        Regular membership charges will continue during the 30-day notice period. You will not be charged for any billing
        periods that begin after your cancellation takes effect.
      </p>
      <p>
        <strong>Enrollment fees are non-refundable.</strong> The one-time enrollment fee you paid when joining Bloom360 is not
        eligible for refund upon cancellation.
      </p>

      <h2>Refunds</h2>
      <p>
        Bloom360 does not provide prorated refunds for partial billing periods. If you cancel mid-cycle, you will retain access
        to your membership benefits for the remainder of that billing period, but no refund will be issued for the unused
        portion.
      </p>
      <p>
        If you believe you were charged in error, please contact us at{" "}
        <a href="mailto:care@bloom360.com">care@bloom360.com</a> within 30 days of the charge. We will review your request
        and respond within 30 days.
      </p>

      <h2>Couple Memberships</h2>
      <p>
        If you are enrolled in a couple membership, either member may cancel their individual participation without affecting
        the other member&apos;s enrollment. Upon one member&apos;s cancellation, the remaining member&apos;s plan will
        transition to the individual membership rate at the start of the next billing cycle following the cancellation
        effective date.
      </p>

      <h2>Cancellation by Bloom360</h2>
      <p>
        Bloom360 reserves the right to cancel or suspend your membership under certain circumstances. In most cases, we will
        provide at least thirty (30) days&apos; advance notice before cancelling your membership. However, we may cancel or
        suspend your membership immediately and without notice in the following situations:
      </p>
      <ul>
        <li><strong>Safety Concerns:</strong> Conduct that threatens the safety of our staff, providers, or other members.</li>
        <li><strong>Fraud:</strong> Fraudulent activity, including providing false identity or health information.</li>
        <li><strong>Non-Payment:</strong> Failure to pay membership fees after reasonable notice and opportunity to cure.</li>
        <li><strong>Violation of Terms:</strong> Material violation of our Terms of Service, including prohibited conduct.</li>
      </ul>
      <p>
        If Bloom360 cancels your membership, we will make reasonable efforts to assist with care transition, including
        providing referrals and transferring your health records upon request.
      </p>

      <h2>Your Records After Cancellation</h2>
      <p>
        After your membership ends, Bloom360 will retain your health records in accordance with applicable state and federal
        law, which generally requires retention for a minimum of seven (7) years from the date of your last encounter. You
        may request copies of your health records at any time by contacting us at{" "}
        <a href="mailto:care@bloom360.com">care@bloom360.com</a>. We will process your request in accordance with applicable
        law and may charge a reasonable fee for copies as permitted.
      </p>

      <h2>Rejoining Bloom360</h2>
      <p>
        If you cancel your membership and later wish to rejoin, you are welcome back. Rejoining members will be subject to the
        current membership pricing at the time of re-enrollment. A new enrollment fee will apply. Your previous health records
        will be available to your care team (subject to our retention policies), which helps ensure continuity of care.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Cancellation Policy or need assistance with the cancellation process, please contact
        us:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:care@bloom360.com">care@bloom360.com</a></li>
      </ul>
    </PolicyLayout>
  );
}
