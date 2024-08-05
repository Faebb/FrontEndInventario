export interface Product {
        "productId": number,
        "elaborationType": boolean,
        "productName": string,
        "productStateId": number,
        "productState": {
            "productStateId": number,
            "name": string
    }
}
