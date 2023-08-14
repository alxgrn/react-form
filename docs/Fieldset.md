# Fieldset
Декоративный компонет для группировки нескольких элементов ввода.

Используется преимущественно для оформления списков radio-элементов, checkbox-элементов и выбора файлов.

```jsx
return(
    <Form>
        <Fieldset label='Legend'>
        ...
        </Fieldset>
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|label?|string||Название группы элементов|
|top?|string \| null \| React.ReactNode||Текст над группой элементов|
|bottom?|string \| null \| React.ReactNode||Текст под группой элементов|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|
|error?|boolean|false|Флаг ошибки заполнения|
