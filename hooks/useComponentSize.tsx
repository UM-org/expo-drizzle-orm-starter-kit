import React, { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

type ComponentPosition = {
    x: number;
    y: number;
}
type ComponentSize = {
    width: number;
    height: number;
}

const useComponentSize = () => {
    const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0 });
    const [position, setPosition] = useState<ComponentPosition>({ x: 0, y: 0 });

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        const { x, y } = event.nativeEvent.layout;
        setSize({ width, height });
        setPosition({ x, y });
    }, []);

    return { position, size, onLayout };
};

export default useComponentSize;