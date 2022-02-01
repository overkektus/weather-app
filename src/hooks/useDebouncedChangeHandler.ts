import { useCallback } from 'react';
import debounce from 'lodash/debounce';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useDebouncedChangeHandler = (changeHandler: any, timeout: number = 300) => {
  return useCallback(debounce(changeHandler, timeout), []);
}