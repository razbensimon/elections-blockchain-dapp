import React from 'react';
import { Divider } from 'antd';
import Welcome from '../voter/welcome/welcome';
import ContractInfoSection from '../admin/contract-info-section';
import RightToVote from '../admin/voters/right-to-vote';
import VoteForm from '../voter/vote-form';
import { ElectionsResults } from '../common/elections-results';
import Reward from '../admin/voters/reward';
import CandidatesTable from '../admin/candidates/candidates-table';
import { Status, useElectionsStatus } from '../../hooks/useElectionsStatus';

export default function VoterPage() {
  const { status } = useElectionsStatus();
  return (
    <div id="voter">
      <ContractInfoSection />
      <Welcome />
      <Divider />
      <RightToVote />
      <Divider />
      <VoteForm />
      <Reward />
      <Divider />
      <ElectionsResults />
      {status === Status.Ended ? <CandidatesTable /> : null}
    </div>
  );
}
