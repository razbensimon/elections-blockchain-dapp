import React from 'react';
import Countdown from 'react-countdown';

const Ended = () => <span>Elections ended!</span>;

type Props = {
  endTime?: Date;
  onComplete?(): void;
};

export const ElectionsCountdown: React.FC<Props> = React.memo(({ endTime, onComplete }) => (
  <div
    style={{
      border: '1px solid #ccc',
      letterSpacing: '.125rem',
      textTransform: 'uppercase',
      color: '#333',
      fontSize: '1.5em',
      backgroundColor: '#ffd54f',
      padding: '1.5em',
      display: 'flex',
      justifyContent: 'center',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
    }}>
    {endTime ? (
      <Countdown date={endTime} onComplete={onComplete}>
        <Ended />
      </Countdown>
    ) : (
      '00:00:00:00'
    )}
  </div>
));
