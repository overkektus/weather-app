export interface IPlace {
  readonly place_id: string

  readonly formatted_address: string

  readonly country: string

  readonly city: string

  readonly lat: number

  readonly lng: number

  readonly timeOffset: number

  readonly imgName: string
}
