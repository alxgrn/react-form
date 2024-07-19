# Prompt
Компонент для отображения модального окна по смыслу аналогичного `window.prompt()`.

Компонент для своей работы использует [Modal](./Modal.md), [Form](../Form.md) и [Input](../Input.md).

```tsx
const [ isPromptOpen, setIsPromptOpen ] = useState(false);

return (
    <Prompt
        value='Hello!'
        isOpen={isPromptOpen}
        onCancel={() => setIsPromptOpen(false)}
        onSubmit={(s) => { setIsPromptOpen(false); alert(s); }}
        title='Заголовок'
        top='Сверху'
        bottom='Снизу'
        submit='Ввести'
        submitType='Error'
        limit={55}
    />
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|value?|string \| null||Начальное значение строки ввода|
|title?|string \| null||Заголовок модального окна|
|top?|string \| null \| ReactNode||Надпись над строкой ввода|
|bottom?|string \| null \| ReactNode||Надпись под строкой ввода|
|limit?|number \| null||Ограничение вводимого текста|
|isOpen|boolean||Флаг показа|
|onCancel|() => void||Обработчик отказа от ввода|
|onSubmit|(value: string) => void||Обработчик завершения ввода|
|submit?|string|`Ok`|Надпись на кнопке подтверждения ввода|
|submitType?|`Accent`\|`Error`\|`Success`\|`Default`|`Accent`|Тип кнопки подтверждения ввода|

Клик вне модального окна или по кнопке закрытия модального окна приравнивается к отказу от ввода.
