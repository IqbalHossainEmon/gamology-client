import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

export default function usePagination(totalPage, activePage, siblingCount = 1) {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount * 2 + 5;

        //  If the number of pages is less than the page numbers we want to show in our paginationComponent, we return the range [1..totalPageCount]
        if (totalPage <= totalPageNumbers) {
            return range(1, totalPage);
        }

        // finding the index of left and right siblings in range of 1 to totalPage
        const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
        const rightSiblingIndex = Math.min(activePage + siblingCount, totalPage);

        // We do not want to show dots if there is only two position left after/before the left/right page count as that would lead to a change if our Pagination component size which we do not want
        const shouldShowLeftDots = leftSiblingIndex > 3;
        const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

        // show right dots not the left dots
        if (!shouldShowLeftDots && shouldShowRightDots) {
            return [...range(1, 3 + 2 * siblingCount), DOTS, totalPage];
        }

        // show left dots not the right dots
        if (shouldShowLeftDots && !shouldShowRightDots) {
            return [1, DOTS, ...range(totalPage - (3 + 2 * siblingCount) + 1, totalPage)];
        }

        // show both dots
        if (shouldShowLeftDots && shouldShowRightDots) {
            return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, totalPage];
        }
        return [];
    }, [totalPage, activePage, siblingCount]);
    return paginationRange;
}
