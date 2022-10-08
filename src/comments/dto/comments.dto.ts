export class CreateCommentDto {
  constructor(readonly text: string, readonly postId: number) {}
}
