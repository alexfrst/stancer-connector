import {
  Currency,
  Funding,
  Nature,
  Network,
  PaymentMethod,
  PaymentStatus,
} from "./enums";
import { PaymentResponseMapper } from "./mappers";

interface StancerConnectorConfig {
  apiBaseUrl: string;
  paymentBaseUrl: string;
  endpoints: {
    cards: string;
    payments: string;
    sepa: string;
  };
}

interface StancerConnectorConstructor {
  privateKey: string;
  publicKey: string;
}

interface CreatePaymentRequest {
  /** Transaction amount in cents minimum value is 50 cents */
  amount: number;
  currency: Currency;
  description?: string;
  /** Your reference id min = 1, max = 36 */
  order_id?: string;
  /** Your unicity key min = 1, max = 36 */
  unique_id?: string;
  /**
   * The list of payment methods allowed for this payment if null defaults to
   * all methods available
   */
  methods_allowed?: PaymentMethod[];
  /**
   * An HTTPS URL to redirect back your customer after processing the payment,
   * max = 2048
   */
  return_url?: string;
  /** The customer object or id If present, will link payment to customer */
  customer?: Customer | string | null;
  /** The card object or id If present, will perform a credit card payment */
  card?: Card | string | null;
  /** The sepa object or id If present, will perform a SEPA payment */
  sepa?: Sepa | string | null;
  /** Capture immediately the payment Boolean, default True */
  capture?: boolean;
}

interface PaymentExtent {
  id: string;
  /** Array of refund object Present if the payment was refunded */
  refunds: Refund | null;
  /** The status of the payment */
  status: PaymentStatus;
  /** The response of the bank processing the payment */
  response: PaymentResponseCode;
  /** Timestamp of the delivery date of the funds traded by the bank */
  date_bank: number;
  /** Test or Live mode Boolean, default False */
  live_mode: boolean;
}

type Payment = PaymentExtent &
  Required<CreatePaymentRequest>

type PaymentUpdateRequest = Partial<CreatePaymentRequest>

interface CreateCardBase {
  exp_month: number;
  exp_year: number;
  /** Card holder name min = 4, max = 64 */
  name?: string;
  /** If you want the card to be tokenized and reused default True */
  tokenize?: boolean;
  /** City zip code min = 2, max = 8 */
  zip_code?: string;
}

interface CreateCardHided {
  /** The customer PAN number min = 16, max = 19 */
  number: string;
  cvc: string;
}

type CreateCard = CreateCardBase & CreateCardHided;

interface CardExtent {
  id: string;
  created: number;
  last4: string;
  brand: string;
  funding: Funding;
  nature: Nature;
  network: Network;
}

type Card = Required<CreateCardBase> & CardExtent;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Sepa {
  /** TBD */
}

interface Customer {
  id: string;
  /** Customer's email min = 5, max = 64 */
  email: string;
  /** Customer's mobile phone min = 8, max = 16 */
  mobile: string;
  /** Customer's name min = 4, max = 64 */
  name: string;
  /** The Unix timestamp representing creation date of the object in local time */
  created: number;
  /** Test or Live mode default False */
  live_mode: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Refund {
  /** TBD */
}

type PaymentResponseCode = keyof typeof PaymentResponseMapper;

export {
  CreatePaymentRequest,
  PaymentUpdateRequest,
  Payment,
  Card,
  Sepa,
  Customer,
  PaymentResponseCode,
  StancerConnectorConfig,
  StancerConnectorConstructor
};
