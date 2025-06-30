import { getTypeColorStyles } from './constants';

export const getTypeCssProperties = (alignment = 'left') => {
  return {
    '& .type': {
      borderRadius: '5px',
      textAlign: 'center',
      width: '60px',
      padding: '5px',
      display: 'inline',
      color: '#FFFFFF',
    },
    '& .typeContainer': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: alignment,
      gap: '5px',
    },
    ...getTypeColorStyles(),
  };
};
export const getTypesJsx = (types: string[]) => {
  return (
    <div className="typeContainer">
      {types.map((type) => (
        <div className={`type ${type}`} key={type}>
          {type}
        </div>
      ))}
    </div>
  );
};
