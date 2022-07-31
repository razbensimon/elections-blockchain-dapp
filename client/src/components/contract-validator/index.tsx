import useElections from '../../contexts/elections-context/use-elections';
import NoticeNoArtifact from './notice-no-artifact';
import NoticeWrongNetwork from './notice-wrong-network';

type Props = {
  children?: React.ReactNode;
  contractName: string;
};

function Validator({ children, contractName }: Props) {
  const { state } = useElections();

  return (
    <div>
      {!state.artifact ? (
        <NoticeNoArtifact contract={contractName} />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        children
      )}
    </div>
  );
}

export default Validator;
