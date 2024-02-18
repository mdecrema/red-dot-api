import { PartialType } from "@nestjs/swagger";
import { Article } from "../entities/article.entity";
import { ArticleDTO } from "./article.dto";

export class CreateArticleDto extends PartialType(ArticleDTO) {
    
    public static toEntity(dto: Partial<ArticleDTO>) {

        const it = new Article();
        it.code = dto.code;
        it.name = dto.name;
        it.description = dto.description;
    }
}
