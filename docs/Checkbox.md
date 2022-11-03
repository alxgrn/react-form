# Checkbox
Компонент для установки/сбрасывания флажка.

```jsx
const [ checkbox, setCheckbox ] = useState(true);

const onCheckboxChange = (b: boolean) => {
    setCheckbox(b);
};

return(
    <Form>
        <Checkbox
            id='checkbox'
            checked={checkbox}
            onChange={(b) => onCheckboxChange(b)}
            label='Checkbox label'
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|onChange|(value: boolean) => void||Обработчик ввода|
|label?|string||Название элемента ввода|
|hint?|string||Подсказка под элементом ввода|
|error?|string||Текст ошибки под элементом ввода|
|className?|string||Имя css-класса для установки элементу ввода|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|
|checked?|boolean|false|Флаг установленности флажка|
