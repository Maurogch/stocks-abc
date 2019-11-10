export class ArticlePq {
  constructor(
    public code?: number,
    public name?: string,
    public price?: number,
    public stock?: number,
    public securityReserve?: number,
    public supplier?: string,
    public optimalLot?: number,
    public nextRevition?: Date,
    public zone?: string,
    public annualManteinanceCost?: number,
    public reorderPoint?: number
  ) {}
}
