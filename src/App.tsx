import { useState } from 'react';
import { Form, Files, Input, Radio, Select, Checkbox, Fieldset, Date } from './lib';
import { FormData } from './lib/components/Form';
import './App.css';
import FormRow from './lib/components/FormRow';
import FormCol from './lib/components/FormCol';

const options = [
    { value: 'one', option: 'one' },
    { value: 'two', option: 'two' },
    { value: 'three', option: 'three', disabled: true },
];

const radios = [
    { value: 'one', label: 'One', hint: 'Radio hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', error: 'Radio error', required: true },
];

const file = new File(['CONTENT'], 'test.txt', { type: 'text/plain;charset=utf-8' });

function App() {
    const [ date, setDate ] = useState('01.01.2023');
    const [ text, setText ] = useState('Hello');
    const [ radio, setRadio ] = useState('');
    const [ select, setSelect ] = useState('');
    const [ password, setPassword ] = useState('1234567');
    const [ textarea, setTextarea ] = useState('Lorem ipsum dolor sit amet...');
    const [ checkbox1, setCheckbox1 ] = useState(true);
    const [ checkbox2, setCheckbox2 ] = useState(false);
    const [ checkbox3, setCheckbox3 ] = useState(true);
    const [ files, setFiles ] = useState<File[]>([file]);

    const onSubmit = (data: FormData) => {
        window.alert(data);
        console.dir(data);
    };

    const onCheckboxChange = (b: boolean, w: number) => {
        switch(w) {
            case 1:
                setCheckbox1(b);
                break;
            case 2:
                setCheckbox2(b);
                break;
            default:
                setCheckbox3(b);
                break;
        }
    };

    const onFilesChange = (files: File[]) => {
        setFiles(files);
    };

    return (
        <div className="App">
            <header>
                React Form Test
            </header>
            <Form
                info='Info text'
                success='Success text'
                error='Error text'
                submit='Submit button'
                onSubmit={onSubmit}
                wide={true}
            >
                <FormRow>
                    <FormCol>
                        <Input
                            id='text'
                            required={true}
                            value={text}
                            onChange={setText}
                            label='Text label'
                            disabled={true}
                            top='Top text'
                            bottom='Bottom text'
                        />
                    </FormCol>
                    <FormCol>
                        <Input
                            id='password'
                            type='password'
                            required={true}
                            value={password}
                            onChange={setPassword}
                            label='Password label'
                            placeholder='Password placeholder'
                            top='Password top'
                            bottom='Password bottom'
                        />
                    </FormCol>
                </FormRow>
                <FormRow>
                    <FormCol>
                        <Date
                            id='date'
                            value={date}
                            onChange={setDate}
                            label='Date label'
                            required={true}
                            top='Date top'
                            bottom='Date bottom'
                        />
                    </FormCol>
                    <FormCol>
                        <Select
                            id='select'
                            label='Select label'
                            value={select}
                            options={options}
                            onChange={setSelect}
                            required={true}
                            placeholder='Select something'
                            disabled={false}
                            top='Top select'
                            bottom='Bottom select'
                        />
                    </FormCol>
                </FormRow>
                <FormRow>
                    <FormCol>
                        <Input
                            id='textarea'
                            type='textarea'
                            value={textarea}
                            onChange={setTextarea}
                            label='Textarea label'
                            placeholder='Textarea placeholder'
                            bottom='Textarea bottom'
                        />
                    </FormCol>
                </FormRow>
                <FormRow>
                    <FormCol>
                        <Fieldset
                            legend='Radio legend'
                            required={true}
                        >
                            <Radio
                                id='radio'
                                value={radio}
                                options={radios}
                                onChange={setRadio}
                                required={true}
                            />
                        </Fieldset>
                    </FormCol>
                    <FormCol>
                        <Fieldset
                            legend='Checkbox Legend'
                        >
                            <Checkbox
                                id='checkbox1'
                                checked={checkbox1}
                                onChange={(b) => onCheckboxChange(b, 1)}
                                label='Checkbox1 label'
                                required={true}
                                error={checkbox1 ? undefined : 'Checkbox is required'}
                            />
                            <Checkbox
                                id='checkbox2'
                                checked={checkbox2}
                                onChange={(b) => onCheckboxChange(b, 2)}
                                label='Checkbox2 label'
                                hint='Checkbox2 hint'
                                disabled={true}
                            />
                            <Checkbox
                                id='checkbox3'
                                checked={checkbox3}
                                onChange={(b) => onCheckboxChange(b, 3)}
                                label='Checkbox3 label'
                                hint='Checkbox3 hint'
                            />
                        </Fieldset>
                    </FormCol>
                </FormRow>
                <FormRow>
                    <FormCol>
                        <Fieldset
                            legend='File legend'
                        >
                            <Files
                                id='file'
                                label='File choice'
                                files={files}
                                onChange={onFilesChange}
                                top='File top'
                                bottom='File bottom'
                                multiple={true}
                                accept='image/*'
                                disabled={false}
                            />
                        </Fieldset>
                    </FormCol>
                </FormRow>
            </Form>
        </div>
    );
}

export default App;
