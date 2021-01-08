import spacingModifiers from './spacing-modifiers';
const classNames = ['p', 'py', 'px', 'pb', 'pr', 'pl', 'pt'];
const paddingModifiers = [...spacingModifiers, 'px'];
const result = [];

classNames.forEach(cn => {
    paddingModifiers.forEach(pm => {
        const val = `${cn}-${pm}`;
        result.push({
            value: val,
            label: val,
            group: 'Padding',
            name: cn
        });
    });
});

export default result;