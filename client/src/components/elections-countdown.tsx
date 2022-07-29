import React from 'react';
import Countdown from 'react-countdown';

const Ended = () => <span>Elections ended!</span>;

type Props = {
  endTime: Date;
};

export const ElectionsCountdown: React.FC<Props> = ({ endTime }) => (
  <Countdown date={endTime}>
    <Ended />
  </Countdown>
);
