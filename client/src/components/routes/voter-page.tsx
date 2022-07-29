import Welcome from '../welcome/welcome';
import ContractInfoSection from '../admin/contract-info-section';
import React from 'react';
import { Divider } from 'antd';

export default function VoterPage() {
  return (
    <div id="voter">
      <Welcome />
      <ContractInfoSection />
      <Divider />
      ElectionResults:
      <Divider />
      DropdownVoter:
      <Divider />
      VoteHelper:
    </div>
  );
}
