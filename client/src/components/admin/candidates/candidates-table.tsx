import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { Candidate, useCandidates } from '../../../hooks/useCandidates';

type Props = {};

const columns: ColumnsType<Candidate> = [
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
  const candidates = useCandidates();

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
