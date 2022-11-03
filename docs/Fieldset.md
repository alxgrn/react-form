# Fieldset
Декоративный компонет для группировки нескольких элементов ввода.

Используется преимущественно для оформления списков radio-элементов и checkbox-элементов.

```jsx
return(
    <Form>
        <Fieldset legend='Legend'>
        ...
        </Fieldset>
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|legend?|string||Название группы элементов|
|required?|boolean|false|Флаг обязательности для заполнения|
|disabled?|boolean|false|Флаг запрещения ввода данных|
