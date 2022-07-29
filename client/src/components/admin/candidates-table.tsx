import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';
import { Table } from 'antd';

type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

type Props = {};

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: Candidate, b: Candidate) => a.id - b.id
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Votes',
    dataIndex: 'voteCount',
    key: 'voteCount',
    sorter: (a: Candidate, b: Candidate) => a.voteCount - b.voteCount
  }
];

const CandidatesTable: React.FC<Props> = () => {
  const {
    state: { contract }
  } = useEth();

  const [candidates, setCandidates] = useState<Candidate[]>();

  useEffect(() => {
    if (!contract) return;

    (async () => {
      const candidates = (await contract.methods.getCandidates().call()).map(
        ([id, name, voteCount]: [number, string, number]) =>
          ({
            key: id,
            id,
            name,
            voteCount
          } as Candidate)
      );
      setCandidates(candidates);
    })();
  }, [contract]);

  return (
    <div style={{ marginBottom: '2em' }}>
      <Table
        dataSource={candidates}
        columns={columns}
        pagination={{ simple: true, position: ['bottomCenter'], pageSize: 5 }}
      />
    </div>
  );
};

export default CandidatesTable;
