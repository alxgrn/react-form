import { useState } from 'react';
import { Form, Input, Radio, Select, Checkbox, Fieldset } from './lib';
import './App.css';

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

function App() {
    const [ text, setText ] = useState('Hello');
    const [ radio, setRadio ] = useState('');
    const [ select, setSelect ] = useState('two');
    const [ password, setPassword ] = useState('1234567');
    const [ textarea, setTextarea ] = useState('Lorem ipsum dolor sit amet...');
    const [ checkbox1, setCheckbox1 ] = useState(true);
    const [ checkbox2, setCheckbox2 ] = useState(true);

    const onSubmit = () => {
        window.alert(`text="${text}"\npassword="${password}"`);
    };

    const onCheckboxChange = (b: boolean, w: number) => {
        switch(w) {
            case 1:
                setCheckbox1(b);
                break;
            default:
                setCheckbox2(b);
                break;
        }
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
            >
                <Input
                    id='text'
                    required={true}
                    value={text}
                    onChange={setText}
                    label='Text label'
                    disabled={true}
                />
                <Input
                    id='password'
                    type='password'
                    required={true}
                    value={password}
                    onChange={setPassword}
                    label='Password label'
                    placeholder='Password placeholder'
                    error='Password error'
                />
                <Input
                    id='textarea'
                    type='textarea'
                    value={textarea}
                    onChange={setTextarea}
                    label='Textarea label'
                    placeholder='Textarea placeholder'
                    hint='Textarea hint'
                />
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
                <Select
                    id='select'
                    label='Select label'
                    value={select}
                    options={options}
                    onChange={setSelect}
                    required={true}
                />
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
                    />
                </Fieldset>
            </Form>
        </div>
    );
}

export default App;
