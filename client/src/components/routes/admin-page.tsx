import ContractInfoSection from '../admin/contract-info-section';
import CandidateVotes from '../admin/candidate-votes';
import AddCandidateForm from '../admin/add-candidate-form';

export default function AdminPage() {
  return (
    <div>
      ADMIN
      <ContractInfoSection />
      <hr />
      <CandidateVotes />
      <hr />
      <AddCandidateForm />
    </div>
  );
}
