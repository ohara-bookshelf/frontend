import { useState } from 'react';

export default function useDisclosure(init = false) {
  const [isTrue, setIsTrue] = useState(init);

  const setFalse = () => {
    setIsTrue(false);
  };

  const setTrue = () => {
    setIsTrue(true);
  };

  return [isTrue, setTrue, setFalse];
}
