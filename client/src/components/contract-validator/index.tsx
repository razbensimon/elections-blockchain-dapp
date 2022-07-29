import useEth from '../../contexts/EthContext/useEth';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from './NoticeWrongNetwork';

type Props = {
  children?: React.ReactNode;
  contract: string;
};

function Demo({ children, contract }: Props) {
  const { state } = useEth();

  return (
    <div className="demo">
      {!state.artifact ? <NoticeNoArtifact contract={contract} /> : !state.contract ? <NoticeWrongNetwork /> : children}
    </div>
  );
}

export default Demo;
