enum Currency {
  EUR = "eur",
  USD = "usd",
  GPB = "gbp",
}

enum PaymentMethod {
  CARD = "card",
  SEPA = "sepa",
}

enum PaymentStatus {
  /**
   * The bank authorized the payment but the transaction will only be processed
   * when the capture will be set to true
   */
  AUTHORIZED = "authorized",
  /** The amount of the payment have been credited to your account */
  CAPTURED = "captured",
  /**
   * The capture operation is being processed, the payment can not be cancelled
   * anymore, refunds must wait the end of the capture process
   */
  CAPTURE_SENT = "capture_sent",
  /**
   * The customer declined the payment after it have been captured on your
   * account
   */
  DISPUTED = "disputed",
  /** The authorisation was not captured and expired after 7 days */
  EXPIRED = "expired",
  /** The payment has failed, refer to the response field for more details */
  FAILED = "failed",
  /** The payment has been refused */
  REFUSED = "refused",
  /** The bank authorized the payment, money will be processed within the day */
  TO_CAPTURE = "to_capture",
}

enum ScoringStatus {
  /** Customer was redirected to his bank for authentication */
  ATTEMPTED = "attempted",
  /** Authentication declined */
  DECLINED = "declined",
  /** Authentication sessions expired after 6 hours */
  EXPIRED = "expired",
  /** Authentication failed */
  FAILED = "failed",
  /** Authentication succeeded, processing can continue */
  SUCCESS = "success",
  /** The strong authentication is not available for this payment method */
  UNAVAILABLE = "unavailable",
}

enum AuthenticatedPaymentExtent {
  /** Customer strong authentication is possible */
  AVAILABLE = "available",
  /** A strong authentication is awaiting for more information */
  REQUESTED = "requested",
}

enum Funding {
  CREDIT = "credit",
  DEBIT = "debit",
  PREPAID = "prepaid",
  UNIVERSAL = "universal",
  CHARGE = "charge",
  DEFERRED = "deferred",
}

enum Network {
  VISA = "visa",
  NATIONAL = "national",
  MASTERCARD = "mastercard",
}

enum Nature {
  PERSONAL = "personal",
  CORPORATE = "corporate",
}

type AuthenticatedPaymentStatus = AuthenticatedPaymentExtent | ScoringStatus;

export {
  AuthenticatedPaymentStatus,
  PaymentStatus,
  ScoringStatus,
  Currency,
  PaymentMethod,
  Funding,
  Network,
  Nature,
};
