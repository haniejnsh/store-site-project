export default function ProductCard({product}) {

    if(product.price==100){
        return(
            <div className="flex flex-col h-[270px] w-[200px] border border-bl1 rounded-lg px-2 py-2 items-center text-gray-500 shadow-lg shadow-bl2">
                <div className="h-[60%] flex justify-center">
                    <img src={`http://${product?.images[0]}`} alt="product" className="w-full h-full"/>
                </div>
                <p className="text-md font-bold mt-1 h-[20%]">{product.name}</p>
                <div className="flex gap-1 w-full justify-between pr-1 h-[10%]">
                    <div className="flex gap-[1px] bg-red-500 text-white items-center justify-center rounded-sm text-sm w-8 h-5">
                        <span>%</span>
                        <span>20</span>
                    </div>
                    <div className="text-blue-400 flex gap-1">
                        <span>{product.price}</span>
                        <span className="w-8">تومان</span>
                    </div>
                    
                    
                </div>
                <div className="flex gap-1 text-blue-200 w-full justify-end h-[10%]">
                    <span className="line-through">{product.price}</span>
                    <span className="w-8"></span>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col h-[270px] w-[200px] border border-bl1 rounded-lg px-2 py-2 items-center text-gray-500 shadow-lg shadow-bl2">
            <div className="h-[60%] flex justify-center">
                <img src={`http://${product?.images[0]}`} alt="product" className="w-full h-full"/>
            </div>
            <p className="text-lg font-bold h-[20%]">{product.name}</p>
            <div className="flex gap-1 text-blue-400 w-full justify-end h-[20%]">
                <span>{product.price}</span>
                <span>تومان</span>
            </div>
        </div>
  )
}
