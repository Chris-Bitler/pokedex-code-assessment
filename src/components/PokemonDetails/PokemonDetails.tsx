import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    Paper,
    Card,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemon } from 'src/hooks/useGetPokemon';
import { getTypesJsx } from 'src/util';
import { getTypeCssProperties } from 'src/util';

export const PokemonDetails = () => {
    const { id, name } = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    const { pokemon, loading } = useGetPokemon({ id, name });

    // navigate to parent
    const onClose = () => navigate('..');

    return (
        <Dialog open onClose={onClose} className={classes.dialog}>
            <DialogTitle>
                {loading && <div>Loading</div>}
                {pokemon.name}
            </DialogTitle>
            <IconButton className={classes.closeX} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {loading ? (
                    <div>Loading data...</div>
                ) : (
                    <div className={classes.contentOuterContainer}>
                        <div className={classes.contentRowContainer}>
                            <div className="imageContainer">
                                <img src={pokemon.image} />
                                <div className="imageStatsContainer">
                                    <Card className="imageStatsSection">
                                        <p>Min weight: {pokemon.weight.minimum}</p>
                                        <p>Max weight: {pokemon.weight.maximum}</p>
                                    </Card>
                                    <Card className="imageStatsSection">
                                        <p>Min height: {pokemon.height.minimum}</p>
                                        <p>Max height: {pokemon.height.maximum}</p>
                                    </Card>
                                </div>
                            </div>
                            <Paper className="otherStats">
                                <div className="nameDataContainer">
                                    <div className="nameData dataContainer">
                                        <div>ID: {pokemon.number}</div>
                                        <div>Name: {pokemon.name}</div>
                                    </div>
                                    <div className="dataContainer">
                                        Classification: {pokemon.classification}
                                    </div>
                                </div>
                                <div className='typesOuterContainer' data-testid="modal-types-section">
                                    Types: <br />
                                    <div className="typesContainer">
                                        {getTypesJsx(pokemon.types)}
                                    </div>
                                </div>
                                <div className='typesOuterContainer' data-testid="modal-resistance-section">
                                    Resistant to: <br />
                                    <div className="typesContainer">
                                        {getTypesJsx(pokemon.resistant)}
                                    </div>
                                </div>
                                <div className='typesOuterContainer' data-testid="modal-weakness-section">
                                    Weak to: <br />
                                    <div className="typesContainer">
                                        {getTypesJsx(pokemon.weaknesses)}
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const typesCssProperties = getTypeCssProperties('center');
const useStyles = createUseStyles(
    {
        dialog: {
        },
        closeX: {
            position: 'absolute !important',
            right: 5,
            top: 5,
            color: '#FFFFFF',
        },
        contentOuterContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        contentRowContainer: {
            ...typesCssProperties,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            '& .imageContainer': {
                maxWidth: '240px',
                '& img': {
                    maxHeight: '240px',
                },
                display: 'flex',
                flexDirection: 'column',
                '& .imageStatsContainer': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    '& .imageStatsSection': {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        padding: '10px',
                        margin: 0,
                    },
                    '& .imageStatsSection:last-of-type': {
                        textAlign: 'right',
                    },
                },
            },
            '& .otherStats': {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                '& .MuiPaper-root': {
                    maxWidth: '310px',
                    width: '310px',
                },
                '& .nameData': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: '15px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                },
                '& .dataContainer': {
                    paddingBottom: '10px',
                },
            },
            '& .typesContainer': {
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '310px',
                padding: '5px',
                paddingTop: '10px',
                paddingBottom: '10px',
                '& .type': {
                    width: '60px',
                    marginRight: '0 !important',
                },
            },
            '@media (max-width: 580px)': {
                flexDirection: 'column',
                '& .otherStats': {
                    maxWidth: '240px',
                    borderTop: '1px solid white',
                },
                '& .nameDataContainer': {
                    borderBottom: '1px solid white',
                },
                '& .typesOuterContainer': {
                    paddingTop: '10px'
                },
                '& .typesContainer': {
                    paddingBottom: '10px',
                    borderBottom: '1px solid gray'
                }
            },
        },
    },
    { name: 'PokemonDetails' }
);
