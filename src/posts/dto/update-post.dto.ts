export class UpdatePostDto {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly createdAt: string,
  ) {}
}
