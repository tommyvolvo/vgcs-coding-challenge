import { useState, useEffect } from 'react';

const useApi = (callback: Function): any => {
  const [state, setState] = useState([null, null, true])
  
  useEffect(
    () => {
      const doCallback = async () => {
        try {
          const result = await callback()
          setState([result, null, false])
        } catch (e) {
          setState([null, e, false])
        }
      }

      doCallback()
    },
    []
  )

  return state
};

export default useApi

