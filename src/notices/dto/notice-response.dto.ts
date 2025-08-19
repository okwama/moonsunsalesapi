export class NoticeResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(notice: any) {
    this.id = notice.id;
    this.title = notice.title;
    this.content = notice.content;
    this.createdAt = notice.createdAt.toISOString();
    this.updatedAt = notice.updatedAt ? notice.updatedAt.toISOString() : notice.createdAt.toISOString();
  }
}
