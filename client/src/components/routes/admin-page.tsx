import ContractInfoSection from '../admin/contract-info-section';
import CandidateCounter from '../admin/candidate-counter';
import AddCandidateForm from '../admin/add-candidate-form';
import CandidatesTable from '../admin/candidates-table';
import { Divider } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

export default function AdminPage() {
  return (
    <div>
      <ContractInfoSection />
      <Divider />
      <AddCandidateForm />
      <Divider />
      <div>
        <Title level={3}>Candidates</Title>
        <CandidateCounter />
        <CandidatesTable />
      </div>
    </div>
  );
}
