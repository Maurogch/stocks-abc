export class ModelConfig {
  constructor(
    public id?: number,
    public reviewPeriod?: number,
    public deliveryTime?: number,
    public lastDelivery?: string,
    public supplier?: string,
    public satisfaction?: number,
    public storageCost?: number,
    public deliveryCost?: number
  ) {}
}
