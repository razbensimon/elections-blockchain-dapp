import React from 'react';
import Countdown from 'react-countdown';

const Ended = () => <span>Elections ended!</span>;

type Props = {
  endTime?: Date;
  onComplete?(): void;
};

export const ElectionsCountdown: React.FC<Props> = React.memo(({ endTime, onComplete }) => (
  <div>
    {endTime ? (
      <Countdown date={endTime} onComplete={onComplete}>
        <Ended />
      </Countdown>
    ) : (
      '00:00:00:00'
    )}
  </div>
));
