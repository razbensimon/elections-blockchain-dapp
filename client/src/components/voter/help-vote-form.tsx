import { useCallback, useState } from 'react';
import QuestionsFormFields from '../common/questions-form-fields';
import { Button, Checkbox, Form, Typography } from 'antd';
import { Candidate } from '../../hooks/use-candidates';
import { VoterAnswers, findMostSuitableCandidate } from '../../utils/find-most-suitable-candidate';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Title } = Typography;

export const HelpVoteForm: React.FC<{ candidates: Candidate[] }> = ({ candidates = [] }) => {
  const [form] = Form.useForm<VoterAnswers>();
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
                    const voterAnswers: VoterAnswers = {
                      expertise: form.getFieldValue('expertise') ?? '',
                      politicalSide: form.getFieldValue('politicalSide') ?? '',
                      religiousParty: form.getFieldValue('religiousParty') ?? ''
                    };
                    const candidate = findMostSuitableCandidate(candidates, voterAnswers);
                    setChosenCandidate(candidate);
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
