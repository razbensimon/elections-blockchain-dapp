import useElections from '../../contexts/ElectionsContext/useElections';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from './NoticeWrongNetwork';

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
