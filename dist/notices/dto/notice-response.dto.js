"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeResponseDto = void 0;
class NoticeResponseDto {
    constructor(notice) {
        this.id = notice.id;
        this.title = notice.title;
        this.content = notice.content;
        this.createdAt = notice.createdAt.toISOString();
        this.updatedAt = notice.updatedAt ? notice.updatedAt.toISOString() : notice.createdAt.toISOString();
    }
}
exports.NoticeResponseDto = NoticeResponseDto;
//# sourceMappingURL=notice-response.dto.js.map