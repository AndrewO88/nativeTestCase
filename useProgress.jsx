import React, {useEffect, useRef, useState} from 'react';

//todo оочч много времени потерал на старте с запуском => результат "прииимерно 5 секунд" - меня устроил
export const useProgress = () => {
    const [progress, setProgress] = useState(0);
    let {current: intervalId} = useRef(undefined);

    useEffect(() => {
        if (!intervalId) {
            intervalId = setInterval(() =>
                    setProgress((prev) => {
                        if (prev < 100) {
                            return prev + 1;
                        }
                        if (prev === 100) {
                            clearInterval(intervalId);
                        }
                        return prev;
                    })
                , 50);
        }
    }, []);

    return progress
}
