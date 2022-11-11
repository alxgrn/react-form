# Select
Компонент для выбора из списка.

```jsx
const options = [
    { value: 'one', option: 'one' },
    { value: 'two', option: 'two' },
    { value: 'three', option: 'three' },
];

const [ select, setSelect ] = useState('two');

return(
    <Form>
        <Select
            id='select'
            value={select}
            options={options}
            onChange={setSelect}
        />
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|value|string||Выбранное значение|
|options|{value: string, option: string, disabled?: boolean}[]||Список опций|
|onChange|(value: string) => void||Обработчик выбора|
|label?|string||Название элемента ввода|
|hint?|string||Подсказка под элементом ввода|
|error?|string||Текст ошибки под элементом ввода|
|placeholder?|string||Текст отображаемый в начале списка при отсуствии выбора|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|

При указании `value` отсутствующем в списке `options` будет считаться что выбор не сделан. В этом случае при включении флага `required` поле будет подсвечиваться как ошибочное, а кнопка отправки данных у формы будет обозначена как некликабельная.