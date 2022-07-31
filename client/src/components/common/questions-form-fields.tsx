import { Form, Select } from 'antd';

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

export default QuestionsFormFields;
