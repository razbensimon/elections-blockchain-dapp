import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { Candidate, useCandidates } from '../../../hooks/useCandidates';
import { useAdmin } from '../../../hooks/useAdmin';

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

const adminColumns: ColumnsType<Candidate> = [
  ...columns,
  {
    title: 'Political side',
    dataIndex: 'politicalSide',
    key: 'politicalSide'
  },
  {
    title: 'Is Religious Party?',
    dataIndex: 'religiousParty',
    key: 'religiousParty'
  },
  {
    title: 'Expertise',
    dataIndex: 'expertise',
    key: 'expertise'
  }
];

const CandidatesTable: React.FC<Props> = () => {
  const candidates = useCandidates();

  const { isAdmin } = useAdmin();

  return (
    <div style={{ marginBottom: '2em' }}>
      <Table
        dataSource={candidates}
        columns={isAdmin ? adminColumns : columns}
        pagination={{ simple: true, position: ['bottomCenter'], pageSize: 5 }}
      />
    </div>
  );
};

export default CandidatesTable;
