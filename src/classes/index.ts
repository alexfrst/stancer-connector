import {CreatePaymentRequest, Payment, PaymentUpdateRequest, StancerConnectorConstructor} from "./types";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { config } from "../config";
import {logAxiosError, logAxiosResponse} from "./utils";

/** @param authToken Personal token provided by Stancer, */
class StancerConnector {
  private axios: AxiosInstance;
  private publicKey: string

  /** @param stancerConnectorConstructor Tokens given by Stancer */
  constructor(stancerConnectorConstructor: StancerConnectorConstructor) {
    this.publicKey = stancerConnectorConstructor.publicKey;
    this.axios = axios.create({
      baseURL: config.apiBaseUrl,
      auth: {
        username: stancerConnectorConstructor.privateKey,
        password: ""
      }
    });

    this.axios.interceptors.response.use(
      (res) => logAxiosResponse(res),
      (err) => {
        throw logAxiosError(err);
      }
    );
  }

  public async createPayment(
    createPaymentRequest: CreatePaymentRequest
  ): Promise<Payment> {
    return (
      await this.axios.post(config.endpoints.payments, createPaymentRequest)
    ).data;
  }

  public async updatePayment(
      paymentUpdateRequest: PaymentUpdateRequest,
      paymentId: string
  ): Promise<void> {
        await this.axios.patch(`${config.endpoints.payments}/${paymentId}`, paymentUpdateRequest)
        return ;
  }

  public async getPayment(
      paymentId: string
  ): Promise<Payment> {
    return (
        await this.axios.get(`${config.endpoints.payments}/${paymentId}`)
    ).data;
  }

  public async deletePayment(
      paymentId: string
  ): Promise<Payment> {
    return (
        await this.axios.delete(`${config.endpoints.payments}/${paymentId}`)
    ).data;
  }

  buildPaymentLink(paymentId:string, language: string){
    return `${config.paymentBaseUrl}/${this.publicKey}/${paymentId}?lang=${language}`
  }
}

export { StancerConnector };
