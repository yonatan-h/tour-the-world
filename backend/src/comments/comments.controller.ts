import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/CreateComment.dto';
import { CommentsService } from './comments.service';

@Controller('comments/:placeId')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getPlaceComments(@Param('placeId', ParseIntPipe) placeId: number) {
    return await this.commentsService.getPlaceComments(placeId);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post(':userId')
  async postComment(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() ccDto: CreateCommentDto,
  ) {
    const content = ccDto.content;
    const date = new Date().toISOString();
    return await this.commentsService.postComment(placeId, userId, content);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put(':userId/:date')
  async updateComment(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('date') date: string,
    @Body() ccDto: CreateCommentDto,
  ) {
    const content = ccDto.content;
    return await this.commentsService.updateComment(
      placeId,
      userId,
      date,
      content,
    );
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':userId/:date')
  async deleteComment(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('date') date: string,
  ) {
    return await this.commentsService.deleteComment(placeId, userId, date);
  }
}
