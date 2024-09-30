export const useNumberConverter=(number:number)=>{
        return new Intl.NumberFormat('fa-IR').format(number)
    }

