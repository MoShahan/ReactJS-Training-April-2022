import React, { useEffect, useState } from 'react'

function useDebounce(stateValue: string) {

    const [value, setValue] = useState(stateValue)

    useEffect(() => {

        const timer = setTimeout(() => {
            setValue(stateValue)
        }, 500)

        return () => clearTimeout(timer)

    }, [stateValue])

    return value;
}

export default useDebounce