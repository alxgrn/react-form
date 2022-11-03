# Radio
Компонент для выбора из списка оформленного в виде нескольких radio-элементов.

Мы не предоставляем компонента для отрисовки единичного radio-элемента т.к. это лишено смысла. Однако, все равно можно вывести одиночный radio-элемент передав в компонент массив `options` из одного элемента.

```jsx
const options = [
    { value: 'one', label: 'One', hint: 'Radio hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', error: 'Radio error', required: true },
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
|value|string||Выбранное значение|
|options|RadioOption[]||Список опций|
|onChange|(value: string) => void||Обработчик выбора|
|hint?|string||Подсказка под элементом ввода|
|error?|string||Текст ошибки под элементом ввода|
|className?|string||Имя css-класса для установки элементу ввода|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|

### RadioOption
|Name|Type|Description|
|----|----|-----------|
|label|string|Название опции|
|value|string|Значение опции|
|hint?|string|Подсказка для опции|
|error?|string|Ошибка для опции|
|disabled?|boolean|Флаг запрета выбора|
|required?|boolean|Флаг обязательности|

При указании `value` отсуствующем в списке `options` будет считаться что выбор не сделан. В этом случае при включении флага `required` поле будет подсвечиваться как ошибочное, а кнопка отправки данных у формы будет обозначена как некликабельная.

Указание `desibled` у компонента делает невозможным выбрать все элементы независимо от индивидуальных установок.

Указание `required` в `option` не обрабатывается, и служит только для вывода декоратора обязательности выбора.
