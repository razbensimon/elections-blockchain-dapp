import { Button, Form, Select, Typography } from 'antd';
import { useElections } from '../../contexts/ElectionsContext';
import { useCoin } from '../../contexts/CoinContext';
import { useElectionsStatus, Status } from '../../hooks/useElectionsStatus';
import { useCandidates } from '../../hooks/useCandidates';

const { Title } = Typography;
const { Option } = Select;

type Props = {};

const VoteForm: React.FC<Props> = () => {
  const {
    state: { contract: coinContract }
  } = useCoin();

  const { state } = useElections();
  const { contract, accounts } = state;

  const { status } = useElectionsStatus();
  const [form] = Form.useForm<{ candidateId: number; hitCoinAddress: string }>();

  const candidates = useCandidates();

  return (
    <div>
      <Title level={3}>Vote here:</Title>

      <div style={{ maxWidth: '500px' }}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={async values => {
            await contract.methods.vote(Number(values.candidateId), coinContract._address).send({ from: accounts[0] });
          }}>
          <Form.Item name="candidateId" label="Candidate" rules={[{ required: true }]}>
            <Select
              placeholder="Select your candidate!"
              // onChange={onGenderChange}
              allowClear>
              {candidates?.map(candidate => {
                return (
                  <Option key={candidate.id} value={candidate.id.toString()}>
                    {candidate.name}
                  </Option>
                );
              })}
            </Select>
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

export default VoteForm;
