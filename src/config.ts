import { StancerConnectorConfig } from "./classes/types";

const config: StancerConnectorConfig = {
  apiBaseUrl: "https://api.stancer.com",
  paymentBaseUrl:"https://payment.stancer.com",
  endpoints: {
    payments: "/v1/checkout",
    cards: "/v1/cards",
    sepa: "/v1/sepa",
  },
};

export { config };
