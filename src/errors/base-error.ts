export default class BaseError {
  constructor(public type: string, public message: string, public data: any) {}
}
