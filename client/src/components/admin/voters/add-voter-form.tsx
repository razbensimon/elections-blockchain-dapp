import { Button, Form, Input, Typography } from 'antd';
import useElections from '../../../contexts/elections-context/use-elections';
import { Status, useElectionsStatus } from '../../../hooks/use-elections-status';

const { Title } = Typography;

type Props = {};

const AddVoterForm: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;
  const [form] = Form.useForm<{ voterAddress: string }>();

  const { status } = useElectionsStatus();

  return (
    <div>
      <Title level={3}>Add Voter</Title>

      <div style={{ maxWidth: '500px' }}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={async values => {
            await contract.methods.addVoter(values.voterAddress).send({ from: accounts[0] });
          }}>
          <Form.Item name="voterAddress" label="Voter Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={status !== Status.Created}>
              Add voting permission
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddVoterForm;
