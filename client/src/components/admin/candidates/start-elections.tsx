import { Button, Form, Typography, DatePicker } from 'antd';
import useElections from '../../../contexts/ElectionsContext/useElections';
import { useElectionsStatus, Status } from '../../../hooks/useElectionsStatus';
import { ElectionsResults } from '../../elections-results';

const { Title } = Typography;

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }]
};

type Props = {};

const StartElections: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;
  const [form] = Form.useForm<{ endTime: number }>();

  const { status, statusTranslated } = useElectionsStatus();
  return (
    <div>
      <Title level={3}>Elections Status - {statusTranslated}</Title>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={async _ => {
              const endTimeMoment = form.getFieldValue('endTime');
              const endTime = (endTimeMoment as any).toDate() as Date;
              const solidityEndTime = toSolidityDate(endTime);
              await contract.methods.startVote(solidityEndTime).send({ from: accounts[0] });
            }}>
            <Form.Item name="endTime" label="End Time" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={status !== Status.Created}>
                Start
              </Button>
              <Button
                style={{ margin: '0 1em' }}
                type="primary"
                htmlType="button"
                disabled={status !== Status.Voting}
                onClick={async _ => {
                  await contract.methods.endVote().send({ from: accounts[0] });
                }}>
                Stop
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ flex: 1 }}>
          <ElectionsResults />
        </div>
      </div>
    </div>
  );
};

export default StartElections;

function toSolidityDate(date: Date | number): number {
  return Math.trunc(new Date(date).getTime() / 1000);
}
