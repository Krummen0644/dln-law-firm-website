// Donald L. Nageleisen Attorney at Law - Payments Portal JavaScript

// Payment Provider Configuration
// TODO integrate - Add real merchant IDs and implement actual payment provider URLs
const PROVIDERS = {
  paypal: {
    enabled: true,
    merchantId: "YOUR_PAYPAL_ID", // TODO: Add real PayPal merchant ID
    buildUrl: (amountCents, memo) => {
      // TODO: Implement real PayPal payment URL
      return `#paypal-placeholder`;
    }
  },
  venmo: {
    enabled: true,
    handle: "YOUR_VENMO_HANDLE", // TODO: Add real Venmo handle
    buildUrl: (amountCents, memo) => {
      // TODO: Implement real Venmo payment URL
      return `#venmo-placeholder`;
    }
  },
  square: {
    enabled: true,
    locationId: "YOUR_SQUARE_LOC", // TODO: Add real Square location ID
    buildUrl: (amountCents, memo) => {
      // TODO: Implement real Square payment URL
      return `#square-placeholder`;
    }
  },
  cashapp: {
    enabled: true,
    handle: "$YourCashtag", // TODO: Add real Cash App cashtag
    buildUrl: (amountCents, memo) => {
      // TODO: Implement real Cash App payment URL
      return `#cashapp-placeholder`;
    }
  }
};

// Global state
let paymentData = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initPaymentForm();
  initPaymentMethods();
  initPaymentModal();
  initAmountFormatting();
});

/**
 * Initialize Payment Form Validation
 */
function initPaymentForm() {
  const form = document.getElementById('payment-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    clearValidationErrors();

    // Check honeypot field (spam prevention)
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value !== '') {
      console.log('Honeypot triggered - potential spam');
      return;
    }

    // Validate form
    const isValid = validatePaymentForm();

    if (isValid) {
      // Build payload
      const payload = buildPaymentPayload();

      // Log to console
      console.log('Payment form validated:', payload);

      // Save to sessionStorage
      sessionStorage.setItem('payments:lastPayload', JSON.stringify(payload));

      // Store in global state
      paymentData = payload;

      // Show payment methods section
      showPaymentMethods();
    }
  });
}

/**
 * Validate Payment Form
 */
function validatePaymentForm() {
  let isValid = true;
  const errors = [];

  // Validate name
  const name = document.getElementById('payer-name');
  if (!name.value.trim()) {
    showFieldError('payer-name', 'Please enter your full name');
    errors.push('Full name is required');
    isValid = false;
  }

  // Validate email
  const email = document.getElementById('payer-email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showFieldError('payer-email', 'Please enter a valid email address');
    errors.push('Valid email address is required');
    isValid = false;
  }

  // Validate Case/Reference ID
  const caseId = document.getElementById('case-id');
  const caseIdRegex = /^[A-Za-z0-9\-]{3,32}$/;
  if (!caseId.value.trim() || !caseIdRegex.test(caseId.value)) {
    showFieldError('case-id', 'Please enter a valid Case/Reference ID (3-32 characters, alphanumeric and dashes only)');
    errors.push('Valid Case/Reference ID is required');
    isValid = false;
  }

  // Validate matter type
  const matterType = document.getElementById('matter-type');
  if (!matterType.value) {
    showFieldError('matter-type', 'Please select a matter type');
    errors.push('Matter type is required');
    isValid = false;
  }

  // Validate amount
  const amount = document.getElementById('amount');
  const amountValue = parseFloat(amount.value.replace(/[$,]/g, ''));
  if (isNaN(amountValue) || amountValue < 1.00) {
    showFieldError('amount', 'Please enter a valid amount (minimum $1.00)');
    errors.push('Valid payment amount is required (minimum $1.00)');
    isValid = false;
  }

  // Validate required checkboxes
  const acknowledgeRelationship = document.getElementById('acknowledge-relationship');
  if (!acknowledgeRelationship.checked) {
    showFieldError('acknowledge-relationship', 'You must acknowledge this statement');
    errors.push('You must acknowledge the attorney-client relationship statement');
    isValid = false;
  }

  const acknowledgeConfidential = document.getElementById('acknowledge-confidential');
  if (!acknowledgeConfidential.checked) {
    showFieldError('acknowledge-confidential', 'You must acknowledge this statement');
    errors.push('You must acknowledge the confidentiality statement');
    isValid = false;
  }

  // Show validation summary if there are errors
  if (!isValid) {
    showValidationSummary(errors);
  }

  return isValid;
}

/**
 * Build Payment Payload
 */
function buildPaymentPayload() {
  const name = document.getElementById('payer-name').value.trim();
  const email = document.getElementById('payer-email').value.trim();
  const phone = document.getElementById('payer-phone').value.trim();
  const caseId = document.getElementById('case-id').value.trim();
  const matterType = document.getElementById('matter-type').value;
  const amount = document.getElementById('amount').value.replace(/[$,]/g, '');
  const amountCents = Math.round(parseFloat(amount) * 100);
  const notes = document.getElementById('notes').value.trim();
  const ts = new Date().toISOString();

  return {
    name,
    email,
    phone,
    caseId,
    matterType,
    amountCents,
    amountDollars: (amountCents / 100).toFixed(2),
    notes,
    ts
  };
}

/**
 * Show Field Error
 */
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);

  if (field) {
    field.classList.add('border-red-500');
    field.setAttribute('aria-invalid', 'true');
  }

  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.classList.remove('hidden');
  }
}

/**
 * Show Validation Summary
 */
function showValidationSummary(errors) {
  const summary = document.getElementById('validation-summary');
  const errorList = document.getElementById('error-list');

  if (!summary || !errorList) return;

  errorList.innerHTML = '';
  errors.forEach(error => {
    const li = document.createElement('li');
    li.textContent = error;
    errorList.appendChild(li);
  });

  summary.classList.remove('hidden');
  summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Clear Validation Errors
 */
function clearValidationErrors() {
  // Hide validation summary
  const summary = document.getElementById('validation-summary');
  if (summary) {
    summary.classList.add('hidden');
  }

  // Clear field errors
  const errorSpans = document.querySelectorAll('[id$="-error"]');
  errorSpans.forEach(span => {
    span.classList.add('hidden');
  });

  // Remove error styling from fields
  const fields = document.querySelectorAll('#payment-form input, #payment-form select, #payment-form textarea');
  fields.forEach(field => {
    field.classList.remove('border-red-500');
    field.removeAttribute('aria-invalid');
  });
}

/**
 * Show Payment Methods Section
 */
function showPaymentMethods() {
  const section = document.getElementById('payment-methods-section');
  if (section) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Initialize Payment Method Buttons
 */
function initPaymentMethods() {
  const buttons = document.querySelectorAll('.payment-method-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.getAttribute('data-provider');

      if (!paymentData) {
        alert('Please fill out the payment form first.');
        return;
      }

      if (!PROVIDERS[provider] || !PROVIDERS[provider].enabled) {
        alert('This payment method is currently unavailable. Please try another option.');
        return;
      }

      // Build memo string
      const memo = `${paymentData.caseId} — ${paymentData.name} — ${paymentData.matterType}`;

      // Show modal with payment details
      showPaymentModal(provider, memo);
    });
  });
}

/**
 * Show Payment Modal
 */
function showPaymentModal(provider, memo) {
  const modal = document.getElementById('payment-modal');
  if (!modal) return;

  // Populate modal data
  document.getElementById('modal-amount').textContent = `$${paymentData.amountDollars}`;
  document.getElementById('modal-provider').textContent = capitalizeFirst(provider);
  document.getElementById('modal-memo').textContent = memo;

  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Store provider info for later use
  modal.setAttribute('data-provider', provider);
  modal.setAttribute('data-memo', memo);
}

/**
 * Initialize Payment Modal
 */
function initPaymentModal() {
  const modal = document.getElementById('payment-modal');
  const closeBtn = document.getElementById('close-modal');
  const openProviderBtn = document.getElementById('open-provider-btn');
  const downloadCsvBtn = document.getElementById('download-csv-btn');

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closePaymentModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closePaymentModal();
      }
    });
  }

  // Open provider (currently disabled - placeholder)
  if (openProviderBtn) {
    openProviderBtn.addEventListener('click', function() {
      const provider = modal.getAttribute('data-provider');
      const memo = modal.getAttribute('data-memo');

      if (!provider || !paymentData) return;

      // TODO integrate - Implement actual payment provider redirect
      const url = PROVIDERS[provider].buildUrl(paymentData.amountCents, memo);
      console.log('Would redirect to:', url);

      alert('Payment integration not yet implemented. This would redirect to: ' + capitalizeFirst(provider));

      // When implemented, uncomment this:
      // window.location.href = url;
    });
  }

  // Download CSV (for QA/testing)
  if (downloadCsvBtn) {
    downloadCsvBtn.addEventListener('click', function() {
      const provider = modal.getAttribute('data-provider');
      const memo = modal.getAttribute('data-memo');

      if (!paymentData) return;

      const csvRow = buildCsvRow(provider, memo);
      downloadCsv(csvRow);
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closePaymentModal();
    }
  });
}

/**
 * Close Payment Modal
 */
function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
}

/**
 * Build CSV Row for QA
 */
function buildCsvRow(provider, memo) {
  if (!paymentData) return '';

  const fields = [
    paymentData.ts,
    paymentData.name,
    paymentData.email,
    paymentData.phone || '',
    paymentData.caseId,
    paymentData.matterType,
    paymentData.amountDollars,
    provider,
    memo,
    paymentData.notes.replace(/"/g, '""') // Escape quotes in notes
  ];

  // CSV header
  const header = 'Timestamp,Name,Email,Phone,CaseID,MatterType,Amount,Provider,Memo,Notes';
  const row = fields.map(field => `"${field}"`).join(',');

  return `${header}\n${row}`;
}

/**
 * Download CSV File
 */
function downloadCsv(csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `payment_${Date.now()}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Initialize Amount Field Formatting
 */
function initAmountFormatting() {
  const amountField = document.getElementById('amount');
  if (!amountField) return;

  amountField.addEventListener('input', function(e) {
    let value = e.target.value;

    // Remove non-numeric characters except decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }

    e.target.value = value;
  });

  // Format on blur
  amountField.addEventListener('blur', function(e) {
    let value = e.target.value;

    if (value === '') return;

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      e.target.value = numValue.toFixed(2);
    }
  });
}

/**
 * Utility: Capitalize First Letter
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Track Payment Method Selection (for analytics)
 */
document.addEventListener('click', function(e) {
  if (e.target.closest('.payment-method-btn')) {
    const provider = e.target.closest('.payment-method-btn').getAttribute('data-provider');
    console.log('Payment method selected:', provider);
    // TODO: Send to analytics when implemented
  }
});
