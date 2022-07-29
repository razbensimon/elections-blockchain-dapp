import useEth from '../../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

type Voter = {
  voterAddress: string;
  isVoted: boolean;
};

type Props = {};

const columns: ColumnsType<Voter> = [
  {
    title: 'Address',
    dataIndex: 'voterAddress',
    key: 'voterAddress'
  },
  {
    title: 'Is Voted?',
    dataIndex: 'isVoted',
    key: 'isVoted',
    render: (voter, record) => (record.isVoted ? 'True' : 'False'),
    sorter: (a: Voter, b: Voter) => Number(a.isVoted) - Number(b.isVoted)
  }
];

const CandidatesTable: React.FC<Props> = () => {
  const {
    state: { contract }
  } = useEth();

  const [voters, setVoters] = useState<Voter[]>();

  useEffect(() => {
    if (!contract) return;

    (async () => {
      const voters = (await contract.methods.getVoters().call()).map(
        ({ voterAddress, isVoted }: Voter) =>
          ({
            key: voterAddress,
            voterAddress,
            isVoted
          } as Voter)
      );
      setVoters(voters);
    })();
  }, [contract]);

  return (
    <div style={{ marginBottom: '2em' }}>
      <Table
        dataSource={voters}
        columns={columns}
        pagination={{ simple: true, position: ['bottomCenter'], pageSize: 5 }}
      />
    </div>
  );
};

export default CandidatesTable;
