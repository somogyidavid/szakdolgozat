import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ActivitiesService } from "./activities.service";
import Activity from "./schemas/activity.schema";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { ReqUser } from "../auth/decorators/requser.decorator";
import { CreateActivityDto } from "./dto/CreateActivityDto";
import { UpdateActivityDto } from "./dto/UpdateActivityDto";
import { CastErrorExceptionFilter } from "../exceptions/castError-exception.filter";
import { ValidationExceptionFilter } from "../exceptions/validation-exception.filter";
import { ApiErrorExceptionFilter } from "../exceptions/ApiError-exception.filter";
import { RequestActivitiesDto } from "./dto/RequestActivitiesDto";
import { RequestPlaceDetailsDto } from "./dto/RequestPlaceDetailsDto";

@ApiTags("Activities")
@Controller("activities")
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new ValidationExceptionFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  async fetchActivities(@ReqUser("_id") userId: string): Promise<Activity[]> {
    return await this.activitiesService.fetchAllActivity(new Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/:activityId")
  async fetchActivityById(@ReqUser("_id") userId: string, @Param("activityId") activityId: string): Promise<Activity> {
    return await this.activitiesService.fetchActivityById(new Types.ObjectId(userId), new Types.ObjectId(activityId));
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/create")
  async createActivity(@ReqUser("_id") userId: string, @Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return await this.activitiesService.createActivity(new Types.ObjectId(userId), createActivityDto, createActivityDto.location);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/:activityId")
  async updateActivity(@Param("activityId") activityId: string, @Body() updateActivityDto: UpdateActivityDto): Promise<Activity> {
    return await this.activitiesService.updateActivity(new Types.ObjectId(activityId), updateActivityDto, updateActivityDto.location);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:activityId")
  async deleteActivity(@Param("activityId") activityId: string): Promise<Activity> {
    return await this.activitiesService.deleteActivity(new Types.ObjectId(activityId));
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/recommend/request")
  async getActivities(@Body() requestActivitiesDto: RequestActivitiesDto): Promise<Object> {
    return await this.activitiesService.getActivities(requestActivitiesDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/places/details")
  async getPlaceDetails(@Body() requestPlaceDetailsDto: RequestPlaceDetailsDto): Promise<Object> {
    return await this.activitiesService.getPlaceDetails(requestPlaceDetailsDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/statistics/top")
  async getTopActivityTypes(@ReqUser("_id") userId: string) {
    return await this.activitiesService.getTopActivityTypes(new Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/statistics/months")
  async getActivityCountForMonths(@ReqUser("_id") userId: string): Promise<Object[]> {
    return await this.activitiesService.getActivityCountForMonths(new Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/statistics/seasons")
  async getActivityCountForSeasons(@ReqUser("_id") userId: string): Promise<Object> {
    return await this.activitiesService.getActivityCountForSeasons(new Types.ObjectId(userId));
  }
}
