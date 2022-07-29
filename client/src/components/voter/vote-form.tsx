import { Button, Form, Input, Typography } from 'antd';
import { useElections } from '../../contexts/ElectionsContext';
import { useCoin } from '../../contexts/CoinContext';
import { useElectionsStatus, Status } from '../../hooks/useElectionsStatus';

const { Title } = Typography;

type Props = {};

const AddVoterForm: React.FC<Props> = () => {
  const {
    state: { contract: coinContract }
  } = useCoin();

  const { state } = useElections();
  const { contract, accounts } = state;

  const [form] = Form.useForm<{ candidateId: number; hitCoinAddress: string }>();

  const { status } = useElectionsStatus();

  return (
    <div>
      <Title level={3}>Vote here:</Title>

      <div style={{ maxWidth: '500px' }}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={async values => {
            console.log('coinContract', coinContract);
            await contract.methods.vote(Number(values.candidateId), coinContract._address).send({ from: accounts[0] });
          }}>
          <Form.Item name="candidateId" label="Candidate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={status !== Status.Voting}>
              Vote!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddVoterForm;
