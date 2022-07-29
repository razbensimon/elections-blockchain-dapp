import { Button, Form, Input } from 'antd';
import useEth from '../../contexts/EthContext/useEth';

type Props = {};

const AddCandidateForm: React.FC<Props> = ({}) => {
  const { state } = useEth();
  console.log(state);
  const { contract, accounts } = state;
  const [form] = Form.useForm<{ candidateName: string }>();

  return (
    <div style={{ maxWidth: '500px' }}>
      <Form
        form={form}
        name="control-hooks"
        onFinish={async values => {
          console.log(values);
          await contract.methods.addCandidate(values.candidateName).send({ from: accounts[0] });
        }}>
        <Form.Item name="candidateName" label="Candidate name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCandidateForm;
