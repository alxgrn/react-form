import { useState } from 'react';
import { Form, Input } from './lib';
import './App.css';

function App() {
    const [ text, setText ] = useState('Hello');
    const [ password, setPassword ] = useState('1234567');
    const [ textarea, setTextarea ] = useState('Lorem ipsum dolor sit amet...');

    const onSubmit = () => {
        window.alert('text="'+text+'"\npassword="'+password+'"');
    };

    return (
        <div className="App">
            <header>
                React Form Test
            </header>
            <Form
                wide={true}
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
                    placeholder='Text placeholder'
                    hint='Text hint'
                    error='Text error'
                />
                <Input
                    id='password'
                    type='password'
                    required={true}
                    value={password}
                    onChange={setPassword}
                    label='Password label'
                    placeholder='Password placeholder'
                    hint='Password hint'
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
                    error='Textarea error'
                />
            </Form>
        </div>
    );
}

export default App;
