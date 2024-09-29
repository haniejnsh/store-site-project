import { NavLink } from "react-router-dom"

export default function ProductCard({product}) {

    if(product.discount!=0){
        const newPrice=product.price-(product.price*(product.discount/100))
        return(
            <NavLink to={`/details/:${product._id}`} className="flex flex-col h-[285px] w-[200px] border border-bl1 rounded-lg px-2 py-2 items-center text-gray-500 shadow-lg shadow-bl2 gap-1 hover:shadow-blue-300 transition">
                <div className="h-[55%] flex justify-center">
                    <img src={`http://${product?.images[0]}`} alt="product" className="w-full h-full"/>
                </div>
                <p className="text-md font-bold h-[25%] flex items-center">{product.name}</p>
                <div className="flex flex-col w-full  px-1 h-[20%] justify-end">
                    <div className="flex justify-between">
                        <div className="flex gap-[1px] bg-red-500 text-white items-center justify-center rounded-sm text-sm w-8 h-5">
                            <span>%</span>
                            <span>{product.discount}</span>
                        </div>
                        <div className="text-blue-400 flex gap-1">
                            <span>{newPrice}</span>
                            <span className="w-8">تومان</span>
                        </div>
                    </div>
                    <div className="flex gap-1 text-blue-200 w-full justify-end">
                        <span className="line-through">{product.price}</span>
                        <span className="w-8"></span>
                    </div>   
                </div>
                
            </NavLink>
        )
    }
    return (
        <NavLink to={`/details/:${product._id}`} className="flex flex-col h-[285px] w-[215px] border border-bl1 rounded-lg px-2 py-2 items-center text-gray-500 shadow-lg shadow-bl2 gap-1 hover:shadow-blue-300 transition">
            <div className="h-[55%] flex justify-center">
                <img src={`http://${product?.images[0]}`} alt="product" className="w-full h-full"/>
            </div>
            <p className="text-md font-bold h-[25%] flex items-center">{product.name}</p>
            <div className="flex gap-1 text-blue-400 w-full justify-end h-[20%] items-center">
                <span>{product.price}</span>
                <span>تومان</span>
            </div>
        </NavLink>
  )
}
