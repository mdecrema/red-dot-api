import { ApiProperty } from "@nestjs/swagger";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IsArray, IsNumber, IsObject, IsString } from "class-validator";

export class Article {

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    description: string;

}
