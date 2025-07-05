import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateBlockDto {
    @IsString()
    url: string;

    @IsInt()
    userId: number;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;
}