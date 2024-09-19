import { useState } from "react";

export default function DeliveryFilter({filterSet}) {

    const [selectedOption, setSelectedOption] = useState("");
    console.log(selectedOption);
    

  // تابع برای مدیریت تغییرات در رادیو باتن‌ها
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    filterSet(event.target.value)
  };


  return (
    <div className="flex gap-2 text-gray-500">

      <div className="flex items-center space-x-2 hover:text-blue-400 transition cursor-pointer gap-1">
        <input
          className="cursor-pointer"
          type="radio"
          id="option-one"
          value="true"
          checked={selectedOption === "true"}
          onChange={handleChange}
        />
        <label htmlFor="option-one" className="cursor-pointer">تحویل داده شده</label>
      </div>

      <div className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer transition gap-1">
        <input
          type="radio"
          id="option-two"
          value="false"
          checked={selectedOption === "false"}
          onChange={handleChange}
        />
        <label htmlFor="option-two" className="cursor-pointer">درانتظارارسال</label>
      </div>

      <div className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer transition gap-1">
        <input
          type="radio"
          id="option-three"
          value=""
          checked={selectedOption === ""}
          onChange={handleChange}
        />
        <label htmlFor="option-three" className="cursor-pointer">همه سفارش ها</label>
      </div>


      {/* <p>انتخاب شما: {selectedOption}</p> */}
        
        
    </div>
  )
}



{/* <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" /> */}
                {/* <Label htmlFor="option-one">Option One</Label> */}
            {/* </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup> */}