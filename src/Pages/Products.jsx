import { Filters, PaginationContainer, ProductsContainer } from "../Components";
import { customFetch } from "../utils";

const url = '/products'

const productsQuery =(params)=> {
  const {search, category, company, sort, price, shipping, page} = params
  return {
  queryKey:['productsQuery', search ?? '', category ?? 'all', company?? 'all', sort?? 'a-z', price ?? '100000', shipping ?? false, page ?? 1 ],
  queryFn : ()=> customFetch(url, {
    params
  })
  }
}

export const loader =(queryClient)=>async ({request})=>{
  // const params = new URL(request.url).searchParams
  // const search = params.get('search');
  // console.log(search);
  // console.log([...new URL(request.url).searchParams.entries()]);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),]);

  const response = await queryClient.ensureQueryData(productsQuery(params));
  const products = response.data.data;
  const meta = response.data.meta;
  return {products, meta, params};
}

const Products = () => {
  return (
    <>
    <Filters/>
    <ProductsContainer/>
    <PaginationContainer/>
    </>
  )
}
export default Products