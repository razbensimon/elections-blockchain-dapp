import ContractInfoSection from '../admin/contract-info-section';
import CandidateCounter from '../admin/candidate-counter';
import AddCandidateForm from '../admin/add-candidate-form';
import CandidatesTable from '../admin/candidates-table';
import { Divider } from 'antd';

export default function AdminPage() {
  return (
    <div>
      <ContractInfoSection />
      <Divider />
      <CandidateCounter />
      <CandidatesTable />
      <Divider />
      <AddCandidateForm />
    </div>
  );
}
