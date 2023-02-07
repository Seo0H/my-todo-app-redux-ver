import { useCallback, useState } from "react";

function useIsShow (initialValul) {
    const [isShow, setShow] = useState(initialValul ?? false);

    const onShow = useCallback(()=> {
        setShow(true);
    },[]);

    const offShow = useCallback(()=> {
        setShow(false);
    },)

    return [isShow, onShow, offShow];
};

export default useIsShow;