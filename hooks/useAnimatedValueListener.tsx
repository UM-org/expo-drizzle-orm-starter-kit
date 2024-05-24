import { useCallback } from "react";

export let position = 0;

const useAnimatedValueListener = () => {
    
    const onChangeValue = useCallback((pos: { value: number }) => {
        position = pos.value
    }, []);

    return{
        onChangeValue
    }
}
export default useAnimatedValueListener;