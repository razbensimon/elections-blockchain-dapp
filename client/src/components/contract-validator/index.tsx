import useEth from '../../contexts/EthContext/useEth';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from './NoticeWrongNetwork';

type Props = {
  children: React.ReactNode;
};

function Demo({ children }: Props) {
  const { state } = useEth();

  return (
    <div className="demo">
      {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : children}
    </div>
  );
}

export default Demo;
