Пакет не обновляется. Новая версия перенесена в [alxgrn/telefrag-ui](https://github.com/alxgrn/telefrag-ui)
# react-form
![npm](https://img.shields.io/npm/v/@alxgrn/react-form)
![npm](https://img.shields.io/npm/l/@alxgrn/react-form)
![codecov](https://img.shields.io/codecov/c/github/alxgrn/react-form)
![github](https://img.shields.io/github/actions/workflow/status/alxgrn/react-form/node.js.yml?branch=main)

Компоненты для создания форм.

## Установка

```
npm install @alxgrn/react-form
```

## Документация
* [Form](./docs/Form.md)
* [Input](./docs/Input.md)
* [Label](./docs/Label.md)
* [Button](./docs/Button.md)
* [Files](./docs/Files.md)
* [RadioList](./docs/RadioList.md)
* [Select](./docs/Select.md)
* [Hidden](./docs/Hidden.md)
* [Fieldset](./docs/Fieldset.md)
* [Checkbox](./docs/Checkbox.md)
* [CheckboxList](./docs/CheckboxList.md)
* [Time](./docs/Time.md)
* [Date](./docs/Date.md)
* [DatePicker](./docs/DatePicker.md)
* [FormRow, FormCol](./docs/FormRowCol.md)
* [Modal](./docs/ui/Modal.md)
* [Popup](./docs/ui/Popup.md)
* [Message](./docs/ui/Message.md)
* [Alert](./docs/ui/Alert.md)
* [Confirm](./docs/ui/Confirm.md)
* [Editable](./docs/ui/Editable.md)


## Как публиковать свой NPM-пакет
[Заметка о том, как публиковать свой пакет](./docs/NPM-Publish.md). Просто чтобы не забыть :)

## Замена устаревшего способа фильтрации дочерних компонентов
В будущих версиях React будет удалена поддержка для `defaultProps`:
```
Warning: Input: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.
```
Поэтому необходимо менять способ определения ввода данных в обязательных полях формы, который описан тут https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292, на что-то другое.

Вот с чего стоит начать:
* https://stackoverflow.com/questions/70967581/filter-react-children-by-type-with-typescript
* https://stackforgeeks.com/blog/only-allow-children-of-a-specific-type-in-a-react-component
* https://www.npmjs.com/package/react-nanny
