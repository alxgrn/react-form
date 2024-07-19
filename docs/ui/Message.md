# Message
Компонент для отображения сообщения с заголовком и иконкой.
Используется в модальных окнах [Alert](./Alert.md), [Confirm](./Confirm.md) и [Prompt](./Prompt.md).

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|icon?|string \| null||Ссылка на SRC иконки|
|type?|`round` \| `square`|`square`|Тип иконки: круглая или квадратная|
|title?|string \| null||Заголовок сообщения|
|message|string \| ReactNode||Текст сообщения|
