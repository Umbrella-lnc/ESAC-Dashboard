import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: '300px',
        height: '140px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        justifyContent: 'space-between',
        minWidth: '160px',
        maxWidth: '200px',
    },
    activateButton: {
        width: '100%',
        color: 'blue',
    },
    skinnyDeleteButton: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 0,
        width: '20%',
        color: 'blue',
        marginTop: '10px',
        marginBottom: '10px',
    },
    deleteButton: {
        top: 0,
        width: '100%',
        color: 'blue',
        marginTop: '10px',
        marginBottom: '10px',
    },
    paper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '10%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'center',
        width: 400,
        backgroundColor: 'white',
        outline: 'none',
    },
    trelloPaper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '-10%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'left',
        width: 400,
        backgroundColor: 'white',
        outline: 'none',
    },
    editCardPaper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '-20%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'left',
        width: 700,
        backgroundColor: 'white',
        outline: 'none',
    },
    newCardPaper: {
        borderRadius: '5px',
        position: 'absolute',
        left: '50%',
        right: '50%',
        top: '-10%',
        transform: 'translate(-50%, 50%)',
        textAlign: 'left',
        width: 700,
        backgroundColor: 'white',
        outline: 'none',
    },

    selectRow: {
        float: 'left',
        marginLeft: '40px',
    },
    subHeadingList: {
        textAlign: 'center',
        listStyle: 'none',
    },
    listItem: {
        display: 'inline',
        marginLeft: '10px',
        marginRight: '10px',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        width: 100,
    },
    trelloInfoHeadings: {
        color: 'black',
        marginLeft: '20px',
        fontWeight: 'bold',
    },
    trelloInfoBodies: {
        color: 'black',
        marginLeft: '40px',
    },
    editCardButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'blue',
    },
    editCardTextFields: {
        marginLeft: '40px',
    },
})

export { useStyles }
