import { SearchPaginationDto } from "@root/entities/dto/common/search-pagination.dto";

export const getSkipAndTake = ({ page, take }: SearchPaginationDto): { skip: number; take: number } => {
    take = take > 100 ? 100 : take;
    const skip = page < 1 ? 0 : (page - 1) * take;

    return { skip, take };
};
