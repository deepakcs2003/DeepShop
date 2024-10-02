import { json } from "react-router-dom"
import summaryApi from "../common"

export const FetchCategoryProduct = async({caterory}) => {

    const fetchDataCategory=await fetch(summaryApi.category_wise_product.url,{
        method:summaryApi.category_wise_product.method,
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({caterory:caterory}),
    })
    const responseData=fetchDataCategory.json();
    return responseData;
}
