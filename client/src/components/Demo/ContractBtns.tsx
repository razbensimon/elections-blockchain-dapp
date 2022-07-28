import { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function ContractBtns({ setValue }: { setValue(val: string): void }) {
  const {
    state: { contract, accounts }
  } = useEth();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+$|^$/.test(event.target.value)) {
      setInputValue(event.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if ((event.target as any).tagName === 'INPUT') {
      return;
    }
    if (inputValue === '') {
      alert('Please enter a value to write.');
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div onClick={write as any} className="input-btn">
        write(
        <input type="text" placeholder="uint" value={inputValue} onChange={handleInputChange} />)
      </div>
    </div>
  );
}

export default ContractBtns;
