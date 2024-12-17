import { useState, useEffect } from "react";


    function useLocalStorage(key, initialValue) {
      
      const [Value, setValue] = useState(()=>{
        const SaveValue = localStorage.getItem(key);
        return SaveValue ? JSON.parse(SaveValue) : initialValue;
      });


     useEffect(()=>{
  localStorage.setItem("watched",JSON.stringify(Value));


},[Value, key]) 

return [Value, setValue];
}





export default useLocalStorage;
