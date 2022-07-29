import { Button, Form, Input, Typography } from 'antd';
import useElections from '../../../contexts/ElectionsContext/useElections';
import { useElectionsStatus, Status } from '../../../hooks/useElectionsStatus';

const { Title } = Typography;

type Props = {};

const StartElections: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;
  const [form] = Form.useForm<{ endTime: number }>();

  const { status, statusTranslated } = useElectionsStatus();

  return (
    <div>
      <Title level={3}>Elections Status - {statusTranslated}</Title>

      <div style={{ maxWidth: '500px' }}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={async _ => {
            await contract.methods.startVote().send({ from: accounts[0] });
          }}>
          <Form.Item name="endTime" label="End Time" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={status !== Status.Created}>
              Start
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          htmlType="button"
          disabled={status !== Status.Voting}
          onClick={async _ => {
            await contract.methods.endVote().send({ from: accounts[0] });
          }}>
          Stop
        </Button>
      </div>
    </div>
  );
};

export default StartElections;
