# Checkbox
Компонент для установки/сбрасывания флажка.

```jsx
const [ checked, setChecked ] = useState(true);

const onCheckboxChange = (b: boolean, v: string|number) => {
    setChecked(b);
};

return(
    <Form>
        <Checkbox
            id='checkbox'
            value='value'
            checked={checked}
            onChange={onCheckboxChange}
            label='Checkbox label'
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|value|string \| number||Значение элемента|
|onChange|(checked: boolean, value: string \| number) => void||Обработчик ввода|
|label|string||Название элемента ввода|
|bottom?|string||Подсказка под элементом ввода|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|
|checked?|boolean|false|Флаг установленности флажка|

## Особенности
При обработке клика кнопки отправки формы в данных формы элемент с идентификатором `id` будет иметь значение равное `value` если флажок взведен, и значение `undefined` в противном случае.