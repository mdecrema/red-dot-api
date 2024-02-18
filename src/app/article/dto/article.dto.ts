import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseInterface } from "src/app/base/base.interface";
import { Column } from "typeorm";

export class ArticleDTO extends BaseInterface implements Readonly<ArticleDTO> {

    @ApiProperty({ type: String})
    @IsString()
    @Column({ type: 'varchar', nullable: false, unique: true })
    code: string;

    @ApiProperty({ type: String })
    @IsString()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ApiProperty({ type: String })
    @IsString()
    @Column({ type: 'varchar', nullable: true })
    description: string;
}