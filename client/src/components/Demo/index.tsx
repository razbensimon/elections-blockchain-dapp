import Cta from './Cta';
import Contract from './Contract';
import ContractBtns from './ContractBtns';
import { useState } from 'react';

const Demo = () => {
  const [value, setValue] = useState('?');
  return (
    <>
      <Cta />
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
    </>
  );
};

export default Demo;
