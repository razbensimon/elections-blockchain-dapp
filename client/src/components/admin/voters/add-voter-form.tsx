import { Button, Form, Input, Typography } from 'antd';
import useEth from '../../../contexts/EthContext/useEth';

const { Title } = Typography;

type Props = {};

const AddVoterForm: React.FC<Props> = () => {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [form] = Form.useForm<{ voterAddress: string }>();

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
            <Button type="primary" htmlType="submit">
              Add voting permission
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddVoterForm;
