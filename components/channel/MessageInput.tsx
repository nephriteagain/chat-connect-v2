import { ReactDispatch, editMode } from "@/types"
import { ForwardedRef, forwardRef, memo } from "react";

export default memo(forwardRef(function MessageInput ({onChange, inputText, editMode}: {
    onChange: ReactDispatch<string>;
    inputText: string;    
    editMode: editMode
}, ref: ForwardedRef<HTMLInputElement>) {
    return (
        <input
            type='text' 
            className={`px-12 py-4 w-full  sm:w-[450px] focus:outline-none shadow-md drop-shadow-md ${editMode.editMode ? 'rounded-b-lg' : 'rounded-lg'} transition-all duration-150`} 
            placeholder='Message'
            onChange={(e) => onChange(e.currentTarget.value)}
            value={inputText}
            ref={ref}
        />
    )
}))