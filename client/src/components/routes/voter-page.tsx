import React from 'react';
import { Divider } from 'antd';
import Welcome from '../welcome/welcome';
import ContractInfoSection from '../admin/contract-info-section';
import RightToVote from '../admin/voters/right-to-vote';
import VoteForm from '../voter/vote-form';
import { ElectionsResults } from '../elections-results';
import Reward from '../admin/voters/reward';

export default function VoterPage() {
  return (
    <div id="voter">
      <ContractInfoSection />
      <Welcome />
      <Divider />
      <RightToVote />
      <Divider />
      <VoteForm />
      <Divider />
      <Reward />
      VoteHelper:
      <Divider />
      <ElectionsResults />
    </div>
  );
}
