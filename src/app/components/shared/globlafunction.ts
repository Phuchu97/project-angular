export function deepCopy(data: any) {
    return JSON.parse(JSON.stringify(data));
}

// sắp xếp lại vị trí ảnh cần ưu tiên icon
export function sortCategoryStandard(category_standard: any) {
    let category_standard_copy = deepCopy(category_standard),
        category_standard_code_smartmall: string = 'SMARTMALL',
        category_standard_code_truyxuat: string = 'TRUYXUAT',   
        toIndex: number = 0,
        indexStandard: number,
        element: any,
        findSmartmall = category_standard.some((obj: any) => obj.category_standard_code == category_standard_code_smartmall),
        findTruyXuat = category_standard.some((obj: any) => obj.category_standard_code == category_standard_code_truyxuat);

    if (findSmartmall && findTruyXuat) {
        indexStandard = category_standard.findIndex((obj: any) => obj.category_standard_code == category_standard_code_smartmall);
    }
    else {
        indexStandard = category_standard.findIndex((obj: any) => obj.category_standard_code == category_standard_code_smartmall || obj.category_standard_code == category_standard_code_truyxuat);
    }
    element = category_standard.splice(indexStandard, 1)[0];
    return category_standard.splice(toIndex, 0, element);
}