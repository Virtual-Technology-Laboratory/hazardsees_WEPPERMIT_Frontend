export class Ermit {
  constructor(
    public top_slope: number,
    public avg_slope: number,
    public toe_slope: number,
    public rock_content: number,
    public length_ft: number,
    public cli_fn: string,
    public severity: string,
    public soil_type: string,
    public vegetation: string,
    public pct_grass?: number,
    public pct_shrub?: number,
    public pct_bare?: number
  ) { }
}
