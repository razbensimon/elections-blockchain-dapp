import Welcome from '../welcome/welcome';
import ContractInfoSection from '../admin/contract-info-section';
import React from 'react';
import { Divider } from 'antd';
import AddVoterForm from '../voter/vote-form';
import { ElectionsResults } from '../results';

export default function VoterPage() {
  return (
    <div id="voter">
      <ContractInfoSection />
      <Welcome />
      <Divider />
      <AddVoterForm />
      <Divider />
      VoteHelper:
      <Divider />
      <ElectionsResults />
    </div>
  );
}
