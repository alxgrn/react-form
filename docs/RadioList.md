# RadioList
Компонент для выбора из списка оформленного в виде нескольких radio-элементов.

Мы не предоставляем компонента для отрисовки единичного radio-элемента т.к. это лишено смысла. Однако, все равно можно вывести одиночный radio-элемент передав в компонент массив `options` из одного элемента.

```jsx
const options = [
    { value: 'one', label: 'One', bottom: 'Radio hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', required: true },
];

const [ radio, setRadio ] = useState('');

return(
    <Form>
        <Radio
            id='radio'
            value={radio}
            options={options}
            onChange={setRadio}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|value|string \| number||Выбранное значение|
|options|RadioListOption[]||Список опций|
|onChange|(value: string \| number) => void||Обработчик выбора|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|

### RadioListOption
|Name|Type|Description|
|----|----|-----------|
|label|string|Название опции|
|value|string \| number|Значение опции|
|bottom?|string|Подсказка для опции|
|disabled?|boolean|Флаг запрета выбора|
|required?|boolean|Флаг обязательности|

При указании `value` отсутствующем в списке `options` будет считаться что выбор не сделан. В этом случае при включении флага `required` поле будет подсвечиваться как ошибочное, а кнопка отправки данных у формы будет обозначена как некликабельная.

Указание `disabled` у компонента делает невозможным менять значения у всех элементов независимо от индивидуальных установок.
