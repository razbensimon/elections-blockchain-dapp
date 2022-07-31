import { Button, Checkbox, Form, Select, Typography } from 'antd';
import { Candidate } from '../../hooks/useCandidates';
import { CandidateAnswers, findMostSuitableCandidate } from '../../utils/find-most-suitable-candidate';
import { useCallback, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
const { Option } = Select;

export const QuestionsFormFields: React.FC = () => {
  return (
    <>
      <Form.Item name="politicalSide" label="Political side" rules={[{ required: false }]}>
        <Select placeholder="Select your candidate's political side!" allowClear>
          <Option value="left">Left</Option>
          <Option value="center">Center</Option>
          <Option value="right">Right</Option>
        </Select>
      </Form.Item>
      <Form.Item name="religiousParty" label="Is Religious Party?" rules={[{ required: false }]}>
        <Select placeholder="Select your candidate!" allowClear>
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      </Form.Item>
      <Form.Item name="expertise" label="Expertise" rules={[{ required: false }]}>
        <Select placeholder="Select your candidate's expertise" allowClear>
          <Option value="Honesty">Honesty</Option>
          <Option value="Intelligence">Intelligence</Option>
          <Option value="Bravery">Bravery</Option>
          <Option value="Loyalty">Loyalty</Option>
          <Option value="Determined">Determined</Option>
          <Option value="Good Instincts">Good Instincts</Option>
        </Select>
      </Form.Item>
    </>
  );
};

const { Title } = Typography;

export const HelpVoteForm: React.FC<{ candidates: Candidate[] }> = ({ candidates = [] }) => {
  const [form] = Form.useForm<CandidateAnswers>();
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const [chosenCandidate, setChosenCandidate] = useState<Candidate | null>();

  const onChange = useCallback((event: CheckboxChangeEvent) => {
    setNeedHelp(event.target.checked);
  }, []);

  return (
    <div style={{ padding: '1em 0' }}>
      <Checkbox onChange={onChange}>Need help?</Checkbox>
      {needHelp ? (
        <div style={{ paddingTop: '1em' }}>
          <Title level={5}>Answers the questions for help:</Title>
          <div style={{ maxWidth: '500px' }}>
            <Form form={form} name="control-hooks" onFieldsChange={() => setChosenCandidate(null)}>
              <QuestionsFormFields />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    const voterAnswers: CandidateAnswers = {
                      expertise: form.getFieldValue('expertise'),
                      politicalSide: form.getFieldValue('politicalSide'),
                      religiousParty: form.getFieldValue('religiousParty')
                    };
                    setChosenCandidate(findMostSuitableCandidate(candidates, voterAnswers));
                  }}>
                  Calculate
                </Button>
                {chosenCandidate && (
                  <div style={{ padding: '1em 0' }}>
                    Most suitable candidate for you is:{' '}
                    <span style={{ color: 'purple', fontWeight: 'bold' }}>{chosenCandidate.name}</span>
                  </div>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionsFormFields;
