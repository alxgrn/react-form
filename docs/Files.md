# Files
Компонент для выбора файлов.

Список выбранных файлов отображается в элементе ввода. Указывается размер каждого файла и общий размер всех выбранных файлов. Для удаления файла из списка выбора надо кликнуть по его имени.

```jsx
// Тестовый файл
const file = new File(['CONTENT'], 'test.txt', { type: 'text/plain;charset=utf-8' });
// Пример инициализации
const [ files, setFiles ] = useState<File[]>([file]);
// Отработка выбора
const onFilesChange = (files: File[]) => {
    setFiles(files);
};
// Пример рендеринга
return(
    <Form>
        <Fieldset
            legend='File legend'
            required={true}
        >
            <Files
                id='file'
                label='File choice'
                text='Add file'
                files={files}
                onChange={onFilesChange}
            />
        </Fieldset>
    </Form>
);
```

## Свойства и методы
|Prop name|Type|Default|Description|
|---------|----|-------|-----------|
|id|string||Идентификатор элемента ввода|
|files|File[]||Выбранные файлы|
|onChange|(files: File[]) => void||Обработчик выбора|
|label?|string \| null||Название блока ввода|
|text|string \| null \| React.ReactNode||Текст на кнопке выбора|
|top?|string \| null \| React.ReactNode||Текст над элементом ввода|
|bottom?|string \| null \| React.ReactNode||Текст под элементом ввода|
|accept?|string \| null||Фильтр разрешенных для выбора типов файлов|
|multiple?|boolean \| null|false|Флаг разрешения множественного выбора|
|required?|boolean \| null|false|Флаг обязательности для заполнения|
|disabled?|boolean \| null|false|Флаг запрета выбора|

