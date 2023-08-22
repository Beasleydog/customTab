import { useState } from 'react'
import useEventListener from './useEventListener';

export default function useHover(elementRef) {
    const [value, setValue] = useState(false)

    const handleMouseEnter = () => setValue(true)
    const handleMouseLeave = () => setValue(false)

    useEventListener('mouseenter', handleMouseEnter, elementRef && elementRef.current)
    useEventListener('mouseleave', handleMouseLeave, elementRef && elementRef.current)

    return value
}