import * as dayjs from 'dayjs';

export const formatTimeUtil = (valuse: Date) => {
    return dayjs(valuse).format('DD-MM-YYYY');
}

export const formatTimeStamp = (
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null
) => {
    return {
        createdAt: formatTimeUtil(createdAt!),
        updatedAt: formatTimeUtil(updatedAt!),
        deletedAt: deletedAt ? formatTimeUtil(deletedAt) : null,
    };
}