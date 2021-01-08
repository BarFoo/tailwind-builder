import spacingModifiers from './spacing-modifiers';
const classNames = ['m', '-m', 'my', '-my', 'mx', '-mx', 'mb', '-mb', 'mr', '-mr', 'ml', '-ml', 'mt', '-mt'];
const marginModifiers = [...spacingModifiers, 'px'];
const result = [];

classNames.forEach(cn => {
    marginModifiers.forEach(mm => {
        const val = `${cn}-${mm}`;
        result.push({
            value: val,
            label: val,
            group: 'Margin',
            name: cn
        });
    });
});

export default result;