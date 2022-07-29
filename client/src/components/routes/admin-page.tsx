import ContractInfoSection from '../admin/contract-info-section';
import CandidateCounter from '../admin/candidates/candidate-counter';
import AddCandidateForm from '../admin/candidates/add-candidate-form';
import CandidatesTable from '../admin/candidates/candidates-table';
import { Divider } from 'antd';
import { Typography } from 'antd';
import VotersCounter from '../admin/voters/voters-counter';
import AddVoterForm from '../admin/voters/add-voter-form';
import VotersTable from '../admin/voters/voters-table';
import StartElections from '../admin/candidates/start-elections';

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
      <Divider />
      <div>
        <Title level={3}>Voters</Title>
        <VotersCounter />
        <AddVoterForm />
        <VotersTable />
      </div>
      <Divider />
      <StartElections />
    </div>
  );
}
