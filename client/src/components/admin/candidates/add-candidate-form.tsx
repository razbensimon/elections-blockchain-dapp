import { Button, Form, Input, Typography } from 'antd';
import useElections from '../../../contexts/elections-context/use-elections';
import { Status, useElectionsStatus } from '../../../hooks/use-elections-status';
import QuestionsFormFields from '../../common/questions-form-fields';

const { Title } = Typography;

type Props = {};

const AddCandidateForm: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;
  const [form] = Form.useForm<{
    candidateName: string;
    politicalSide?: string;
    religiousParty?: string;
    expertise?: string;
  }>();

  const { status } = useElectionsStatus();

  return (
    <div>
      <Title level={3}>Add Candidate</Title>

      <div style={{ maxWidth: '500px' }}>
        <Form
          form={form}
          name="control-hooks"
          onFinish={async values => {
            await contract.methods
              .addCandidate(
                values.candidateName,
                values.politicalSide ?? '',
                values.religiousParty ?? '',
                values.expertise ?? ''
              )
              .send({ from: accounts[0] });
          }}>
          <Form.Item name="candidateName" label="Candidate name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <QuestionsFormFields />
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={status !== Status.Created}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCandidateForm;
