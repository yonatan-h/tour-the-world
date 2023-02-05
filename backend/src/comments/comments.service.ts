import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entity/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}
  async getPlaceComments(placeId: number) {
    const result = await this.commentsRepository.find({
      where: { placeid: placeId },
    });
    return result;
  }

  async postComment(placeId: number, userId: number, content: string) {
    const date = new Date().toISOString();
    const comment = { placeid: placeId, userid: userId, content, date };
    await this.commentsRepository.save(comment);
    return comment;
  }

  async updateComment(
    placeId: number,
    userId: number,
    date: string,
    content: string,
  ) {
    const commentId = await this.findId(placeId, userId, date);
    const updateResult = await this.commentsRepository.update(commentId, {
      content,
      date,
    });
    return updateResult;
  }

  async findId(
    placeId: number,
    userId: number,
    date: string,
  ): Promise<number | null> {
    const oldComment = await this.commentsRepository.findOne({
      where: {
        userid: userId,
        placeid: placeId,
        date: date,
      },
    });

    console.log(oldComment);
    const commentId = oldComment.id;
    return commentId;
  }

  async deleteComment(placeId: number, userId: number, date: string) {
    const commentId = await this.findId(placeId, userId, date);
    const result = await this.commentsRepository.delete(commentId);
    return result;
  }
}
