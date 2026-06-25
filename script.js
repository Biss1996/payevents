// ══════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════
let cfToken = null;
let cfVerified = false;
let paymentId = null;
let otpAttempt = 0;
let resendTimer = null;

// ══════════════════════════════════════════════════════════
// DOM ELEMENTS
// ══════════════════════════════════════════════════════════
const amountInput = document.getElementById('f-amount');
const currencySelect = document.getElementById('f-currency');
const payAmount = document.getElementById('pay-amount');
const itemPrice = document.getElementById('item-price');
const totalDue = document.getElementById('total-due');
const payBtn = document.getElementById('pay-btn');

// Currency symbols
const currencySymbols = {
  USD: '',
  EUR: '€',
  GBP: '£',
  KES: 'KSh',
  AUD: 'A\$'
};

// ══════════════════════════════════════════════════════════
// UPDATE SUMMARY PANEL
// ═,
  CAD: 'CA$',
  EUR: '€',
  GBP: '£',
  KES: 'KSh',
  AUD: 'A\$'
};

// ══════════════════════════════════════════════════════════
// UPDATE SUMMARY PANEL
// ═