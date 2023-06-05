# CheckboxList
Компонент удобен в том случае, когда необходимо предоставить множественный выбор из списка альтернатив оформленного в виде нескольких чекбоксов.

```jsx
const checkboxes: CheckboxListOption[] = [
    { value: 'one', label: 'One', hint: 'Check hint' },
    { value: 2, label: 'Two', disabled: true },
    { value: 'three', label: 'Three', checked: true },
    { value: 4, label: 'Four', checked: true },
];

const [ checkboxlist, setCheckboxList ] = useState(checkboxes);

return(
    <Form>
        <CheckboxList
            id='checkboxlist'
            label='Checkbox List'
            required={true}
            disabled={false}
            options={checkboxlist}
            onChange={setCheckboxList}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|options|CheckboxListOption[]||Список опций|
|onChange|(options: CheckboxListOption[]) => void||Обработчик выбора|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|

### CheckboxListOption
|Name|Type|Description|
|----|----|-----------|
|label|string|Название опции|
|value|CheckboxListValue|Значение опции|
|hint?|string|Подсказка для опции|
|disabled?|boolean|Флаг запрета выбора|
|checked?|boolean|Флаг того, что опция выбрана|

### CheckboxListValue
```jsx
type CheckboxListValue = string | number;
```

Указание `disabled` у компонента делает невозможным изменять значения опций независимо от индивидуальных установок.

При отправке данных формы значением данного элемента будет массив из значений выбранных опций.
